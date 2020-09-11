const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http').createServer();
const io = require('socket.io')(http);
const path = require('path');

// Middleware to serve the react client
app.use(express.static(path.join(__dirname, 'client/build')));
if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build/index.html'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname = 'client/build/index.html'));
    })
}
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/public/index.html'));
})

io.on('connection', socket => {
    socket.on('message', message => {
        socket.broadcast.emit('message', message);
    })
})

http.listen(port);
