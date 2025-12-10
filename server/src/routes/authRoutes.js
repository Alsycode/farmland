// path: src/routes/authRoutes.js
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * POST /api/auth/register
 * body: { name, email, password, role? }
 */
router.post(
  '/register',
  [
    body('name').isLength({ min: 2 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min length 6'),
    body('role').optional().isIn(['user', 'manager', 'admin']).withMessage('Invalid role'),
  ],
  authController.register
);

/**
 * POST /api/auth/login
 * body: { email, password }
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').exists().withMessage('Password required'),
  ],
  authController.login
);

/**
 * POST /api/auth/refresh
 * Cookies: refreshToken
 */
router.post('/refresh', authController.refresh);

/**
 * POST /api/auth/logout
 * Authenticated route (optional)
 */
router.post('/logout', authenticate, authController.logout);

/**
 * GET /api/auth/me
 * Returns current user
 */
router.get('/me', authenticate, authController.me);

module.exports = router;
