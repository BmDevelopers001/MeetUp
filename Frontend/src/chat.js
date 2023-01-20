const socket = io('http://localhost:8000/');
const videoDiv = document.getElementById('videoDiv');
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3000'
})

const video = document.createElement('video');
video.muted = true;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addStream(video, stream)
}).catch(err => {
    console.log(err);
})

myPeer.on('open', (id) => {
    console.log(id);
    const RoomID = localStorage.getItem("RoomID")
    // console.log(RoomID)
    socket.emit('join-room', RoomID, id)
})

const addStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata' , () => {
        video.play()
    })
        videoDiv.append(video)
}