// path: src/middleware/roleMiddleware.js

const ApiError = require('../utils/ApiError');

/**
 * requireRole(...allowedRoles)
 * Usage:
 *   requireRole('admin')
 *   requireRole('admin', 'manager')
 *
 * Assumes:
 * - authMiddleware.protect has already run
 * - req.user exists
 * - req.user.role contains role string
 */
exports.requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new ApiError(401, 'Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `Access denied. Required role: ${allowedRoles.join(', ')}`
        )
      );
    }

    next();
  };
};
