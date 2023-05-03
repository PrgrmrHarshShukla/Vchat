import React, { useEffect, useState } from 'react';
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3001");


import '@fortawesome/fontawesome-free/css/all.css'



function Chat({ socket, username, room }) {

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  const sendMessage = async() => {
    if( currentMessage !== "" ) {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };


  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
 



  return (
    <div className="flex flex-col justify-between items-center border-4 border-black rounded h-3/4 w-1/2">
      <div className="h-1/12 w-full text-center border-b-2 border-black bg-teal-400">
         <h1 className="text-purple-950 text-[30px]">
          <strong>FireChat</strong>
         </h1>
      </div>



      <div className="min-h-10/12 h-full w-full bg-gray-300 border-t-2 border-b-2 border-black overflow-auto p-2">
        {messageList.map((messageContent) => {
          return (
            username === messageContent.author ? (
            <div key={messageContent.time} className="max-w-[1/2] flex flex-col justify-end items-end">
              <div className="flex flex-row gap-4 justify-start">
                <h5 className="text-[12px]">{messageContent.time}</h5>
                <h5 className="text-[12px] font-semibold">You</h5>
              </div>
              <div className="bg-blue-400 max-w-max break-words p-1 rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px] mb-4">
                <h4>{messageContent.message}</h4>
              </div>
            </div>
            )
            : 
            (
            <div key={messageContent.time} className="flex flex-col items-start max-w-[1/2]">
              <div className="flex flex-row gap-4 justify-start">
                <h5 className="text-[12px] font-semibold">{messageContent.author}</h5>
                <h5 className="text-[12px]">{messageContent.time}</h5>
              </div>
              <div className="bg-white max-w-max break-words p-1 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] mb-4">
                <h4>{messageContent.message}</h4>
              </div>
            </div>
            )
          );
        })}
      </div>



      <div className="h-1/12 w-full flex flex-row justify-between p-2 border-t-2 border-black bg-teal-400">
         <input 
          className="border-none rounded text-[20px] p-1 w-10/12 bg-slate-200"
          type="text" 
          placeholder="Message..." 
          onChange = {(e) => {setCurrentMessage(e.target.value)}}
          value={currentMessage}
         />
         <button onClick = {sendMessage} title="Send" className="rounded-full w-[40px] bg-white text-[20px]">
            <i className="fas fa-paper-plane"></i>
         </button>
      </div>
    </div>
  )
}

export default Chat;