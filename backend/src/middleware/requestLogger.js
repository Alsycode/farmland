// backend/src/middleware/requestLogger.js
/**
 * Purpose: Simple request logger that also tracks metrics in-memory.
 */
module.exports = (req, res, next) => {
  const start = Date.now();

  // increment request count immediately for quick visibility
  const metrics = req.app.get('metrics') || { requestCount:0, totalResponseTimeMs:0 };
  metrics.requestCount = (metrics.requestCount || 0) + 1;
  req.app.set('metrics', metrics);

  res.on('finish', () => {
    const duration = Date.now() - start;
    const m = req.app.get('metrics') || { requestCount:0, totalResponseTimeMs:0 };
    m.totalResponseTimeMs = (m.totalResponseTimeMs || 0) + duration;
    req.app.set('metrics', m);
    // Simple console log (later integrate with winston/elastic)
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
};
