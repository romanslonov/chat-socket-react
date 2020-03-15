const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('../services/bcrypt.service');

const { JWT_SECRET } = process.env;

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: 'Email or password is wrong.' });
      }

      if (bcrypt.comparePassword(password, user.password)) {
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        return res.status(httpStatus.OK).json({ user: user.transform(), token });
      }

      return res.status(httpStatus.BAD_REQUEST).json({ message: 'Email or password is wrong.' });
    }

    return res.status(httpStatus.BAD_REQUEST);
  } catch (e) {
    console.error(e);
  }
};

const signup = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    return res.status(httpStatus.CREATED).json({ token, user: savedUser.transform() });
  } catch (e) {
    console.error(e);
    return next(User.checkDuplicateEmailError(e, req, res));
  }
};

module.exports = {
  signin,
  signup,
};
