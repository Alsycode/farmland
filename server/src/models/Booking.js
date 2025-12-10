// path: src/models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // requester
  preferredDate: { type: Date, required: true },
  preferredTime: { type: String, required: false }, // optional textual time (e.g., "Morning")
  message: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected', 'cancelled'], default: 'pending' },
  adminNote: { type: String },
  priceOffered: { type: Number },
  createdAt: { type: Date, default: Date.now },
  respondedAt: { type: Date }
}, { timestamps: true });

BookingSchema.index({ property: 1, user: 1 });

module.exports = mongoose.model('Booking', BookingSchema);
