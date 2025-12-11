// path: src/middleware/validation.js
const { validationResult } = require('express-validator');

/**
 * Central express-validator result handler middleware.
 * Use this after your validators in route definitions:
 * router.post('/', [ body('email').isEmail(), validate ], controller)
 */
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      ok: false,
      errors: errors.array().map(e => ({ param: e.param, msg: e.msg, value: e.value }))
    });
  }
  return next();
}

module.exports = { validate };
