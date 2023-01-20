const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const cors = require('cors');
// require('dotenv').config()

const app = express()
app.use(cors({
    origin : '*'
}))

const httpServer =  http.createServer(app)

app.get("/start" , (req,res) => {
    res.send("Welcome To MeetUp Server")
})

httpServer.listen(8000 , () => {
    console.log(`Server started at 8000`);
})

const io = new Server(httpServer , {
    cors : {
        origin : '*'
    }
})

io.on('connection' , (socket) => {

    socket.on('join-room' , (RoomID , userID) => {
        // const {RoomID,userID} = data
        console.log(RoomID , userID);
        socket.join(RoomID)
        socket.to(RoomID).emit('user-join' , userID)

        socket.on('disconnect' , () => {
            socket.to(RoomID).emit('user-disconnected', userID)
        })
    })

})