const express = require('express')
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server)


app.set('views', '/views')
const users = {}
 
io.on('connection', socket =>{
    socket.on('new-user', userName =>{
        users[socket.id] = userName
        socket.broadcast.emit('user-connected', userName)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, userName: users[socket.id] })
      })
      socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
      })
    })
// const io = require('socket.io')(4000);
// const cors = require('cors');

// // Enable CORS
// io.use(cors());

// io.on('connection', (socket) => {
//   socket.on('send-chat-message', (message) => {
//     socket.broadcast.emit('chat-message', message);
//     console.log(message);
//   });
// });
