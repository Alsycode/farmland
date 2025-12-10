// path: src/controllers/adminController.js
const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const { validationResult } = require('express-validator');

/**
 * List users with pagination and optional role / active filters.
 * Query: page, limit, role, isActive, q (name/email fuzzy)
 */
exports.listUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, role, isActive, q } = req.query;
    const p = Math.max(Number(page) || 1, 1);
    const l = Math.min(Number(limit) || 50, 200);

    const filter = {};
    if (role) filter.role = role;
    if (typeof isActive !== 'undefined') filter.isActive = isActive === 'true';
    if (q) filter.$or = [{ name: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }];

    const [items, total] = await Promise.all([
      User.find(filter).select('-password -refreshTokens').sort({ createdAt: -1 }).skip((p - 1) * l).limit(l),
      User.countDocuments(filter)
    ]);

    return res.json({ ok: true, meta: { page: p, perPage: l, total, totalPages: Math.ceil(total / l) }, items });
  } catch (err) {
    return next(err);
  }
};

/**
 * Get a single user's details by id
 */
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password -refreshTokens');
    if (!user) return res.status(404).json({ ok: false, error: 'User not found' });
    return res.json({ ok: true, user });
  } catch (err) {
    return next(err);
  }
};

/**
 * Update a user's role and isActive flag (admin only)
 * Body: { role?, isActive? }
 */
exports.updateUser = async (req, res, next) => {
  try {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ ok: false, errors: errors.array() });

    const { id } = req.params;
    const { role, isActive } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ ok: false, error: 'User not found' });

    if (role) {
      if (!['user', 'manager', 'admin'].includes(role)) {
        return res.status(400).json({ ok: false, error: 'Invalid role' });
      }
      user.role = role;
    }
    if (typeof isActive !== 'undefined') user.isActive = !!isActive;

    await user.save();

    return res.json({ ok: true, user: user.toJSON() });
  } catch (err) {
    return next(err);
  }
};

/**
 * Delete a user (hard delete). Note: in production consider soft-delete and data retention policies.
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Prevent deleting yourself
    if (req.user && req.user._id && req.user._id.toString() === id) {
      return res.status(400).json({ ok: false, error: 'Cannot delete yourself' });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ ok: false, error: 'User not found' });

    // Optionally cascade delete user's properties/bookings/messages — here we only delete user
    await user.deleteOne();

    return res.json({ ok: true, message: 'User deleted' });
  } catch (err) {
    return next(err);
  }
};

/**
 * Simple stats endpoint - overall counts and some aggregations
 * Returns:
 *  - totalUsers
 *  - totalProperties
 *  - totalBookings
 *  - recentSignups (last 7 days)
 *  - bookingsPerProperty (top 10 sample)
 */
exports.stats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProperties = await Property.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentSignups = await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    // bookings per property (top 10)
    const bookingsAgg = await Booking.aggregate([
      { $group: { _id: '$property', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'properties',
          localField: '_id',
          foreignField: '_id',
          as: 'property'
        }
      },
      { $unwind: { path: '$property', preserveNullAndEmptyArrays: true } },
      { $project: { propertyId: '$_id', count: 1, title: '$property.title' } }
    ]);

    return res.json({
      ok: true,
      stats: { totalUsers, totalProperties, totalBookings, recentSignups, bookingsPerProperty: bookingsAgg }
    });
  } catch (err) {
    return next(err);
  }
};
