const express = require('express');
const routes = require('./controllers');
const app = express();
const PORT = process.env.PORT || 3001;
var db = require('./models');
const http = require('http');
const socketIo = require('socket.io');
const PORT2 = process.env.PORT || 3002;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
// Add routes, both API and view

// const server = http.createServer(app);
const io = socketIo.listen(app.listen(PORT2));

// Start the API server

io.on('connection', (socket) => {
  console.log('new client connected');

  socket.emit('test', 'testing');

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

app.use(function (req, res, next) {
  req.io = io;
  next();
});
app.use(routes);

// ADD SEQUELIZE HERE TO CONNECT TO YOUR DB
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});

// server.listen(PORT2, () => console.log('listening on socket port 3002'))
