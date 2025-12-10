// backend/src/utils/upload.js
/**
 * Purpose: Multer-based upload middleware and uploader function.
 *
 * Behavior:
 * - Accepts multipart/form-data and stores files locally under /uploads by default.
 * - If Cloudflare R2 (S3 compatible) env vars present, uploads to R2 using aws-sdk S3 client and returns R2 URLs.
 *
 * NOTE: This is a simple, pragmatic implementation. For production:
 * - Use signed URLs for direct browser uploads.
 * - Protect file types, scan for malware, validate sizes, and set proper cache-control headers.
 */
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const AWS = require('aws-sdk');

const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, '..', '..', 'uploads');

// ensure uploads dir exists
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// multer storage (local)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const safe = `${Date.now()}-${Math.round(Math.random()*1e9)}-${file.originalname.replace(/\s+/g,'_')}`;
    cb(null, safe);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit (tweak per file type)
});

// R2 / S3 client (placeholder) - only configured if env provides R2_*
let s3;
if (process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET && process.env.R2_ENDPOINT) {
  s3 = new AWS.S3({
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    endpoint: process.env.R2_ENDPOINT,
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
  });
}

/**
 * uploadFiles(req, res) - helper to move uploaded files to R2 if configured, otherwise returns local paths.
 * returns array of url strings.
 */
async function uploadFiles(files) {
  if (!files || !files.length) return [];

  if (!s3) {
    // return local file URLs
    return files.map(f => {
      // public path: /uploads/<filename>
      return `/uploads/${path.basename(f.path)}`;
    });
  }

  // upload to R2
  const bucket = process.env.R2_BUCKET;
  const uploads = [];
  for (const f of files) {
    const key = `properties/${Date.now()}-${path.basename(f.path)}`;
    const body = fs.createReadStream(f.path);
    const params = {
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: f.mimetype
    };
    // upload and return public URL (endpoint + bucket + key) - adjust to R2 settings
    const resp = await s3.upload(params).promise();
    uploads.push(resp.Location);
    // optionally remove local file
    try { fs.unlinkSync(f.path); } catch(e) {}
  }
  return uploads;
}

module.exports = {
  uploadMiddleware: upload,
  uploadFiles
};
