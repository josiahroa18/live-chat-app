const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const http = require('http');
const path = require('path');

const server = http.createServer(app)
const io = require('socket.io')(server);

// Middleware to serve the react client
if(process.env.NODE_ENV == 'production'){
    
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

io.on('connection', socket => {
    socket.on('message', message => {
        socket.broadcast.emit('message', message);
    })
})

server.listen(PORT, () => {
    console.log(`Server is starting at PORT: ${PORT}`);
});
