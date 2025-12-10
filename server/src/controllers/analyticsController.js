// path: src/controllers/analyticsController.js
const analyticsService = require('../services/analyticsService');

/**
 * GET /api/analytics/overview
 * Manager/Admin access
 */
exports.overview = async (req, res, next) => {
  try {
    const data = await analyticsService.getOverview();
    return res.json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /api/analytics/top-viewed?limit=10
 */
exports.topViewed = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit || '10', 10);
    const items = await analyticsService.getTopViewedProperties(limit);
    return res.json({ ok: true, items });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /api/analytics/bookings-per-property?limit=10
 */
exports.bookingsPerProperty = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit || '10', 10);
    const items = await analyticsService.getBookingsPerProperty(limit);
    return res.json({ ok: true, items });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /api/analytics/revenue?from=2025-01-01&to=2025-12-31
 */
exports.revenue = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const summary = await analyticsService.calculateRevenue({ from, to });
    return res.json({ ok: true, summary });
  } catch (err) {
    return next(err);
  }
};
