// path: src/controllers/messageController.js
const Message = require('../models/Message');
const User = require('../models/User');
const Property = require('../models/Property');
const { validationResult } = require('express-validator');

/**
 * Send a message from req.user to another user (or to owner of a property)
 * body: toUserId (optional), propertyId (optional), subject, content
 * If propertyId supplied and toUserId not supplied, message will be sent to property owner.
 */
exports.sendMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ ok: false, errors: errors.array() });

    const { toUserId, propertyId, subject, content } = req.body;
    let toUser = null;

    if (toUserId) {
      toUser = await User.findById(toUserId).select('_id');
      if (!toUser) return res.status(404).json({ ok: false, error: 'Recipient user not found' });
    } else if (propertyId) {
      const property = await Property.findById(propertyId).select('owner');
      if (!property) return res.status(404).json({ ok: false, error: 'Property not found' });
      toUser = await User.findById(property.owner).select('_id');
    } else {
      return res.status(400).json({ ok: false, error: 'toUserId or propertyId is required' });
    }

    const message = new Message({
      from: req.user._id,
      to: toUser._id,
      property: propertyId || undefined,
      subject,
      content
    });

    await message.save();

    // Optionally create a notification/email (out of scope)
    return res.status(201).json({ ok: true, message: message });
  } catch (err) {
    return next(err);
  }
};

/**
 * List inbox/outbox for current user
 * query: box=inbox|sent (default: inbox)
 */
exports.listMessages = async (req, res, next) => {
  try {
    const { box = 'inbox', page = 1, limit = 30 } = req.query;
    const p = Math.max(Number(page) || 1, 1);
    const l = Math.min(Number(limit) || 30, 200);

    const filter = {};
    if (box === 'inbox') {
      filter.to = req.user._id;
    } else {
      filter.from = req.user._id;
    }

    // Exclude messages deleted by this user
    filter.deletedBy = { $ne: req.user._id };

    const [items, total] = await Promise.all([
      Message.find(filter).populate('from', 'name email').populate('to', 'name email').populate('property', 'title').sort({ createdAt: -1 }).skip((p - 1) * l).limit(l),
      Message.countDocuments(filter)
    ]);

    return res.json({ ok: true, meta: { page: p, perPage: l, total, totalPages: Math.ceil(total / l) }, items });
  } catch (err) {
    return next(err);
  }
};

/**
 * Mark message as read (owner of message only)
 */
exports.markRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ ok: false, error: 'Message not found' });

    if (message.to.toString() !== req.user._id.toString()) {
      return res.status(403).json({ ok: false, error: 'Forbidden' });
    }

    message.read = true;
    await message.save();
    return res.json({ ok: true, message });
  } catch (err) {
    return next(err);
  }
};

/**
 * Soft-delete message for current user (adds user to deletedBy)
 */
exports.deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ ok: false, error: 'Message not found' });

    const uid = req.user._id.toString();
    if (message.from.toString() !== uid && message.to.toString() !== uid) {
      return res.status(403).json({ ok: false, error: 'Forbidden' });
    }

    if (!message.deletedBy.includes(req.user._id)) {
      message.deletedBy.push(req.user._id);
      await message.save();
    }

    return res.json({ ok: true, message: 'Message deleted for current user' });
  } catch (err) {
    return next(err);
  }
};
