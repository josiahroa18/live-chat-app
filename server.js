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
    console.log('User has joined the chat');

    // Receive displayName and roomName from client
    socket.on('joinRoom', ({ displayName, roomName }, callback) => {
        console.log(displayName, roomName)

        
    })
    
    socket.on('disconnect', () => {
        console.log('User has left the chat');
    })
})

server.listen(PORT, () => {
    console.log(`Server is starting at PORT: ${PORT}`);
});
