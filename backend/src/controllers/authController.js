// backend/src/controllers/authController.js
/**
 * Purpose: Auth controller - login, refresh, logout, me
 *
 * Routes:
 * POST /auth/login       - body: { email, password }
 * POST /auth/refresh     - reads refresh token cookie -> issues new access token
 * POST /auth/logout      - clears refresh token server-side and cookie
 * GET  /auth/me          - protected route returns user public profile
 */
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const tokenService = require('../utils/tokenService');

async function login(req, res, next) {
  try {
    // basic validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || '').toLowerCase() });

    if (!user) return res.status(401).json({ ok: false, message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ ok: false, message: 'Invalid credentials' });

    // create tokens
    const payload = { sub: user._id.toString(), role: user.role };
    const accessToken = tokenService.signAccessToken(payload);
    const refreshToken = tokenService.signRefreshToken(payload);

    // store refresh token on user (simple)
    user.refreshTokens = user.refreshTokens || [];
    user.refreshTokens.push(refreshToken);
    user.lastLogin = new Date();
    await user.save();

    // set refresh cookie
    tokenService.setRefreshCookie(res, refreshToken);

    res.json({
      ok: true,
      accessToken,
      user: user.publicJSON()
    });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const token = req.cookies && req.cookies.refreshToken;
    if (!token) return res.status(401).json({ ok: false, message: 'No refresh token provided' });

    let payload;
    try {
      payload = tokenService.verifyRefreshToken(token);
    } catch (err) {
      return res.status(401).json({ ok: false, message: 'Invalid refresh token' });
    }

    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ ok: false, message: 'User not found' });

    // verify token exists in user's stored refresh tokens
    if (!user.refreshTokens || !user.refreshTokens.includes(token)) {
      return res.status(401).json({ ok: false, message: 'Refresh token revoked' });
    }

    // issue new access token (do NOT rotate refresh token in this simple flow)
    const accessToken = tokenService.signAccessToken({ sub: user._id.toString(), role: user.role });
    res.json({ ok: true, accessToken });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const token = req.cookies && req.cookies.refreshToken;
    if (!token) {
      // clear cookie regardless
      tokenService.clearRefreshCookie(res);
      return res.json({ ok: true, message: 'Logged out' });
    }

    let payload;
    try {
      payload = tokenService.verifyRefreshToken(token);
    } catch (err) {
      tokenService.clearRefreshCookie(res);
      return res.json({ ok: true, message: 'Logged out' });
    }

    const user = await User.findById(payload.sub);
    if (user && user.refreshTokens && user.refreshTokens.length) {
      // remove this token from stored tokens
      user.refreshTokens = user.refreshTokens.filter(t => t !== token);
      await user.save();
    }

    tokenService.clearRefreshCookie(res);
    res.json({ ok: true, message: 'Logged out' });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    // req.user is set by auth middleware
    if (!req.user) return res.status(401).json({ ok: false, message: 'Not authenticated' });
    const user = await User.findById(req.user.sub);
    if (!user) return res.status(404).json({ ok: false, message: 'User not found' });
    res.json({ ok: true, user: user.publicJSON() });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
  refresh,
  logout,
  me
};
