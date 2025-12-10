// path: src/middleware/asyncHandler.js
/**
 * Wrap async route handlers to forward errors to next()
 * Usage: router.get('/', asyncHandler(async (req,res) => { ... }));
 */
module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
