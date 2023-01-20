const socket = io('https://meetup-render-deploy.onrender.com/');


const roomID = document.getElementById('roomID');
const joinRoom = document.getElementById('joinRoom');
joinRoom.onclick = (e) => {
    e.preventDefault();  

    const RoomID = roomID.value;

    localStorage.setItem("RoomID" , RoomID)

    window.location.href = "./chat.html"
}




