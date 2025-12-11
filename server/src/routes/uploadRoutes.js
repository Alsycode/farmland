// path: src/routes/uploadRoutes.js
const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const { authenticate, requireRole } = require('../middleware/authMiddleware');
const { upload, UPLOAD_DRIVER } = require('../middleware/uploadMiddleware');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

/**
 * Upload single file:
 * - POST /api/uploads/file (form field: file)
 * - For S3 driver we use memoryStorage (multer) and controller forwards buffers to S3
 * - For local driver multer stores files to disk
 *
 * Authenticated users only (you may restrict to manager/admin if desired)
 */
router.post(
  '/file',
  authenticate,
  (req, res, next) => {
    // Optional: set subfolder based on query param
    req.uploadSubfolder = req.query.subfolder || '';
    // Choose single or array based on field
    const multerHandler = upload.single('file');
    return multerHandler(req, res, next);
  },
  asyncHandler(uploadController.uploadFile)
);

/**
 * Upload multiple files:
 * - POST /api/uploads/files (form field: files)
 */
router.post(
  '/files',
  authenticate,
  (req, res, next) => {
    req.uploadSubfolder = req.query.subfolder || '';
    const multerHandler = upload.array('files', 8); // limit to 8 files per request
    return multerHandler(req, res, next);
  },
  asyncHandler(uploadController.uploadFile)
);

/**
 * DELETE /api/uploads/file
 * - Only admin or manager can delete arbitrary files; owners would need extra checks.
 */
router.delete(
  '/file',
  authenticate,
  requireRole('manager', 'admin'),
  asyncHandler(uploadController.deleteFile)
);

module.exports = router;
