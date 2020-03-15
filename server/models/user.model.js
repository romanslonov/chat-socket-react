const mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('../services/bcrypt.service');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 50,
  },
  lastName: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 128,
  },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this.password = bcrypt.password(this.password);

    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'firstName', 'lastName', 'email', 'createdAt'];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

UserSchema.statics = {
  checkDuplicateEmailError(err, req, res) {
    if (err.code === 11000) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ status: httpStatus.BAD_REQUEST, message: 'Email already taken.' });
    }

    return err;
  },
};

module.exports = mongoose.model('User', UserSchema);
