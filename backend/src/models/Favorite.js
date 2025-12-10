// backend/src/models/Favorite.js
/**
 * Purpose: Favorite listing model (user bookmarks)
 */
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true, index: true },
  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'favorites'
});

// unique compound index to prevent duplicates
favoriteSchema.index({ user: 1, listing: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
