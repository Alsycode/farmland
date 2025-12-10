// backend/src/controllers/listingController.js
/**
 * Purpose: Listing controller - CRUD, search, geo search, upload images.
 *
 * Routes:
 * GET  /properties                - list + filters + pagination + text search
 * GET  /properties/:id            - get single property
 * POST /properties                - create (admin)
 * PUT  /properties/:id            - update (admin)
 * DELETE /properties/:id          - delete (admin)
 * POST /properties/:id/upload     - upload images/videos (admin, multipart)
 *
 * Filtering query params supported (GET /properties):
 *  - q (text search), category, amenities (comma separated), minPrice, maxPrice, minArea, maxArea,
 *    lat,lng,radiusKm (for geo search), page, limit, sort (price_asc, price_desc, newest, oldest)
 */
const { validationResult } = require('express-validator');
const Listing = require('../models/Listing');
const { uploadFiles } = require('../utils/upload');
const sanitize = (str) => (typeof str === 'string' ? str.replace(/[<>$]/g, '') : str);

async function listProperties(req, res, next) {
  try {
    const {
      q, category, amenities,
      minPrice, maxPrice, minArea, maxArea,
      lat, lng, radiusKm,
      page = 1, limit = 12, sort
    } = req.query;

    const filters = { status: 'published', isAvailable: true };

    if (category) filters.category = sanitize(category);
    if (amenities) filters.amenities = { $all: amenities.split(',').map(a => sanitize(a.trim())) };
    if (minPrice || maxPrice) {
      filters.pricePerAcre = {};
      if (minPrice) filters.pricePerAcre.$gte = Number(minPrice);
      if (maxPrice) filters.pricePerAcre.$lte = Number(maxPrice);
    }
    if (minArea || maxArea) {
      filters.area = {};
      if (minArea) filters.area.$gte = Number(minArea);
      if (maxArea) filters.area.$lte = Number(maxArea);
    }

    let mongoQuery = Listing.find(filters);

    // text search
    if (q) {
      mongoQuery = mongoQuery.find({ $text: { $search: sanitize(q) } }, { score: { $meta: 'textScore' } });
      if (!sort) mongoQuery = mongoQuery.sort({ score: { $meta: 'textScore' } });
    }

    // geo search
    if (lat && lng && radiusKm) {
      const meters = Number(radiusKm) * 1000;
      mongoQuery = mongoQuery.find({
        location: {
          $nearSphere: {
            $geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
            $maxDistance: meters
          }
        }
      });
    }

    // sorting
    if (sort) {
      if (sort === 'price_asc') mongoQuery = mongoQuery.sort({ pricePerAcre: 1 });
      if (sort === 'price_desc') mongoQuery = mongoQuery.sort({ pricePerAcre: -1 });
      if (sort === 'newest') mongoQuery = mongoQuery.sort({ createdAt: -1 });
      if (sort === 'oldest') mongoQuery = mongoQuery.sort({ createdAt: 1 });
    }

    // pagination
    const pageNum = Math.max(1, Number(page));
    const pageSize = Math.min(100, Number(limit) || 12);
    const total = await Listing.countDocuments(mongoQuery.getQuery());
    const results = await mongoQuery.skip((pageNum - 1) * pageSize).limit(pageSize).lean().exec();

    res.json({
      ok: true,
      meta: { total, page: pageNum, limit: pageSize, pages: Math.ceil(total / pageSize) },
      data: results
    });
  } catch (err) {
    next(err);
  }
}

async function getProperty(req, res, next) {
  try {
    const id = req.params.id;
    const p = await Listing.findById(id).populate('owner', 'name email avatarUrl').exec();
    if (!p) return res.status(404).json({ ok: false, message: 'Property not found' });
    res.json({ ok: true, data: p });
  } catch (err) {
    next(err);
  }
}

async function createProperty(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });

    const body = req.body;
    // sanitize minimal fields
    const listing = new Listing({
      title: sanitize(body.title),
      slug: sanitize(body.slug || (body.title || '').toLowerCase().replace(/\s+/g,'-')),
      description: sanitize(body.description),
      owner: req.user.sub,
      pricePerAcre: Number(body.pricePerAcre),
      area: Number(body.area),
      address: sanitize(body.address),
      location: body.location || { type: 'Point', coordinates: [0, 0] },
      images: body.images || [],
      amenities: body.amenities || [],
      status: body.status || 'draft',
      isAvailable: body.isAvailable !== undefined ? Boolean(body.isAvailable) : true
    });
    await listing.save();
    res.status(201).json({ ok: true, data: listing });
  } catch (err) {
    next(err);
  }
}

async function updateProperty(req, res, next) {
  try {
    const id = req.params.id;
    const body = req.body;
    const updates = {};
    if (body.title) updates.title = sanitize(body.title);
    if (body.description) updates.description = sanitize(body.description);
    if (body.pricePerAcre) updates.pricePerAcre = Number(body.pricePerAcre);
    if (body.area) updates.area = Number(body.area);
    if (body.address) updates.address = sanitize(body.address);
    if (body.location) updates.location = body.location;
    if (body.amenities) updates.amenities = body.amenities;
    if (typeof body.isAvailable !== 'undefined') updates.isAvailable = Boolean(body.isAvailable);
    if (body.status) updates.status = body.status;

    const updated = await Listing.findByIdAndUpdate(id, { $set: updates }, { new: true });
    if (!updated) return res.status(404).json({ ok: false, message: 'Property not found' });
    res.json({ ok: true, data: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteProperty(req, res, next) {
  try {
    const id = req.params.id;
    const removed = await Listing.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ ok: false, message: 'Property not found' });
    res.json({ ok: true, message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

async function uploadMedia(req, res, next) {
  try {
    // multer middleware populates req.files
    if (!req.files || !req.files.length) return res.status(400).json({ ok: false, message: 'No files uploaded' });

    const urls = await uploadFiles(req.files);
    // attach to listing images
    const id = req.params.id;
    const updated = await Listing.findByIdAndUpdate(id, { $push: { images: { $each: urls } } }, { new: true });
    if (!updated) return res.status(404).json({ ok: false, message: 'Property not found' });

    res.json({ ok: true, uploaded: urls, data: updated });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadMedia
};
