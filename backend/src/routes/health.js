// backend/src/routes/health.js
/**
 * Purpose: Minimal health-check and metrics routes (introduced in PART 1).
 */
const express = require('express');
const router = express.Router();

// Simple health check
router.get('/', (req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

// Simple readiness probe
router.get('/ready', (req, res) => {
  // TODO: Expand checks: DB connection, R2 connectivity, queue status
  const ready = true;
  res.json({ ok: ready });
});

// Metrics route - simple in-memory metrics (request count & avg response time)
router.get('/metrics', (req, res) => {
  const metrics = req.app.get('metrics') || { requestCount:0, totalResponseTimeMs:0 };
  const avgMs = metrics.requestCount ? Math.round(metrics.totalResponseTimeMs / metrics.requestCount) : 0;
  res.json({
    ok: true,
    requestCount: metrics.requestCount,
    averageResponseTimeMs: avgMs
  });
});

module.exports = router;
