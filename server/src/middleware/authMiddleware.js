// path: src/middleware/authMiddleware.js
const { verifyAccessToken } = require('../services/jwtService');
const User = require('../models/User');

/**
 * Authenticate requests. Supports:
 * - Authorization header: Bearer <token>
 * - accessToken cookie
 *
 * On success: attaches req.user = userDoc (without sensitive fields)
 */
async function authenticate(req, res, next) {
  try {
    const authHeader = req.get('Authorization') || '';
    const tokenFromHeader = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const token = tokenFromHeader || req.cookies?.accessToken || null;
    if (!token) {
      return res.status(401).json({ ok: false, error: 'Authentication required' });
    }

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (err) {
      return res.status(401).json({ ok: false, error: 'Invalid or expired access token' });
    }

    const user = await User.findById(payload.sub).select('-password -refreshTokens').lean();
    if (!user) {
      return res.status(401).json({ ok: false, error: 'User not found for token' });
    }

    req.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
}

/**
 * Role-based guard. Accepts one or more roles.
 * Usage: requireRole('admin') or requireRole('manager','admin')
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ ok: false, error: 'Authentication required' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ ok: false, error: 'Forbidden: insufficient role' });
    }
    return next();
  };
}

module.exports = { authenticate, requireRole };
