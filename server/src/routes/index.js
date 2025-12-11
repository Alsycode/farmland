// path: src/routes/index.js
const express = require('express');
const router = express.Router();

const healthController = require('../controllers/healthController');

// Health check
router.get('/healthz', healthController.health);

// Docs (OpenAPI UI)
router.use('/docs', require('./docsRoutes'));

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

// Uploads (if not mounted elsewhere)
router.use('/uploads', require('./uploadRoutes'));

// Mount future feature routers here

module.exports = router;
