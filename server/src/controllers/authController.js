// path: src/controllers/authController.js
const { validationResult } = require('express-validator');
const User = require('../models/User');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} = require('../services/jwtService');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  domain: process.env.COOKIE_DOMAIN || undefined,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/'
};

function sendTokenCookies(res, accessToken, refreshToken) {
  // Optionally set accessToken as cookie for convenience (also return in body)
  res.cookie('accessToken', accessToken, { ...COOKIE_OPTIONS, maxAge: 15 * 60 * 1000 }); // 15m
  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
}

exports.register = async (req, res, next) => {
  try {
    // validation results handled below
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ ok: false, errors: errors.array() });
    }

    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ ok: false, error: 'Email already in use' });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
    const { token: refreshToken } = signRefreshToken({ sub: user._id.toString(), role: user.role });

    // store refresh token in DB (simple rotation model)
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    sendTokenCookies(res, accessToken, refreshToken);

    return res.status(201).json({
      ok: true,
      message: 'Registered',
      accessToken,
      user: user.toJSON()
    });
  } catch (err) {
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ ok: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ ok: false, error: 'Invalid credentials' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ ok: false, error: 'Invalid credentials' });

    const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
    const { token: refreshToken } = signRefreshToken({ sub: user._id.toString(), role: user.role });

    // persist refresh token
    user.refreshTokens.push({ token: refreshToken });
    // keep only last 10 refresh tokens to limit storage
    if (user.refreshTokens.length > 10) user.refreshTokens = user.refreshTokens.slice(-10);
    await user.save();

    sendTokenCookies(res, accessToken, refreshToken);

    return res.json({
      ok: true,
      message: 'Logged in',
      accessToken,
      user: user.toJSON()
    });
  } catch (err) {
    return next(err);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(401).json({ ok: false, error: 'Refresh token required' });

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (err) {
      return res.status(401).json({ ok: false, error: 'Invalid refresh token' });
    }

    const userId = payload.sub;
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ ok: false, error: 'User not found' });

    // Check refresh token exists in DB
    const found = user.refreshTokens.some(rt => rt.token === refreshToken);
    if (!found) {
      // Token reuse detection could be added (clear all tokens), but for now reject
      return res.status(401).json({ ok: false, error: 'Refresh token not recognized' });
    }

    // Rotate tokens: remove the used refresh token and issue a new one
    user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== refreshToken);
    const newAccessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
    const { token: newRefreshToken } = signRefreshToken({ sub: user._id.toString(), role: user.role });
    user.refreshTokens.push({ token: newRefreshToken });
    await user.save();

    sendTokenCookies(res, newAccessToken, newRefreshToken);

    return res.json({ ok: true, accessToken: newAccessToken, user: user.toJSON() });
  } catch (err) {
    return next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken && req.user) {
      // remove refresh token for this user
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { refreshTokens: { token: refreshToken } }
      });
    }
    // Clear cookies (set expired)
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });
    return res.json({ ok: true, message: 'Logged out' });
  } catch (err) {
    return next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    // req.user is set by authenticate middleware
    if (!req.user) return res.status(401).json({ ok: false, error: 'Not authenticated' });
    return res.json({ ok: true, user: req.user });
  } catch (err) {
    return next(err);
  }
};
