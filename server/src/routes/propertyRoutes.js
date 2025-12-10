// path: src/routes/propertyRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { body, param, query } = require('express-validator');

const asyncHandler = require('../middleware/asyncHandler');
const { validate } = require('../middleware/validation');
const { authenticate, requireRole } = require('../middleware/authMiddleware');
const propertyController = require('../controllers/propertyController');

const router = express.Router();

/**
 * Ensure upload directory exists
 */
const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'listings');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

/**
 * Simple local multer storage for now (PART 8 will provide S3 adapter and stricter checks)
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '';
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${base}-${unique}${ext}`);
  }
});

/**
 * NOTE: In PART 8 we'll add file type/size filtering and virus scanning.
 * For now accept up to 6 images per listing.
 */
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB per file

/**
 * Routes:
 */

// Create property (auth: any authenticated user)
router.post(
  '/',
  authenticate,
  [
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 chars'),
    body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 chars'),
    body('price').isNumeric().withMessage('Price is required and numeric'),
    validate
  ],
  upload.array('images', 6),
  asyncHandler(propertyController.createProperty)
);

// Get property by id (public)
router.get(
  '/:id',
  [ param('id').isMongoId().withMessage('Invalid property id'), validate ],
  asyncHandler(propertyController.getProperty)
);

// List properties (public, with filters)
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
    query('minPrice').optional().isNumeric(),
    query('maxPrice').optional().isNumeric(),
    validate
  ],
  asyncHandler(propertyController.listProperties)
);

// Update property (owner or manager/admin)
router.put(
  '/:id',
  authenticate,
  [
    param('id').isMongoId().withMessage('Invalid property id'),
    // allow partial updates, validate if present
    body('price').optional().isNumeric(),
    body('title').optional().isLength({ min: 3 }),
    validate
  ],
  upload.array('images', 6),
  asyncHandler(propertyController.updateProperty)
);

// Delete property (owner or manager/admin)
router.delete(
  '/:id',
  authenticate,
  [ param('id').isMongoId().withMessage('Invalid property id'), validate ],
  asyncHandler(propertyController.deleteProperty)
);

// Delete single image from property
router.delete(
  '/:id/images/:filename',
  authenticate,
  [ param('id').isMongoId().withMessage('Invalid property id'), validate ],
  asyncHandler(propertyController.deleteImage)
);

/**
 * Extra: publish/unpublish endpoints (manager/admin only) - convenience
 */
router.post(
  '/:id/publish',
  authenticate,
  requireRole('manager', 'admin'),
  [ param('id').isMongoId().withMessage('Invalid property id'), validate ],
  asyncHandler(async (req, res, next) => {
    const Property = require('../models/Property');
    const { id } = req.params;
    const prop = await Property.findByIdAndUpdate(id, { status: 'published' }, { new: true });
    if (!prop) return res.status(404).json({ ok: false, error: 'Property not found' });
    return res.json({ ok: true, property: prop });
  })
);

module.exports = router;
