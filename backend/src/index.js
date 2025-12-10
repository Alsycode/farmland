
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');

const requestLogger = require('./middleware/requestLogger');

const errorHandler = require('./middleware/errorHandler');

const healthRoutes = require('./routes/health');
const devRoutes = require('./routes/dev');
const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listing');
const docsRoutes = require('./routes/docs');

const bookingRoutes = require('./routes/booking');
const favoriteRoutes = require('./routes/favorite');
const messageRoutes = require('./routes/message');
const analyticsRoutes = require('./routes/analytics');

const app = express();

// Basic telemetry (in-memory)
const metrics = {
  requestCount: 0,
  totalResponseTimeMs: 0,
};
app.set('metrics', metrics);

// Middlewares
app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(requestLogger);

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS ? parseInt(process.env.RATE_LIMIT_WINDOW_MS) : 60_000,
  max: process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX) : 100,
});
app.use(limiter);

// Routes
app.use('/health', healthRoutes);
app.use('/dev', devRoutes);

// Auth
app.use('/auth', authRoutes);

// Properties (Listings)
app.use('/properties', listingRoutes);

// Bookings, favorites, messages
app.use('/bookings', bookingRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/messages', messageRoutes);

// Admin analytics
app.use('/admin/analytics', analyticsRoutes);

// Docs (Swagger UI)
app.use('/docs', docsRoutes);

// Static uploads (local fallback)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// 404
app.use((req,res,next) => {
  res.status(404).json({ ok:false, message: 'Not Found' });
});

// Error handler
app.use(errorHandler);

// DB connect and start server only when run directly
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/farmland_dev';

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB:', MONGO_URI);
  } catch (err) {
    console.warn('MongoDB connection failed (continuing):', err.message);
  }

  app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
    console.log(`API docs: http://localhost:${PORT}/docs`);
  });
}

if (require.main === module) {
  start();
}

module.exports = app;
