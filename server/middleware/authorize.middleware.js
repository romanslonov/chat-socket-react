const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const User = require('../models/user.model');

const { JWT_SECRET } = process.env;

/**
 *  The Auth Checker middleware function.
 */
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  try {
    // Get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];

    // Verify token, store decoded token and user into req

    const decoded = await jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    req.user = user;
  } catch (e) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  return next();
};
