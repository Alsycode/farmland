// path: src/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

/**
 * Factory to create a rate limiter middleware.
 * Reads defaults from environment variables but accepts overrides.
 */
function createRateLimiter(options = {}) {
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10); // default 15m
  const max = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);
  const limiter = rateLimit({
    windowMs: options.windowMs || windowMs,
    max: options.max || max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.warn('Rate limit exceeded', { ip: req.ip, path: req.originalUrl });
      res.status(429).json({ ok: false, error: 'Too many requests, please try again later.' });
    },
    ...options.extra
  });
  return limiter;
}

module.exports = { createRateLimiter };
