const express = require('express');
const routes = require('./controllers');
const app = express();
const PORT = process.env.PORT || 3001;
var db = require('./models');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(function (req, res, next) {
  req.io = io;
  next();
});
// Add routes, both API and view
app.use(routes);

io.on('connection', (socket) => {
  console.log('new client connected');
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

// ADD SEQUELIZE HERE TO CONNECT TO YOUR DB
db.sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
