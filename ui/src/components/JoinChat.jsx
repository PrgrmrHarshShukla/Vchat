import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
const socket = io('https://vchat-backend-zv0s.onrender.com', {
    transports: ['websocket'], // Use WebSocket transport
});

import Chat from './Chat';
import { setUser } from '../slices/userSlice';
import axios from 'axios';



function JoinChat() {

  const user = useSelector(state => state.user.value)

  
  
  const [userName, setUserName] = useState(user.userName);
  const [userEmail, setUserEmail] = useState(user.email);
  // const [room, setRoom] = useState(currentRoomHere);
  const [showChat, setShowChat] = useState(false);

  const dispatch = useDispatch()

  console.log(currentRoomHere, "dcbjc\n");
  console.log(user.currentRoom);


  async function joinRoomLogic (e) {
    console.log(e);
    if( currentRoomHere === '' ){
      patchRooms();
      joinRoom()
    }
    else{
      joinRoom()
    }
  }

  async function patchRooms () {
    const userDataPatchRequest = {
      "newRoom": user.currentRoom
    }
    try{   
      const response = await axios.patch(`http://localhost:5000/users/user.email/${userEmail}`, userDataPatchRequest);
  
      if( response.status === 200 ){
        alert(`New room added to your list.`)
      }
  
      }
      catch(err){
        alert('An unexpected error occured in join.')
      }
  }

  const settingRoom = (event) => {
    dispatch(setUser({
      userName: user.userName,
      email: user.email,
      currentRoom: event.target.value,
      rooms: user.rooms
    }))
  }

 
  async function joinRoom () {
    if( room !== "" && userName !== "" ){ 
      socket.emit("join_room", room);
      setShowChat(true);
    }
    else{
      alert("Please fill the details.")
    }
  }



  return (
    <div className="flex justify-center items-center flex-col h-screen w-screen bg-sky-100">
      { !showChat ? 
      (
        <div className="flex flex-col items-center border-black border-2 border-solid max-w-[400px] w-[50vw] min-w-[250px] text-center gap-12 p-2 rounded py-12">

          <strong className="text-2xl "><u>Join Chat</u></strong>


          <div className=" flex flex-col justify-center text-left">

            <p className="font-semibold">userName</p>
            <input className="mb-4 p-1 rounded w-full border-2 border-black border-solid" type="text" defaultValue={userName} />
            <p className="font-semibold">Chat Room</p>
            <input className="mb-4 p-1 rounded w-full border-2 border-black border-solid" type="text" value={user.currentRoom} onChange={settingRoom} />
            <button 
              className=" rounded border-2 border-black border-solid mt-12 p-1 bg-blue-400  active:bg-blue-500" 
              onClick={joinRoomLogic}
            >
              Join
            </button>

          </div>

        </div>
      ) 
      : 
      (<Chat socket = {socket} userName = {userName} room = {user.currentRoom} />)
      }
    </div>
  )
}

export default JoinChat
