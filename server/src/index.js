// path: src/index.js
/**
 * Main entry — starts the HTTP server.
 * This file imports app from src/app.js so tests can import app without starting the server.
 */
const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const createApp = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB();
    const server = http.createServer(createApp);

    server.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on http://localhost:${PORT} (env=${process.env.NODE_ENV || 'development'})`);
    });

    // Graceful shutdown signals
    process.on('SIGINT', () => {
      // eslint-disable-next-line no-console
      console.log('SIGINT received, shutting down');
      server.close(() => process.exit(0));
    });
    process.on('SIGTERM', () => {
      // eslint-disable-next-line no-console
      console.log('SIGTERM received, shutting down');
      server.close(() => process.exit(0));
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
