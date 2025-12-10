// path: src/routes/bookingRoutes.js
const express = require('express');
const { body, param, query } = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');
const { authenticate, requireRole } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validation');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

/**
 * POST /api/bookings
 * Create booking (authenticated user)
 * body: { propertyId, preferredDate (ISO), preferredTime?, message?, priceOffered? }
 */
router.post(
  '/',
  authenticate,
  [
    body('propertyId').isMongoId().withMessage('Valid propertyId required'),
    body('preferredDate').isISO8601().toDate().withMessage('preferredDate must be ISO date'),
    body('message').optional().isString().isLength({ max: 2000 }),
    validate
  ],
  asyncHandler(bookingController.createBooking)
);

/**
 * GET /api/bookings
 * List bookings
 * - Users see own bookings
 * - Manager/admin see all
 */
router.get(
  '/',
  authenticate,
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
    validate
  ],
  asyncHandler(bookingController.listBookings)
);

/**
 * GET /api/bookings/:id
 */
router.get(
  '/:id',
  authenticate,
  [ param('id').isMongoId().withMessage('Invalid booking id'), validate ],
  asyncHandler(bookingController.getBooking)
);

/**
 * PUT /api/bookings/:id
 * - User can cancel (status=cancelled)
 * - Manager/Admin can confirm/reject
 */
router.put(
  '/:id',
  authenticate,
  [ param('id').isMongoId().withMessage('Invalid booking id'), validate ],
  asyncHandler(bookingController.updateBooking)
);

module.exports = router;
