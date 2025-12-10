// backend/src/routes/auth.js
/**
 * Purpose: Auth routes (login, refresh, logout, me)
 */
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth.js');

// POST /auth/login
router.post('/login', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
], authController.login);

// POST /auth/refresh
router.post('/refresh', authController.refresh);

// POST /auth/logout
router.post('/logout', authController.logout);

// GET /auth/me
router.get('/me', authMiddleware, authController.me);

module.exports = router;
