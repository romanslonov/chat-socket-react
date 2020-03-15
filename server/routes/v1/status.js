const httpStatus = require('http-status');

module.exports = app => {
  app.get('/api/v1/status', (req, res) => res.status(httpStatus.OK).json({ message: 'ok' }));
};
