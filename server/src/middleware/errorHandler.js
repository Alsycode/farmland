// path: src/middleware/errorHandler.js
const logger = require('../utils/logger');

/**
 * 404 handler - keep as simple JSON response
 */
function notFoundHandler(req, res, next) {
  res.status(404).json({ ok: false, error: 'Not Found', path: req.originalUrl });
}

/**
 * Central error handler
 * Accepts errors thrown from controllers or middleware and responds with JSON
 * - Known errors may include .status and .details
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const status = err.status && Number.isInteger(err.status) ? err.status : 500;
  const payload = {
    ok: false,
    error: err.message || 'Internal Server Error',
    requestId: req.id || undefined
  };

  // Attach validation details or other extra fields if present
  if (err.details) payload.details = err.details;

  // Log full error server-side
  logger.error('Unhandled error', { message: err.message, stack: err.stack, requestId: req.id, path: req.originalUrl });

  // In non-production include stack
  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
}

module.exports = { notFoundHandler, errorHandler };
