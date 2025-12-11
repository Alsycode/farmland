// path: src/controllers/uploadController.js
const path = require('path');
const { UPLOAD_DRIVER } = require('../middleware/uploadMiddleware');
const { getPublicUrlForLocal, removeLocalFile } = require('../services/storage/localStorage');
const { uploadBuffer, deleteObject } = require('../services/storage/s3Storage');

/**
 * POST /api/uploads/file
 * - multipart form-data file fields 'file' (single) or 'files' (array)
 * - query param 'subfolder' optional to place under a subfolder inside uploads folder (local) or key prefix (s3)
 *
 * Returns array of uploaded file metadata: { url, filename, size, mime, key? }
 */
exports.uploadFile = async (req, res, next) => {
  try {
    // If using s3 adapter and multer used memoryStorage, files are in req.file or req.files with buffers
    const files = req.files && req.files.length ? req.files : (req.file ? [req.file] : []);
    if (!files.length) return res.status(400).json({ ok: false, error: 'No files uploaded' });

    const subfolder = req.query.subfolder || ''; // sanitized by caller ideally
    const results = [];

    if (UPLOAD_DRIVER === 's3') {
      // Upload each buffer to S3
      for (const f of files) {
        const ext = path.extname(f.originalname) || '';
        const base = path.basename(f.originalname, ext).replace(/\s+/g, '-').toLowerCase();
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const key = path.posix.join(subfolder || '', `${base}-${unique}${ext}`);
        const uploadRes = await uploadBuffer({ buffer: f.buffer, key, contentType: f.mimetype });
        results.push({
          url: uploadRes.Location,
          key: uploadRes.Key,
          bucket: uploadRes.Bucket,
          filename: path.basename(key),
          size: f.size,
          mime: f.mimetype
        });
      }
    } else {
      // Local files: multer already saved files to disk
      for (const f of files) {
        const relativePath = path.relative(process.cwd(), f.path).replace(/\\/g, '/');
        const publicUrl = getPublicUrlForLocal(path.basename(f.path), subfolder);
        results.push({
          url: publicUrl,
          path: relativePath,
          filename: f.filename || path.basename(f.path),
          size: f.size,
          mime: f.mimetype
        });
      }
    }

    return res.status(201).json({ ok: true, files: results });
  } catch (err) {
    return next(err);
  }
};

/**
 * DELETE /api/uploads/file
 * body: { key } for S3 OR { filename, subfolder? } for local
 * - admin/owner should control who can delete; route uses authenticate and role checks in router.
 */
exports.deleteFile = async (req, res, next) => {
  try {
    const { key, filename, subfolder } = req.body;
    if (UPLOAD_DRIVER === 's3') {
      if (!key) return res.status(400).json({ ok: false, error: 'key is required to delete from S3' });
      await deleteObject({ key });
      return res.json({ ok: true, message: 'Deleted from S3' });
    }
    // local
    if (!filename) return res.status(400).json({ ok: false, error: 'filename is required to delete local file' });
    const rel = subfolder ? path.join(subfolder, filename) : filename;
    const removed = removeLocalFile(rel);
    if (!removed) return res.status(404).json({ ok: false, error: 'File not found' });
    return res.json({ ok: true, message: 'Deleted local file' });
  } catch (err) {
    return next(err);
  }
};
