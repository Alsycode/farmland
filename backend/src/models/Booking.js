// backend/src/models/Booking.js
/**
 * Purpose: Booking / VisitRequest model
 * TODO: Add payment/deposit fields if SRS requires
 */
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // denormalized for convenience
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'bookings'
});

module.exports = mongoose.model('Booking', bookingSchema);
