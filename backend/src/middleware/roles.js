// backend/src/middleware/roles.js
/**
 * Purpose: Role-based access control middleware.
 * Usage: protect routes with required roles like: roles('admin')
 */
module.exports = function roles(...allowed) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ ok: false, message: 'Not authenticated' });
    if (!allowed.includes(req.user.role)) return res.status(403).json({ ok: false, message: 'Forbidden' });
    next();
  };
};
