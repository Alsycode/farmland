// path: src/controllers/propertyController.js
const fs = require('fs');
const path = require('path');
const Property = require('../models/Property');
const User = require('../models/User'); // exists in PART 2
const { validationResult } = require('express-validator');

/**
 * Helper: remove uploaded files from disk (safe)
 */
function removeFiles(files = []) {
  files.forEach((file) => {
    try {
      if (!file) return;
      const filePath = path.resolve(file);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (err) {
      // swallow errors - log in future (logger available in later chunk)
      // eslint-disable-next-line no-console
      console.warn('Failed to remove file', file, err.message);
    }
  });
}

/**
 * Create a new property/listing
 * - owner is taken from req.user
 */
exports.createProperty = async (req, res, next) => {
  try {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ ok: false, errors: errors.array() });

    const {
      title, description, price, area, unit, address, amenities, tags, status, latitude, longitude
    } = req.body;

    const property = new Property({
      title,
      description,
      price,
      area: area ? Number(area) : undefined,
      unit,
      address,
      owner: req.user._id,
      amenities: Array.isArray(amenities) ? amenities : (amenities ? amenities.split(',').map(s => s.trim()) : []),
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(s => s.trim()) : []),
      status: status || 'draft',
      location: (latitude && longitude) ? { type: 'Point', coordinates: [Number(longitude), Number(latitude)] } : undefined
    });

    // attach any uploaded files (multer sets req.files)
    if (req.files && req.files.length) {
      property.images = req.files.map((f) => ({
        url: `/uploads/listings/${f.filename}`,
        filename: f.filename
      }));
    }

    await property.save();

    return res.status(201).json({ ok: true, property });
  } catch (err) {
    return next(err);
  }
};

/**
 * Get single property by id (increment view optionally)
 */
exports.getProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id).populate('owner', 'name email role').lean();
    if (!property) return res.status(404).json({ ok: false, error: 'Property not found' });

    // Optionally increment views asynchronously (fire-and-forget)
    Property.findByIdAndUpdate(id, { $inc: { views: 1 } }).exec();

    return res.json({ ok: true, property });
  } catch (err) {
    return next(err);
  }
};

/**
 * Query listings with pagination, filters, search, sort
 * Query params:
 *  - page, limit
 *  - q (text search)
 *  - minPrice, maxPrice
 *  - status
 *  - tags (comma separated)
 *  - owner
 *  - sort (e.g., price:asc, price:desc, createdAt:desc)
 */
exports.listProperties = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 12,
      q,
      minPrice,
      maxPrice,
      status,
      tags,
      owner,
      sort = 'createdAt:desc'
    } = req.query;

    const filters = {};
    if (q) {
      filters.$text = { $search: q };
    }
    if (minPrice) filters.price = { ...filters.price, $gte: Number(minPrice) };
    if (maxPrice) filters.price = { ...filters.price, $lte: Number(maxPrice) };
    if (status) filters.status = status;
    if (tags) filters.tags = { $in: tags.split(',').map(t => t.trim()) };
    if (owner) filters.owner = owner;

    // parse sort
    const [sortField, sortOrder] = sort.split(':');
    const sortObj = {};
    sortObj[sortField || 'createdAt'] = sortOrder === 'asc' ? 1 : -1;

    const pageNum = Math.max(Number(page) || 1, 1);
    const perPage = Math.min(Number(limit) || 12, 100);

    const query = Property.find(filters).sort(sortObj).skip((pageNum - 1) * perPage).limit(perPage).populate('owner', 'name email');

    const [items, total] = await Promise.all([
      query.exec(),
      Property.countDocuments(filters)
    ]);

    return res.json({
      ok: true,
      meta: { page: pageNum, perPage, total, totalPages: Math.ceil(total / perPage) },
      items
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * Update property by id.
 * - Only owner, manager, or admin can update. (Enforced by route RBAC)
 * - If new files uploaded, append to images array.
 */
exports.updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ ok: false, errors: errors.array() });

    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ ok: false, error: 'Property not found' });

    // Only allow owner or admin/manager (route-level guard should already ensure role; additional check for owner)
    if (req.user.role === 'user' && property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ ok: false, error: 'Forbidden: not property owner' });
    }

    // Allowed updatable fields:
    const updatable = ['title', 'description', 'price', 'area', 'unit', 'address', 'amenities', 'tags', 'status', 'metadata'];
    updatable.forEach((f) => {
      if (f in req.body) {
        // handle arrays for tags/amenities
        if ((f === 'amenities' || f === 'tags') && typeof req.body[f] === 'string') {
          property[f] = req.body[f].split(',').map(s => s.trim());
        } else {
          property[f] = req.body[f];
        }
      }
    });

    // location update
    const { latitude, longitude } = req.body;
    if (latitude && longitude) {
      property.location = { type: 'Point', coordinates: [Number(longitude), Number(latitude)] };
    }

    // append uploaded images if any
    if (req.files && req.files.length) {
      const newImages = req.files.map((f) => ({
        url: `/uploads/listings/${f.filename}`,
        filename: f.filename
      }));
      property.images = property.images.concat(newImages);
    }

    await property.save();

    return res.json({ ok: true, property });
  } catch (err) {
    return next(err);
  }
};

/**
 * Delete property - removes document and deletes files from disk (if any)
 */
exports.deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ ok: false, error: 'Property not found' });

    // Authorization: owner or manager/admin
    if (req.user.role === 'user' && property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ ok: false, error: 'Forbidden: not property owner' });
    }

    // Remove images from disk
    const filesToRemove = property.images.map(img => path.join(process.cwd(), 'uploads', 'listings', img.filename));
    removeFiles(filesToRemove);

    await property.remove();

    return res.json({ ok: true, message: 'Property deleted' });
  } catch (err) {
    return next(err);
  }
};

/**
 * Delete a single image from a property
 * - Accepts filename param
 * - Only owner or manager/admin can delete
 */
exports.deleteImage = async (req, res, next) => {
  try {
    const { id, filename } = req.params;
    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ ok: false, error: 'Property not found' });

    if (req.user.role === 'user' && property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ ok: false, error: 'Forbidden: not property owner' });
    }

    const imageIndex = property.images.findIndex(img => img.filename === filename);
    if (imageIndex === -1) return res.status(404).json({ ok: false, error: 'Image not found on property' });

    const [removed] = property.images.splice(imageIndex, 1);
    await property.save();

    // delete file from disk
    const filePath = path.join(process.cwd(), 'uploads', 'listings', removed.filename);
    removeFiles([filePath]);

    return res.json({ ok: true, message: 'Image removed' });
  } catch (err) {
    return next(err);
  }
};
