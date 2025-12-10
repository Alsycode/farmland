// backend/src/middleware/auth.js
/**
 * Purpose: Authentication middleware to protect routes.
 * Behavior:
 *  - Looks for Authorization: Bearer <token> header OR
 *  - Access token in cookie named 'accessToken' (optional)
 *  - Verifies JWT and attaches req.user = { sub: <userId>, role: <role> }
 */
const tokenService = require('../utils/tokenService');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) return res.status(401).json({ ok: false, message: 'No access token' });

    let payload;
    try {
      payload = tokenService.verifyAccessToken(token);
    } catch (err) {
      return res.status(401).json({ ok: false, message: 'Invalid access token' });
    }

    req.user = payload; // { sub, role, iat, exp }
    next();
  } catch (err) {
    next(err);
  }
};
