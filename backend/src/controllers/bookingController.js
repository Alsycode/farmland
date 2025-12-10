// backend/src/controllers/bookingController.js
/**
 * Purpose: Booking controller - create visit requests, list bookings (user/owner/admin), update status.
 *
 * Routes:
 * POST /bookings               - create (auth)
 * GET  /bookings               - list bookings (user's bookings; admin sees all)
 * GET  /bookings/:id           - view single booking (owner/user/admin)
 * PUT  /bookings/:id/status    - update status (owner of listing or admin)
 */
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const User = require('../models/User');

async function createBooking(req, res, next) {
  try {
    const { listingId, startDate, endDate, notes, phone, name } = req.body;
    if (!listingId || !startDate) return res.status(400).json({ ok: false, message: 'listingId and startDate required' });

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ ok: false, message: 'Listing not found' });

    const booking = new Booking({
      listing: listing._id,
      user: req.user.sub,
      owner: listing.owner,
      status: 'pending',
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      notes: notes || '',
      createdAt: new Date()
    });

    await booking.save();
    res.status(201).json({ ok: true, data: booking });
  } catch (err) {
    next(err);
  }
}

async function listBookings(req, res, next) {
  try {
    const userId = req.user.sub;
    const role = req.user.role;
    const { listingId } = req.query;

    let filter = {};
    if (role === 'admin') {
      // admin can filter by listingId
      if (listingId) filter.listing = listingId;
    } else {
      // normal users: list bookings where user=me OR owner of listing
      filter = { $or: [{ user: userId }, { owner: userId }] };
      if (listingId) filter.listing = listingId;
    }

    const docs = await Booking.find(filter).populate('listing').populate('user', 'name email').sort({ createdAt: -1 }).lean();
    res.json({ ok: true, data: docs });
  } catch (err) {
    next(err);
  }
}

async function getBooking(req, res, next) {
  try {
    const id = req.params.id;
    const doc = await Booking.findById(id).populate('listing').populate('user', 'name email').lean();
    if (!doc) return res.status(404).json({ ok: false, message: 'Booking not found' });

    const userId = req.user.sub;
    if (req.user.role !== 'admin' && doc.user._id.toString() !== userId && doc.owner.toString() !== userId) {
      return res.status(403).json({ ok: false, message: 'Forbidden' });
    }

    res.json({ ok: true, data: doc });
  } catch (err) {
    next(err);
  }
}

async function updateBookingStatus(req, res, next) {
  try {
    const id = req.params.id;
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ ok: false, message: 'Invalid status' });
    }

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ ok: false, message: 'Booking not found' });

    // only admin or listing owner can update status
    const userId = req.user.sub;
    if (req.user.role !== 'admin' && booking.owner.toString() !== userId) {
      return res.status(403).json({ ok: false, message: 'Forbidden' });
    }

    booking.status = status;
    await booking.save();
    res.json({ ok: true, data: booking });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createBooking,
  listBookings,
  getBooking,
  updateBookingStatus
};
