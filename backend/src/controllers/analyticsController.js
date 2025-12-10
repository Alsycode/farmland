// backend/src/controllers/analyticsController.js
/**
 * Purpose: Admin analytics endpoints - simple aggregates from collections.
 *
 * Routes:
 * GET /admin/analytics/summary   - aggregate counts (admin only)
 */
const User = require('../models/User');
const Listing = require('../models/Listing');
const Booking = require('../models/Booking');
const Favorite = require('../models/Favorite');
const Message = require('../models/Message');

async function summary(req, res, next) {
  try {
    // simple parallel counts
    const [users, listings, bookings, favorites, messages] = await Promise.all([
      User.countDocuments(),
      Listing.countDocuments(),
      Booking.countDocuments(),
      Favorite.countDocuments(),
      Message.countDocuments()
    ]);
    res.json({
      ok: true,
      data: { users, listings, bookings, favorites, messages }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { summary };
