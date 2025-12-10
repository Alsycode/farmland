// path: src/middleware/requestId.js
// Attach a lightweight request id to each request for traceability
const crypto = require('crypto');

function generateRequestId() {
  return crypto.randomBytes(8).toString('hex');
}

function requestIdMiddleware(req, res, next) {
  const incoming = req.get('X-Request-Id');
  const id = incoming || generateRequestId();
  req.id = id;
  res.setHeader('X-Request-Id', id);
  next();
}

module.exports = requestIdMiddleware;
