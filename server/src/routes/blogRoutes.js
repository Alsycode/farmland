const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { body } = require('express-validator');


// ----------------------------------
// PUBLIC BLOG ROUTES
// ----------------------------------

/**
 * GET /api/blogs
 * GET /api/blogs?limit=5
 * GET /api/blogs?page=1&search=keyword
 */
router.get('/', blogController.listBlogs);

/**
 * GET /api/blogs/:id_or_slug
 */
router.get('/:id', blogController.getBlog);


// ----------------------------------
// ADMIN BLOG ROUTES (Protected)
// ----------------------------------

/**
 * POST /api/admin/blogs
 * Create new blog post
 */
router.post(
  '/admin',
  protect,
  requireRole('admin'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  blogController.createBlog
);

/**
 * PUT /api/admin/blogs/:id
 * Update blog post
 */
router.put(
  '/admin/:id',
  protect,
  requireRole('admin'),
  [
    body('title').optional().isString(),
    body('content').optional().isString(),
  ],
  blogController.updateBlog
);

/**
 * DELETE /api/admin/blogs/:id
 */
router.delete(
  '/admin/:id',
  protect,
  requireRole('admin'),
  blogController.deleteBlog
);

module.exports = router;