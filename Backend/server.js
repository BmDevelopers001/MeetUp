const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const cors = require('cors')

const app = express()

const httpServer =  http.createServer(app)

httpServer.listen(8000 , () => {
    console.log('Server started at 8000');
})

const io = new Server(httpServer , {
    cors : {
        origin : '*'
    }
})

io.on('connection' , (socket) => {

    // socket.emit('start' , 'Welcome to Socket')

    // socket.on('client' , (data) => {
    //     console.log(data);
    // })

    socket.on('join-room' , (data) => {
        const {RoomID,userID} = data
        // console.log(RoomID , userID);
        socket.join(RoomID)
        socket.to(RoomID).emit('user-join' , userID)
    })

})