const { isCelebrate } = require('celebrate');

module.exports.handleCelebrateErrors = (err, req, res, next) => {
  if (isCelebrate(err)) {
    const { joi } = err;

    const result = {
      status: 400,
      error: 'Bad Request',
      message: joi.message,
    };

    return res.status(400).json(result);
  }
  next(err);
};
