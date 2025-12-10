// path: src/models/Favorite.js
const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

FavoriteSchema.index({ property: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', FavoriteSchema);
