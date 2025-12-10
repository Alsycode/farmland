// backend/src/routes/favorite.js
/**
 * Purpose: Favorite routes mounted at /favorites
 */
const express = require('express');
const router = express.Router();
const favCtrl = require('../controllers/favoriteController');
const auth = require('../middleware/auth');

// Add favorite
router.post('/', auth, favCtrl.addFavorite);

// List favorites
router.get('/', auth, favCtrl.listFavorites);

// Remove favorite by id
router.delete('/:id', auth, favCtrl.removeFavorite);

module.exports = router;
