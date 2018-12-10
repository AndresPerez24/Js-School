'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const books = require('./routes/index');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3002);

io.on("connection", (socket) => {
  console.log("i am conected", socket);
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', books);

module.exports = app;
