// backend/src/models/AdminAnalytics.js
/**
 * Purpose: Simple analytics/telemetry model for storing counters or events.
 * Note: This is intentionally simple; for production use consider Prometheus/Influx/Elastic.
 */
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  key: { type: String, required: true, index: true },
  value: { type: Number, default: 0 },
  meta: { type: Object, default: {} },
  timestamp: { type: Date, default: Date.now }
}, {
  collection: 'analytics'
});

module.exports = mongoose.model('AdminAnalytics', analyticsSchema);
