// path: src/middleware/authMiddleware.js

const { verifyAccessToken } = require('../services/jwtService');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');

/**
 * protect / authenticate
 *
 * Supports authentication via:
 * - Authorization: Bearer <token>
 * - HttpOnly cookie: accessToken
 *
 * On success:
 * - Attaches req.user (sanitized user object)
 */
async function authenticate(req, res, next) {
  try {
    const authHeader = req.get('Authorization') || '';
    const tokenFromHeader = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    const token =
      tokenFromHeader ||
      req.cookies?.accessToken ||
      null;

    if (!token) {
      return next(new ApiError(401, 'Authentication required'));
    }

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (err) {
      return next(new ApiError(401, 'Invalid or expired access token'));
    }

    const user = await User.findById(payload.sub)
      .select('-password -refreshTokens')
      .lean();

    if (!user) {
      return next(new ApiError(401, 'User not found for token'));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * requireRole(...roles)
 *
 * Role-based access control middleware
 *
 * Usage:
 *   requireRole('admin')
 *   requireRole('admin', 'manager')
 *
 * Must be used AFTER authenticate
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `Forbidden: requires role ${allowedRoles.join(', ')}`
        )
      );
    }

    next();
  };
}

module.exports = {
  authenticate,
  protect: authenticate, // alias for consistency with routes
  requireRole,
};
