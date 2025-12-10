// backend/src/models/User.js
/**
 * Purpose: User model (updated for refresh token storage)
 * TODO: Add fields from SRS if additional (e.g., KYC docs, address fields)
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true, maxlength: 200 },
  email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // TODO: extend roles if SRS lists others
  avatarUrl: { type: String },
  phone: { type: String },
  bio: { type: String },
  refreshTokens: [{ type: String }], // store active refresh tokens (simple revocation)
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date }
}, {
  collection: 'users',
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for public profile (excludes sensitive fields)
userSchema.methods.publicJSON = function() {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.refreshTokens;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
