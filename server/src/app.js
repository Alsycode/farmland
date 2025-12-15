// path: src/app.js
/**
 * Creates and exports the Express `app` without listening.
 * This allows tests to import the app and run supertest against it.
 *
 * Note: index.js will import this file and start listening.
 */
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();

const { requestLogger } = require('./middleware/requestLogger');
const requestIdMiddleware = require('./middleware/requestId');
const { createRateLimiter } = require('./middleware/rateLimiter');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const routes = require('./routes');
const blogRoutes = require('./routes/blogRoutes');
const propertyRoutes = require("./routes/propertyRoutes") 
function createApp() {
  const app = express();

  // Request id
  app.use(requestIdMiddleware);

  // Security
  app.use(helmet());

  // // CORS
  // app.use(cors({ origin: true, credentials: true }));
app.use(cors({
  origin: [
   
     'http://localhost:5174',  
      'http://localhost:5175',    // Vite dev server
    'http://127.0.0.1:5173',     // same for IPv4 localhost
    'http://localhost:3000',     // common React dev port (fallback)
  ],
  credentials: true,
  optionsSuccessStatus: 200
}));
  // Logging
  app.use(requestLogger);

  // Parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Global rate limiting
  app.use(createRateLimiter());

  // Serve uploads (for local dev)
  const UPLOADS_FOLDER = process.env.UPLOADS_FOLDER || 'uploads';
  app.use('/uploads', express.static(path.join(process.cwd(), UPLOADS_FOLDER), { index: false }));

  // API routes
  app.use('/api', routes);
app.use('/api/blogs', blogRoutes);
app.use('/api/properties', propertyRoutes);
  // Root redirect
  app.get('/', (req, res) => res.redirect('/api/healthz'));

  // 404 and error handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = createApp();
