// backend/src/routes/dev.js
/**
 * Purpose: Dev-only helper routes (model counts). Mounted at /dev.
 * NOTE: Remove or protect this route in production.
 */
const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Listing = require('../models/Listing');
const Booking = require('../models/Booking');
const Favorite = require('../models/Favorite');
const Message = require('../models/Message');
const AdminAnalytics = require('../models/AdminAnalytics');

router.get('/models', async (req, res, next) => {
  try {
    const counts = await Promise.all([
      User.countDocuments(),
      Listing.countDocuments(),
      Booking.countDocuments(),
      Favorite.countDocuments(),
      Message.countDocuments(),
      AdminAnalytics.countDocuments()
    ]);
    res.json({
      ok: true,
      counts: {
        users: counts[0],
        listings: counts[1],
        bookings: counts[2],
        favorites: counts[3],
        messages: counts[4],
        analytics: counts[5]
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
