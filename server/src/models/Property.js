// path: src/models/Property.js
const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
  type: { type: String, enum: ['Point'], default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' } // [lng, lat]
}, { _id: false });

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, required: true, trim: true },

  price: { type: Number, required: true },
  area: { type: Number },
  unit: { type: String, default: 'acre' },

  address: { type: String, required: true },
  location: GeoSchema,

  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Array of image objects (URLs point to your static files like "/Farmland-Ownership.jpg")
  images: [
    {
      url: { type: String, required: true },
      filename: { type: String },        // optional, e.g. "Farmland-Ownership.jpg"
      uploadedAt: { type: Date, default: Date.now }
    }
  ],

  amenities: [{ type: String }],

  listingType: {
    type: [{
      type: String,
      enum: ['trending', 'featured', 'upcoming']
    }],
    default: [],
    index: true
  },

  tags: [{ type: String }],

  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },

  views: { type: Number, default: 0 },
  metadata: mongoose.Schema.Types.Mixed

}, { timestamps: true });

PropertySchema.index({ title: 'text', description: 'text', address: 'text', tags: 'text' });

const Property = mongoose.model('Property', PropertySchema);
module.exports = Property;
