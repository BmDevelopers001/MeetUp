const socket = io('http://localhost:8000/');

socket.on('start' , (data) => {
    console.log(data);
})

socket.emit('client' , 'Hello from client')