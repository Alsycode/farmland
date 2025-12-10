// backend/src/routes/analytics.js
/**
 * Purpose: Admin analytics routes mounted at /admin/analytics
 */
const express = require('express');
const router = express.Router();
const analyticsCtrl = require('../controllers/analyticsController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

// GET /admin/analytics/summary
router.get('/summary', auth, roles('admin'), analyticsCtrl.summary);

module.exports = router;