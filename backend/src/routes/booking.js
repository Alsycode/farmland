// backend/src/routes/booking.js
/**
 * Purpose: Booking routes mounted at /bookings
 */
const express = require('express');
const router = express.Router();
const bookingCtrl = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// POST /bookings - create visit request
router.post('/', auth, bookingCtrl.createBooking);

// GET /bookings - list (user or owner or admin)
router.get('/', auth, bookingCtrl.listBookings);

// GET /bookings/:id
router.get('/:id', auth, bookingCtrl.getBooking);

// PUT /bookings/:id/status - update status (owner or admin)
router.put('/:id/status', auth, bookingCtrl.updateBookingStatus);

module.exports = router;
