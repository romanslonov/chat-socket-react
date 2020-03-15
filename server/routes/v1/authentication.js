const { celebrate } = require('celebrate');
const { signin, signup } = require('../../controllers/authentication.controller');
const { create } = require('../../validations/user.validation');

module.exports = app => {
  app.post('/api/v1/signin', signin);
  app.post('/api/v1/signup', celebrate(create), signup);
};
