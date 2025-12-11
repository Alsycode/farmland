// path: src/services/storage/localStorage.js
const path = require('path');
const fs = require('fs');

/**
 * Local adapter: stores files under process.cwd()/<UPLOADS_FOLDER>
 * Exposes uploadMetadata and removeFile helpers for controllers.
 */

const UPLOADS_FOLDER = process.env.UPLOADS_FOLDER || 'uploads';

function resolveUploadPath(subpath = '') {
  const dest = path.join(process.cwd(), UPLOADS_FOLDER, subpath);
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  return dest;
}

/**
 * Called by multer disk storage — not needed here directly, but provide helpers.
 */
function getPublicUrlForLocal(filename, subfolder = '') {
  // This assumes server exposes '/uploads' static route to the UPLOADS_FOLDER (configured in src/index.js)
  const prefix = '/uploads';
  const seg = subfolder ? `/${subfolder}` : '';
  return `${prefix}${seg}/${filename}`;
}

/**
 * Remove a locally stored file
 */
function removeLocalFile(relativePath) {
  try {
    const p = path.join(process.cwd(), UPLOADS_FOLDER, relativePath);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      return true;
    }
    return false;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Failed to remove local file', err.message);
    return false;
  }
}

module.exports = {
  resolveUploadPath,
  getPublicUrlForLocal,
  removeLocalFile
};
