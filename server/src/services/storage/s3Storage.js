// path: src/services/storage/s3Storage.js
const AWS = require('aws-sdk');
const path = require('path');

/**
 * S3 adapter (config only). Uses AWS SDK v2.
 * This file exposes:
 *  - initS3() - call once (index.js will not call it; this module will create client lazily)
 *  - uploadBuffer({ buffer, key, contentType }) => returns { Location, Key, Bucket }
 *  - deleteObject({ key })
 *
 * TODO: For production use, add multipart upload, retries, and server-side encryption.
 */

const S3_BUCKET = process.env.S3_BUCKET || process.env.S3_BUCKET_NAME || null;
const S3_UPLOAD_PREFIX = process.env.S3_UPLOAD_PREFIX || '';

if (!S3_BUCKET) {
  // eslint-disable-next-line no-console
  console.warn('S3_BUCKET not configured. Set S3_BUCKET in .env to enable S3 uploads.');
}

const s3Client = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || undefined,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || undefined,
  region: process.env.AWS_REGION || undefined,
  signatureVersion: 'v4'
});

/**
 * Upload a buffer to S3.
 * key should be e.g. 'uploads/listings/filename.ext'
 */
async function uploadBuffer({ buffer, key, contentType }) {
  if (!S3_BUCKET) throw new Error('S3_BUCKET is not configured');
  const fullKey = path.posix.join(S3_UPLOAD_PREFIX || '', key);
  const params = {
    Bucket: S3_BUCKET,
    Key: fullKey,
    Body: buffer,
    ContentType: contentType,
    ACL: 'public-read' // adjust according to security requirements
  };
  const result = await s3Client.upload(params).promise();
  // result contains Location, Bucket, Key, ETag
  return result;
}

/**
 * Delete object by key (relative to prefix)
 */
async function deleteObject({ key }) {
  if (!S3_BUCKET) throw new Error('S3_BUCKET is not configured');
  const fullKey = path.posix.join(S3_UPLOAD_PREFIX || '', key);
  const params = { Bucket: S3_BUCKET, Key: fullKey };
  const result = await s3Client.deleteObject(params).promise();
  return result;
}

module.exports = { uploadBuffer, deleteObject };
