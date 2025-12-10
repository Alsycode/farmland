// backend/src/middleware/errorHandler.js
/**
 * Purpose: Centralized error handler.
 */
module.exports = (err, req, res, next) => {
  console.error('Unhandled error:', err);
  const status = err.status || 500;
  const safeMessage = err.safeMsg || 'Internal Server Error';
  res.status(status).json({
    ok: false,
    message: safeMessage,
    details: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
};
