const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// ROUTES
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/message', (req, res) => {
  console.log('Got body:', req.body);
  io.emit('new-message', { message: req.body.message })
  res.sendStatus(201);
});

// SOCKETS
io.on('connection', (socket) => {
  console.log('a user connected');
});

// SERVE
server.listen(8080, () => {
  console.log('listening on *:8080');
});