const Blog = require('../models/Blog');
const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

/**
 * GET /api/blogs
 * Public — List blogs with pagination
 */
exports.listBlogs = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, search = '' } = req.query;
    page = Number(page);
    limit = Number(limit);

    const filter = search
      ? { title: { $regex: search, $options: 'i' }, published: true }
      : { published: true };

    const blogs = await Blog.find(filter)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Blog.countDocuments(filter);

    return res.json(
      new ApiResponse(200, { items: blogs, total, page, limit }, "Blogs fetched successfully")
    );
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/blogs/:id_or_slug
 * Public — Blog detail
 */
exports.getBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog =
      (await Blog.findOne({ slug: id })) ||
      (await Blog.findById(id));

    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }

    return res.json(new ApiResponse(200, blog, "Blog retrieved"));
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/blogs
 * Admin-only — Create blog
 */
exports.createBlog = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, errors.array()[0].msg);
    }

    const blog = await Blog.create(req.body);

    return res.json(new ApiResponse(201, blog, "Blog created successfully"));
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/blogs/:id
 * Admin-only — Update blog
 */
exports.updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) throw new ApiError(404, "Blog not found");

    return res.json(new ApiResponse(200, blog, "Blog updated successfully"));
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/blogs/:id
 * Admin-only — Delete blog
 */
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) throw new ApiError(404, "Blog not found");

    return res.json(new ApiResponse(200, blog, "Blog deleted"));
  } catch (err) {
    next(err);
  }
};