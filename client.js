// MIT License

// Copyright (c) 2022 David Fletcher

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// ROUTES
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/message', (req, res) => {
  // console.log('Got body:', req.body);
  io.emit('new-message', { 
    message: req.body.message, 
    author: req.body.author, 
    color: req.body.color
  });
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