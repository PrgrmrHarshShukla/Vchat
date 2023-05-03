import { useState } from 'react';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

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
    <div className="flex justify-center items-center flex-col h-screen w-screen bg-sky-200">
      { !showChat ? 
      (<div className="flex justify-between items-center flex-col bg-teal-100 -mt-20 border-4 rounded border-black p-20 gap-4">
        <h1 className="text-[35px] text-violet-800 mb-8">
          <strong>Join A Chat</strong>
        </h1>
        <input 
          className="bg-teal-200 border-emerald-300 border-2 rounded p-1"
          required
          type="text" 
          placeholder="Username..." 
          onChange = {(e) => {
            setUsername(e.target.value);
          }} 
        />
        <input
          className="bg-teal-200 border-emerald-300 border-2 rounded p-1" 
          required
          type="text" 
          placeholder="ChatRoom..." 
          onChange = {(e) => {
            setRoom(e.target.value);
          }} 
        />
        <button onClick = {joinRoom} className="mt-8 rounded-full border-black border-2 px-4 text-purple-900 bg-sky-400 hover:bg-green-500 active:px-2 text-[20px]">
          <strong>Join</strong>            
        </button>
      </div>) : 

      (<Chat socket = {socket} username = {username} room = {room} />)
      }
    </div>
  )
}

export default App
