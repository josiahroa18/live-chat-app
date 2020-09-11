const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http').createServer();
const io = require('socket.io')(http);
const path = require('path');

// Middleware to serve the react client
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static('public'));

io.on('connection', socket => {
    socket.on('message', message => {
        socket.broadcast.emit('message', message);
    })
})

http.listen(port);
