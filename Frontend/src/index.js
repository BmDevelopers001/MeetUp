const socket = io('http://localhost:8000/');
const videoDiv = document.getElementById('videoDiv');
const myPeer = new Peer(undefined , {
    host : '/',
    port : '3000'
})

const video = document.createElement('video');
video.muted = true;

navigator.mediaDevices.getUserMedia({
    video : true,
    audio : true
}).then(stream => {
    addStream(video,stream)
}).catch(err => {
    console.log(err);
})

myPeer.on('open', (id) => {
    console.log(id);
    const RoomID = localStorage.getItem("RoomID")
    // console.log(RoomID)
    socket.emit('join-room', RoomID , id)
})

const roomID = document.getElementById('roomID');
const joinRoom = document.getElementById('joinRoom');
joinRoom.onclick = (e) => {
    // e.preventDefault()

    const RoomID = roomID.value;

    localStorage.setItem("RoomID" , RoomID)
}

socket.on('user-join' , (data) => {
    console.log(data);
})

const addStream = (video,stream) => {
    video.srcObject = stream;
    video.loadedmetadata = () => {
        video.play()
    }

    videoDiv.append(video)
}
