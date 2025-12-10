// path: src/routes/index.js
const express = require('express');
const router = express.Router();

const healthController = require('../controllers/healthController');

// Health check
router.get('/healthz', healthController.health);

// Auth routes
router.use('/auth', require('./authRoutes'));

// Properties / Listings
router.use('/properties', require('./propertyRoutes'));

// Bookings
router.use('/bookings', require('./bookingRoutes'));

// Favorites
router.use('/favorites', require('./favoriteRoutes'));

// Messages
router.use('/messages', require('./messageRoutes'));

// Admin routes (mounted under /api/admin)
router.use('/admin', require('./adminRoutes'));

// Analytics (manager & admin)
router.use('/analytics', require('./analyticsRoutes'));

// Mount future feature routers here (uploads, docs, etc.)

module.exports = router;
