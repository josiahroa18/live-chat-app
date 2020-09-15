const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const http = require('http');
const path = require('path');

const { addUser, removeUser, getUser, getUsersInRoom} = require('./users');

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
    // Receive displayName and roomName from client
    socket.on('joinRoom', ({ displayName, roomName }, callback) => {
        const { error, user } = addUser({ id: socket.id, displayName, roomName });

        if(error) return callback(error);

        const nameFormatted = user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)

        // Welcomes user
        socket
            .emit('message', { 
                user: 'chatBot', 
                text: `${nameFormatted}, welcome to the room ${user.roomName}` 
            });

        // Alerts everyone else of the new user
        socket.broadcast
            .to(user.roomName)
            .emit('message', { 
                user: 'chatBot', 
                text: `${nameFormatted} joined the chat!`
            });

        socket.join(user.roomName);

        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.roomName).emit('message', { 
            user: user.displayName, 
            text: message 
        });

        callback();
    })
    
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            const nameFormatted = user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)

            io.to(user.room).emit('message', { 
                user: 'chatBot', 
                text: `${nameFormatted} has left the room.`
            })
        }
    })
})

server.listen(PORT, () => {
    console.log(`Server is starting at PORT: ${PORT}`);
});
