const mongoose = require('mongoose');
const slugify = require('slugify');

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    excerpt: {
      type: String,
      maxlength: 300,
    },

    content: {
      type: String,
      required: true,
    },

    featuredImage: {
      type: String,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    author: {
      type: String,
      default: "Farmland Team",
    },

    published: {
      type: Boolean,
      default: true,
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },

    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true }
);

// Auto-generate slug from title
BlogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);