// path: src/models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' }, // optional context
  subject: { type: String },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  deletedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // soft-delete per user
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
