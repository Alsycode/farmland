// path: src/middleware/requestLogger.js
// Integrates morgan with winston (logger stream) and logs useful request info
const morgan = require('morgan');
const logger = require('../utils/logger');

// Morgan token to log request id
morgan.token('id', (req) => req.id || '-');

const stream = {
  write: (message) => {
    // Morgan outputs a trailing newline; remove it
    logger.info(message.trim());
  }
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'test';
};

// Combined format with request id
const morganFormat = ':id :remote-addr - :method :url :status :res[content-length] - :response-time ms';

const requestLogger = morgan(morganFormat, { stream, skip });

module.exports = { requestLogger };
