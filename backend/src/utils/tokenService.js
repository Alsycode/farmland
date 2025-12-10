// backend/src/utils/tokenService.js
/**
 * Purpose: Token helpers - create/verify access & refresh tokens,
 * cookie helper to set secure HttpOnly refresh cookie, and helpers to remove cookie.
 *
 * NOTE: For production set NODE_ENV=production to set secure cookie flag.
 */
const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access-secret-example';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret-example';
const ACCESS_EXP = process.env.ACCESS_TOKEN_EXPIRY || '15m';
const REFRESH_EXP = process.env.REFRESH_TOKEN_EXPIRY || '7d';

function signAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXP });
}

function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

function signRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXP });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

function setRefreshCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production';
  // cookie options: httpOnly, secure in production, sameSite strict
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7 // fallback 7 days (ms)
  });
}

function clearRefreshCookie(res) {
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'lax' });
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  setRefreshCookie,
  clearRefreshCookie
};
