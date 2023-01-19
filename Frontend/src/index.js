const socket = io('http://localhost:8000/');

// socket.on('start' , (data) => {
//     console.log(data);
// })

const roomID = document.getElementById('roomID');
const joinRoom = document.getElementById('joinRoom');
joinRoom.onclick = (e) => {
    e.preventDefault()

    const RoomID = roomID.value;
    const userID = 10

    socket.emit('join-room' , {RoomID , userID} )

    // console.log('joined');
}

socket.on('user-join' , (data) => {
    console.log(data);
})

// socket.emit('client' , 'Hello from client')