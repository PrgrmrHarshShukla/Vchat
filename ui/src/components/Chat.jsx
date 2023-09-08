import { useEffect, useState } from 'react';


import '@fortawesome/fontawesome-free/css/all.css'
import { v4 as uuidv4 } from 'uuid'



function Chat({ socket, username, room }) {

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState(
    JSON.parse(localStorage.getItem(`${username}${room}`)) 
    || 
    []
  );


  const sendMessage = async () => {
    if( currentMessage !== "" ) {
      // console.log(currentMessage.timeStamp);
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      // console.log("from Chat", socket.id);
      setMessageList(list => {
        localStorage.setItem(
          `${username}${room}`,
          JSON.stringify([...list, messageData])      
        );

        return [...list, messageData];
      });
      
      setCurrentMessage("");
    }
  };


  const handleReset = () => {
    localStorage.removeItem(`${username}${room}`)
    setMessageList([]);
  }


  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList(list => [...list, data]);
    });
  }, [socket]);
 

  return (
    <div className="flex flex-col justify-between items-center border-[3px] sm:border-[3px] border-black rounded-[3px] sm:h-3/4 sm:w-1/2 w-[98vw] h-[98vh]">
      <div className="h-1/12 w-full px-4 flex flex-row justify-between items-center border-b-[1px] border-black bg-teal-300">
         <div className="text-purple-800 text-[30px]">
          <strong><h1>FireChat</h1></strong>
         </div>
         <div title="Reset Chat" onClick={handleReset}>
          <i className="fas fa-trash active:translate-y-[5px]"></i>
         </div>
      </div>



      <div className="min-h-10/12 h-full w-full bg-gray-200 border-t-2 border-b-2 border-black overflow-auto p-2">
        {messageList.map((messageContent) => {
          return (
            username === messageContent.author ? (
            <div key={uuidv4()} className="max-w-[1/2] flex flex-col justify-end items-end">
              <div className="flex flex-row gap-4 justify-start">
                <h5 className="text-[12px]">{messageContent.time}</h5>
                <h5 className="text-[12px] font-semibold">You</h5>
              </div>
              <div className="bg-blue-400 max-w-[80vw] break-words p-1 rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px] mb-4">
                <h4>{messageContent.message}</h4>
              </div>
            </div>
            )
            : 
            (
            <div key={uuidv4()} className="flex flex-col items-start max-w-[1/2]">
              <div className="flex flex-row gap-4 justify-start">
                <h5 className="text-[12px] font-semibold">{messageContent.author}</h5>
                <h5 className="text-[12px]">{messageContent.time}</h5>
              </div>
              <div className="bg-white max-w-[80vw] break-words p-1 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] mb-4">
                <h4>{messageContent.message}</h4>
              </div>
            </div>
            )
          );
        })}
      </div>



      <div className="h-1/12 w-full flex flex-row justify-between p-2 border-t-[1px] border-black bg-teal-300">
         <input 
          className="border-none rounded text-[20px] p-1 w-10/12 bg-slate-200"
          type="text" 
          placeholder="Message..." 
          onChange = {(e) => {setCurrentMessage(e.target.value)}}
          value={currentMessage}
         />
         <button onClick = {sendMessage} title="Send" className=" flex justify-center items-center rounded-full w-[40px] bg-white text-[20px]">
            <i className="fas fa-paper-plane -ml-1"></i>
            <span> </span>
         </button>
      </div>
    </div>
  )
}

export default Chat;