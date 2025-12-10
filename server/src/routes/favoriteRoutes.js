// path: src/routes/favoriteRoutes.js
const express = require('express');
const { body, param, query } = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');
const { authenticate } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validation');
const favoriteController = require('../controllers/favoriteController');

const router = express.Router();

/**
 * POST /api/favorites/toggle
 * body: { propertyId }
 */
router.post(
  '/toggle',
  authenticate,
  [ body('propertyId').isMongoId().withMessage('Valid propertyId required'), validate ],
  asyncHandler(favoriteController.toggleFavorite)
);

/**
 * GET /api/favorites
 * list current user's favorites
 */
router.get(
  '/',
  authenticate,
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
    validate
  ],
  asyncHandler(favoriteController.listFavorites)
);

/**
 * DELETE /api/favorites/:id
 */
router.delete(
  '/:id',
  authenticate,
  [ param('id').isMongoId().withMessage('Invalid favorite id'), validate ],
  asyncHandler(favoriteController.removeFavorite)
);

module.exports = router;
