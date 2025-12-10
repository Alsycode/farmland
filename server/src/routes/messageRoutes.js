// path: src/routes/messageRoutes.js
const express = require('express');
const { body, param, query } = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');
const { authenticate } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validation');
const messageController = require('../controllers/messageController');

const router = express.Router();

/**
 * POST /api/messages
 * Send message
 * body: { toUserId (optional), propertyId (optional), subject, content }
 */
router.post(
  '/',
  authenticate,
  [
    body('toUserId').optional().isMongoId(),
    body('propertyId').optional().isMongoId(),
    body('content').isLength({ min: 1 }).withMessage('Content required'),
    validate
  ],
  asyncHandler(messageController.sendMessage)
);

/**
 * GET /api/messages
 * box=inbox|sent
 */
router.get(
  '/',
  authenticate,
  [
    query('box').optional().isIn(['inbox', 'sent']),
    query('page').optional().isInt({ min: 1 }).toInt(),
    validate
  ],
  asyncHandler(messageController.listMessages)
);

/**
 * POST /api/messages/:id/read
 */
router.post(
  '/:id/read',
  authenticate,
  [ param('id').isMongoId().withMessage('Invalid message id'), validate ],
  asyncHandler(messageController.markRead)
);

/**
 * DELETE /api/messages/:id
 */
router.delete(
  '/:id',
  authenticate,
  [ param('id').isMongoId().withMessage('Invalid message id'), validate ],
  asyncHandler(messageController.deleteMessage)
);

module.exports = router;
