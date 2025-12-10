// path: src/controllers/bookingController.js
const Booking = require('../models/Booking');
const Property = require('../models/Property');
const { validationResult } = require('express-validator');

/**
 * Create a booking/enquiry (authenticated users)
 */
exports.createBooking = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ ok: false, errors: errors.array() });

    const { propertyId, preferredDate, preferredTime, message, priceOffered } = req.body;

    const property = await Property.findById(propertyId).select('_id owner title');
    if (!property) return res.status(404).json({ ok: false, error: 'Property not found' });

    const booking = new Booking({
      property: property._id,
      user: req.user._id,
      preferredDate: new Date(preferredDate),
      preferredTime,
      message,
      priceOffered
    });

    await booking.save();

    // Ideally notify owner via message/email (out of scope for now)
    return res.status(201).json({ ok: true, booking });
  } catch (err) {
    return next(err);
  }
};

/**
 * Get bookings with filters.
 * - If admin or manager: can filter across all bookings
 * - If user: only own bookings
 * Query params: page, limit, status, propertyId
 */
exports.listBookings = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, propertyId } = req.query;
    const p = Math.max(Number(page) || 1, 1);
    const l = Math.min(Number(limit) || 20, 200);

    const filter = {};
    if (status) filter.status = status;
    if (propertyId) filter.property = propertyId;

    // If normal user, restrict to own bookings
    if (req.user.role === 'user') {
      filter.user = req.user._id;
    }

    const [items, total] = await Promise.all([
      Booking.find(filter).populate('property', 'title').populate('user', 'name email role').sort({ createdAt: -1 }).skip((p - 1) * l).limit(l),
      Booking.countDocuments(filter)
    ]);

    return res.json({ ok: true, meta: { page: p, perPage: l, total, totalPages: Math.ceil(total / l) }, items });
  } catch (err) {
    return next(err);
  }
};

/**
 * Get single booking by id (owner/user/admin)
 */
exports.getBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate('property', 'title owner').populate('user', 'name email');
    if (!booking) return res.status(404).json({ ok: false, error: 'Booking not found' });

    // If user role and not owner of booking -> forbidden
    if (req.user.role === 'user' && booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ ok: false, error: 'Forbidden' });
    }

    return res.json({ ok: true, booking });
  } catch (err) {
    return next(err);
  }
};

/**
 * Update booking status or adminNote (manager/admin can confirm/reject; user can cancel)
 */
exports.updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ ok: false, error: 'Booking not found' });

    // User can cancel own booking
    if (req.user.role === 'user') {
      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ ok: false, error: 'Forbidden' });
      }
      if (status && status === 'cancelled') {
        booking.status = 'cancelled';
        booking.respondedAt = new Date();
      } else {
        return res.status(400).json({ ok: false, error: 'Users may only cancel bookings' });
      }
    } else {
      // manager/admin: can change status to confirmed/rejected and add note
      if (status && ['confirmed', 'rejected', 'pending', 'cancelled'].includes(status)) {
        booking.status = status;
        booking.respondedAt = new Date();
      }
      if (adminNote) booking.adminNote = adminNote;
    }

    await booking.save();
    return res.json({ ok: true, booking });
  } catch (err) {
    return next(err);
  }
};
