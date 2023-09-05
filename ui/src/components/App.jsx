import { useState } from 'react';
import io from "socket.io-client";
const socket = io("http://localhost:5000");

import './App.css';
import Chat from './Chat';



function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if( room !== ""  &&  username !== "" ) {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };





  return (
    <div className="flex justify-center items-center flex-col h-screen w-screen bg-sky-100">
      { !showChat ? 
      (<div className="flex justify-between items-center flex-col bg-sky-200 border-4 rounded border-black  gap-4 max-w-[400px]  sm:w-[40vw] w-[95vw] h-auto sm:py-20 py-12">
        <h1 className="text-[35px] text-violet-800 mb-8 text-center">
          <strong>Join A Chat</strong>
        </h1>
        <input 
          className=" border-2 rounded p-1"
          required
          type="text" 
          placeholder="Username..." 
          onChange = {(e) => {
            setUsername(e.target.value);
          }} 
        />
        <input
          className=" border-2 rounded p-1" 
          required
          type="text" 
          placeholder="ChatRoom..." 
          onChange = {(e) => {
            setRoom(e.target.value);
          }} 
        />
        <button onClick = {joinRoom} className="mt-8 rounded-full border-black border-2 pb-[1px] px-20 text-purple-900 bg-sky-400 active:bg-sky-500 text-[20px]">
          <strong>Join</strong>            
        </button>
      </div>) 
      : 
      (<Chat socket = {socket} username = {username} room = {room} />)
      }
    </div>
  )
}

export default App
