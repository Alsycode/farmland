// backend/src/routes/listing.js
/**
 * Purpose: Property (listing) routes mounted at /properties
 */
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const listingCtrl = require('../controllers/listingController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { uploadMiddleware } = require('../utils/upload');

// Public: list & get
router.get('/', listingCtrl.listProperties);
router.get('/:id', listingCtrl.getProperty);

// Admin protected: create, update, delete
router.post('/', auth, roles('admin'), [
  body('title').notEmpty().withMessage('Title required'),
  body('pricePerAcre').isNumeric().withMessage('pricePerAcre numeric'),
  body('area').isNumeric().withMessage('area numeric'),
  body('description').optional().isString()
], listingCtrl.createProperty);

router.put('/:id', auth, roles('admin'), listingCtrl.updateProperty);
router.delete('/:id', auth, roles('admin'), listingCtrl.deleteProperty);

// Upload media (images/videos) - multipart form-data: files[]
router.post('/:id/upload', auth, roles('admin'), uploadMiddleware.array('files', 12), listingCtrl.uploadMedia);

module.exports = router;
