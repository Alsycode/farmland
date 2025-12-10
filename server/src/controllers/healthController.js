// path: src/controllers/healthController.js
exports.health = (req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    timestamp: Date.now(),
    message: 'Farmland Listings API is healthy'
  });
};
