// backend/src/controllers/messageController.js
/**
 * Purpose: Message controller - send messages, list inbox/outbox, mark read.
 *
 * Routes:
 * POST /messages           - send (auth) body: { to, listing (opt), subject, body }
 * GET  /messages           - list messages where user is sender or recipient
 * GET  /messages/:id       - view message (if participant)
 * PUT  /messages/:id/read  - mark as read (recipient)
 */
const Message = require('../models/Message');
const User = require('../models/User');

async function sendMessage(req, res, next) {
  try {
    const from = req.user.sub;
    const { to, listing, subject, body } = req.body;
    if (!to || !body) return res.status(400).json({ ok: false, message: 'to and body required' });

    const recipient = await User.findById(to);
    if (!recipient) return res.status(404).json({ ok: false, message: 'Recipient not found' });

    const msg = new Message({
      from,
      to,
      listing: listing || null,
      subject: subject || '',
      body: body,
      createdAt: new Date()
    });
    await msg.save();
    res.status(201).json({ ok: true, data: msg });
  } catch (err) {
    next(err);
  }
}

async function listMessages(req, res, next) {
  try {
    const userId = req.user.sub;
    const docs = await Message.find({ $or: [{ from: userId }, { to: userId }] })
      .populate('from', 'name email')
      .populate('to', 'name email')
      .sort({ createdAt: -1 })
      .lean();
    res.json({ ok: true, data: docs });
  } catch (err) {
    next(err);
  }
}

async function getMessage(req, res, next) {
  try {
    const id = req.params.id;
    const doc = await Message.findById(id).populate('from to', 'name email').lean();
    if (!doc) return res.status(404).json({ ok: false, message: 'Message not found' });

    const userId = req.user.sub;
    if (doc.from._id.toString() !== userId && doc.to._id.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ ok: false, message: 'Forbidden' });
    }
    res.json({ ok: true, data: doc });
  } catch (err) {
    next(err);
  }
}

async function markRead(req, res, next) {
  try {
    const id = req.params.id;
    const msg = await Message.findById(id);
    if (!msg) return res.status(404).json({ ok: false, message: 'Message not found' });
    const userId = req.user.sub;
    if (msg.to.toString() !== userId) return res.status(403).json({ ok: false, message: 'Only recipient can mark read' });
    msg.read = true;
    await msg.save();
    res.json({ ok: true, data: msg });
  } catch (err) {
    next(err);
  }
}

module.exports = { sendMessage, listMessages, getMessage, markRead };
