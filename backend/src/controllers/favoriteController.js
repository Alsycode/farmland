// backend/src/controllers/favoriteController.js
/**
 * Purpose: Favorite controller - add/remove/list favorites.
 *
 * Routes:
 * POST /favorites         - add favorite { listingId }
 * DELETE /favorites/:id   - remove favorite by favorite id
 * GET /favorites          - list user's favorites
 */
const Favorite = require('../models/Favorite');
const Listing = require('../models/Listing');

async function addFavorite(req, res, next) {
  try {
    const userId = req.user.sub;
    const { listingId } = req.body;
    if (!listingId) return res.status(400).json({ ok: false, message: 'listingId required' });

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ ok: false, message: 'Listing not found' });

    // upsert behavior: if exists return existing, else create
    try {
      const fav = new Favorite({ user: userId, listing: listingId });
      await fav.save();
      return res.status(201).json({ ok: true, data: fav });
    } catch (err) {
      // possible duplicate key error (already favorited)
      const existing = await Favorite.findOne({ user: userId, listing: listingId });
      if (existing) return res.json({ ok: true, data: existing });
      throw err;
    }
  } catch (err) {
    next(err);
  }
}

async function removeFavorite(req, res, next) {
  try {
    const userId = req.user.sub;
    const favId = req.params.id;
    const fav = await Favorite.findById(favId);
    if (!fav) return res.status(404).json({ ok: false, message: 'Favorite not found' });
    if (fav.user.toString() !== userId) return res.status(403).json({ ok: false, message: 'Forbidden' });

    await fav.deleteOne();
    res.json({ ok: true, message: 'Removed' });
  } catch (err) {
    next(err);
  }
}

async function listFavorites(req, res, next) {
  try {
    const userId = req.user.sub;
    const docs = await Favorite.find({ user: userId }).populate('listing').sort({ createdAt: -1 }).lean();
    res.json({ ok: true, data: docs });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addFavorite,
  removeFavorite,
  listFavorites
};
