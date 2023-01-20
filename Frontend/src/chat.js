const socket = io('http://localhost:8000/');
const videoDiv = document.getElementById('videoDiv');
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3000'
})

const video = document.createElement('video');
video.muted = true;

//To keep track of user connected 
const userConnected = {}

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addStream(video, stream)

    //When Someone call us
    myPeer.on('call', (call) => {

        //--For receiving Calls--

        //answered call and send our current stream
        call.answer(stream)
        const video = document.createElement('video');

        //responding to coming videoStream
        call.on('stream' , (userStream) => {
            addStream(video,userStream)
        })
    })

    socket.on('user-join', (userID) => {
        connectNewUser(userID,stream)
    })

}).catch(err => {
    console.log(err);
})

socket.on('user-disconnected' , (userID) => {
    //To close the conneciton of disconnected user
    if(userConnected[userID]){
        userConnected[userID].close()
    }
})

myPeer.on('open', (id) => {
    // console.log(id);
    const RoomID = localStorage.getItem("RoomID")
    // console.log(RoomID)
    socket.emit('join-room', RoomID, id)
})

const connectNewUser = (userID , stream) => {

    //--Make call when new user connects to our room--

    const call = myPeer.call(userID,stream);
    const video = document.createElement('video');

    call.on('stream' , (userStream) => {
        addStream(video,userStream)
    })

    call.on('close' , () => {
        video.remove()
    })

    //Add to object whenever new user joins
    userConnected[userID] = call
}
// console.log(userConnected);
const addStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata' , () => {
        video.play()
    })
        videoDiv.append(video)
}