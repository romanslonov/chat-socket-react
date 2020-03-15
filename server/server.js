require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');
const helmet = require('helmet');
const { handleCelebrateErrors } = require('./utils');
const mangoose = require('./services/mongoose.service');

app.use(helmet());
app.use(cors());
app.use(express.json({ extended: false }));

mangoose.connect();

fs.readdirSync(`${__dirname}/routes/v1`).forEach(file => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  require(`./routes/v1/${file}`)(app);
});

app.use(handleCelebrateErrors);

app.get('*', (req, res) =>
  res.status(404).json({
    message: "Seems like the endpoint you're looking for no longer exists 🤔",
  })
);

app.use((err, req, res, next) => {
  if (err) {
    console.log('There was an error 😲', err.stack);
    throw err;
  }

  next();
});

http.listen('3000', () => {
  console.log('Server up and running at: http:/localhost:3000.');
});
