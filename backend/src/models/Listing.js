// backend/src/models/Listing.js
/**
 * Purpose: Listing model with geojson location and full-text search fields.
 * TODO: Add SRS-specific attributes (soil_type, irrigation, legal_docs)
 */
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pricePerAcre: { type: Number, required: true },
  area: { type: Number, required: true },
  address: { type: String },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
  },
  images: [{ type: String }],
  amenities: [{ type: String }],
  status: { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' },
  isAvailable: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  collection: 'listings'
});

// 2dsphere index for geo queries
listingSchema.index({ location: '2dsphere' });
// text index for search across title & description
listingSchema.index({ title: 'text', description: 'text' });

// Pre-save hook to update updatedAt
listingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Listing', listingSchema);
