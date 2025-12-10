// path: src/models/Property.js
const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
  type: { type: String, enum: ['Point'], default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' } // [lng, lat]
}, { _id: false });

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true }, // price in INR or smallest currency unit per SRS
  area: { type: Number, required: false }, // e.g., acres or sqft (clarify in SRS)
  unit: { type: String, default: 'acre' }, // optional unit
  address: { type: String, required: true },
  location: GeoSchema, // optional geo coordinates
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  images: [{ url: String, filename: String, uploadedAt: { type: Date, default: Date.now } }],
  amenities: [{ type: String }], // e.g., water, irrigation, electricity
  tags: [{ type: String }],
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  views: { type: Number, default: 0 },
  metadata: { type: mongoose.Schema.Types.Mixed }, // any extra data
}, {
  timestamps: true
});

// Text index for search
PropertySchema.index({ title: 'text', description: 'text', address: 'text', tags: 'text' });

const Property = mongoose.model('Property', PropertySchema);
module.exports = Property;
