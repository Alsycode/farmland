// path: src/routes/adminRoutes.js
const express = require('express');
const { param, query, body } = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');
const { authenticate, requireRole } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validation');
const adminController = require('../controllers/adminController');

const router = express.Router();

// All routes in this file require admin role
router.use(authenticate, requireRole('admin'));

/**
 * GET /api/admin/users
 * Query: page, limit, role, isActive, q
 */
router.get(
  '/users',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
    query('role').optional().isIn(['user', 'manager', 'admin']),
    query('isActive').optional().isBoolean().toBoolean(),
    query('q').optional().isString(),
    validate
  ],
  asyncHandler(adminController.listUsers)
);

/**
 * GET /api/admin/users/:id
 */
router.get(
  '/users/:id',
  [ param('id').isMongoId().withMessage('Invalid user id'), validate ],
  asyncHandler(adminController.getUser)
);

/**
 * PUT /api/admin/users/:id
 * body: { role?, isActive? }
 */
router.put(
  '/users/:id',
  [
    param('id').isMongoId().withMessage('Invalid user id'),
    body('role').optional().isIn(['user', 'manager', 'admin']),
    body('isActive').optional().isBoolean().toBoolean(),
    validate
  ],
  asyncHandler(adminController.updateUser)
);

/**
 * DELETE /api/admin/users/:id
 */
router.delete(
  '/users/:id',
  [ param('id').isMongoId().withMessage('Invalid user id'), validate ],
  asyncHandler(adminController.deleteUser)
);

/**
 * GET /api/admin/stats
 */
router.get('/stats', asyncHandler(adminController.stats));

module.exports = router;
