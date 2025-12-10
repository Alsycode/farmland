// path: src/services/jwtService.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const ACCESS_EXP = '15m';
const REFRESH_EXP = '7d';

// Ensure env variables exist
const ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
if (!ACCESS_SECRET || !REFRESH_SECRET) {
  // eslint-disable-next-line no-console
  console.warn('JWT secrets not set. Set JWT_ACCESS_TOKEN_SECRET and JWT_REFRESH_TOKEN_SECRET in environment.');
}

function signAccessToken(payload) {
  // payload should minimally contain { sub: userId, role }
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXP });
}

function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

function signRefreshToken(payload) {
  // For extra safety, embed a random jti into the token
  const jti = crypto.randomBytes(16).toString('hex');
  const token = jwt.sign({ ...payload, jti }, REFRESH_SECRET, { expiresIn: REFRESH_EXP });
  return { token, jti };
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken
};
