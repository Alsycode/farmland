// path: src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'manager', 'admin'], default: 'user' },
  refreshTokens: [{ token: String, createdAt: { type: Date, default: Date.now } }],
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: null }
}, {
  timestamps: true,
});

// Hash password before save
UserSchema.pre('save', async function preSave(next) {
  if (!this.isModified('password')) return next();
  try {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Instance method to compare password
UserSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Hide sensitive fields in toJSON / toObject
UserSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshTokens;
  return obj;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
