// path: src/controllers/favoriteController.js
const Favorite = require('../models/Favorite');
const Property = require('../models/Property');

/**
 * Toggle favorite: if exists remove, else create.
 */
exports.toggleFavorite = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    const property = await Property.findById(propertyId).select('_id');
    if (!property) return res.status(404).json({ ok: false, error: 'Property not found' });

    const existing = await Favorite.findOne({ property: property._id, user: req.user._id });
    if (existing) {
      await existing.deleteOne();
      return res.json({ ok: true, favorited: false });
    }

    const fav = new Favorite({ property: property._id, user: req.user._id });
    await fav.save();
    return res.status(201).json({ ok: true, favorited: true });
  } catch (err) {
    return next(err);
  }
};

/**
 * List favorites for current user
 */
exports.listFavorites = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const p = Math.max(Number(page) || 1, 1);
    const l = Math.min(Number(limit) || 20, 200);

    const [items, total] = await Promise.all([
      Favorite.find({ user: req.user._id }).populate('property').skip((p - 1) * l).limit(l),
      Favorite.countDocuments({ user: req.user._id })
    ]);

    return res.json({ ok: true, meta: { page: p, perPage: l, total, totalPages: Math.ceil(total / l) }, items });
  } catch (err) {
    return next(err);
  }
};

/**
 * Remove favorite by id
 */
exports.removeFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fav = await Favorite.findById(id);
    if (!fav) return res.status(404).json({ ok: false, error: 'Favorite not found' });
    if (fav.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ ok: false, error: 'Forbidden' });
    }
    await fav.deleteOne();
    return res.json({ ok: true, message: 'Removed' });
  } catch (err) {
    return next(err);
  }
};
