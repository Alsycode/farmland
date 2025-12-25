// path: src/models/Property.js
const mongoose = require('mongoose');

/* ================= GEO ================= */

const GeoSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' } // [lng, lat]
  },
  { _id: false }
);

/* ================= PROPERTY ================= */

const PropertySchema = new mongoose.Schema(
  {
    /* ===== CORE ===== */

    title: { type: String, required: true, trim: true, maxlength: 200 },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true
    },

    description: { type: String, required: true, trim: true },

    price: { type: Number, required: true },
    area: { type: Number },
    unit: { type: String, default: 'acre' },

    address: { type: String, required: true },
    location: GeoSchema,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    /* ===== MEDIA ===== */

    images: [
      {
        url: { type: String, required: true },
        filename: { type: String },
        alt: { type: String }, // SEO image alt text
        uploadedAt: { type: Date, default: Date.now }
      }
    ],

    /* ===== CLASSIFICATION ===== */

    amenities: [{ type: String }],

    listingType: {
      type: [
        {
          type: String,
          enum: ['trending', 'featured', 'upcoming']
        }
      ],
      default: [],
      index: true
    },

    tags: [{ type: String }],

    /* ===== SEO (CRITICAL) ===== */

    seoTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60
    },

    seoDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160
    },

    canonicalUrl: {
      type: String,
      trim: true
    },

    /* ===== SEO SUPPORT FIELDS ===== */

    highlights: [
      {
        type: String,
        trim: true,
        maxlength: 120
      }
    ],

    nearby: [
      {
        label: { type: String, trim: true },
        distance: { type: String, trim: true }
      }
    ],

    legal: {
      landType: { type: String, trim: true }, // Agricultural / NA / Converted
      documentsClear: { type: Boolean, default: false },
      ownershipHistoryYears: { type: Number }
    },

    idealFor: [
      {
        type: String,
        trim: true
      }
    ],

    /* ===== OPTIONAL STRUCTURED DATA ===== */

    facing: { type: String, trim: true },
    waterSource: [{ type: String, trim: true }],
    roadType: { type: String, trim: true },
    electricityAvailability: { type: Boolean },

    /* ===== STATUS ===== */

    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true
    },

    views: { type: Number, default: 0 },

    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

/* ================= INDEXES ================= */

/**
 * Full-text search
 */
PropertySchema.index({
  title: 'text',
  description: 'text',
  address: 'text',
  tags: 'text',
  seoTitle: 'text',
  seoDescription: 'text'
});

/**
 * Geo queries
 */
PropertySchema.index({ location: '2dsphere' });

const Property = mongoose.model('Property', PropertySchema);
module.exports = Property;
