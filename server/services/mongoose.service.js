const mongoose = require('mongoose');

const { MONGOOSE_URI, ENVIRONMENT } = process.env;

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected');
});

mongoose.connection.on('error', err => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(1);
});

if (ENVIRONMENT === 'development') {
  mongoose.set('debug', true);
}

module.exports.connect = () => {
  mongoose.connect(MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: 1,
  });

  return mongoose.connection;
};
