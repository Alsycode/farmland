// path: src/routes/analyticsRoutes.js
const express = require('express');
const { query } = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');
const { authenticate, requireRole } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validation');
const analyticsController = require('../controllers/analyticsController');

const router = express.Router();

// Protect analytics endpoints: managers and admins
router.use(authenticate);
router.use(requireRole('manager', 'admin'));

/**
 * GET /api/analytics/overview
 */
router.get('/overview', asyncHandler(analyticsController.overview));

/**
 * GET /api/analytics/top-viewed?limit=10
 */
router.get(
  '/top-viewed',
  [ query('limit').optional().isInt({ min: 1, max: 100 }).toInt(), validate ],
  asyncHandler(analyticsController.topViewed)
);

/**
 * GET /api/analytics/bookings-per-property?limit=10
 */
router.get(
  '/bookings-per-property',
  [ query('limit').optional().isInt({ min: 1, max: 100 }).toInt(), validate ],
  asyncHandler(analyticsController.bookingsPerProperty)
);

/**
 * GET /api/analytics/revenue?from=ISO&to=ISO
 */
router.get(
  '/revenue',
  [
    query('from').optional().isISO8601().toDate(),
    query('to').optional().isISO8601().toDate(),
    validate
  ],
  asyncHandler(analyticsController.revenue)
);

module.exports = router;
