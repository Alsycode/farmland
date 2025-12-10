// path: src/index.js
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

dotenv.config();

const { connectDB } = require('./config/db');
const routes = require('./routes');

const { requestLogger } = require('./middleware/requestLogger');
const requestIdMiddleware = require('./middleware/requestId');
const { createRateLimiter } = require('./middleware/rateLimiter');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB();

    const app = express();

    // Attach lightweight request id for tracing
    app.use(requestIdMiddleware);

    // Basic security headers
    app.use(helmet());

    // CORS - adjust in later chunks for frontend domain whitelisting
    app.use(cors({
      origin: true,
      credentials: true
    }));

    // Logging: morgan integrated with winston via requestLogger
    app.use(requestLogger);

    // Body parsers
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    app.use(cookieParser());

    // Rate limiting (global) - can be overridden per-route
    const globalLimiter = createRateLimiter();
    app.use(globalLimiter);

    // API routes
    app.use('/api', routes);

    // Health / root
    app.get('/', (req, res) => res.redirect('/api/healthz'));

    // 404
    app.use(notFoundHandler);

    // Error handler
    app.use(errorHandler);

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on http://localhost:${PORT} (env=${process.env.NODE_ENV || 'development'})`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
