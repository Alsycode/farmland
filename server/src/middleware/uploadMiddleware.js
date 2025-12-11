// path: src/middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { resolveUploadPath } = require('../services/storage/localStorage');

const MAX_MB = Number(process.env.MAX_UPLOAD_SIZE_MB || '5');
const MAX_BYTES = MAX_MB * 1024 * 1024;
const allowedMimes = (process.env.ALLOWED_UPLOAD_MIMES || 'image/jpeg,image/png,image/webp,video/mp4,application/pdf').split(',');

/**
 * File filter to enforce mime types
 */
function fileFilter(req, file, cb) {
  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }
  return cb(null, true);
}

/**
 * Multer storage selection: local disk by default.
 * When UPLOAD_DRIVER=s3 we still use memoryStorage here and will forward buffer to S3 in controller.
 */
const UPLOAD_DRIVER = (process.env.UPLOAD_DRIVER || 'local').toLowerCase();

let storage;
if (UPLOAD_DRIVER === 's3') {
  storage = multer.memoryStorage(); // we handle upload to S3 in controller
} else {
  // local disk storage inside UPLOADS_FOLDER/<subfolder>
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // optional subfolder via req.uploadSubfolder
      const sub = req.uploadSubfolder || '';
      const dest = resolveUploadPath(sub);
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname) || '';
      const base = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
      const unique = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
      cb(null, `${base}-${unique}${ext}`);
    }
  });
}

const upload = multer({
  storage,
  limits: { fileSize: MAX_BYTES },
  fileFilter
});

module.exports = { upload, UPLOAD_DRIVER };
