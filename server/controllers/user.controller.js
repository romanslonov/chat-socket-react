const httpStatus = require('http-status');
const User = require('../models/user.model');

const profile = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  return res.status(httpStatus.OK).json({ user: user.transform() });
};

module.exports = {
  profile,
};
