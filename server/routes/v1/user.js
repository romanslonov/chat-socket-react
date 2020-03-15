const authorize = require('../../middleware/authorize.middleware');
const { profile } = require('../../controllers/user.controller');

module.exports = app => {
  app.get('/api/v1/profile', authorize, profile);
};
