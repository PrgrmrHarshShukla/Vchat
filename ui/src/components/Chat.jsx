import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'


import '@fortawesome/fontawesome-free/css/all.css'



function Chat({ socket, userName, room }) {

  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState(
    JSON.parse(localStorage.getItem(`${userName}${room}`)) 
    || 
    []
  );
  const [pendingMessages, setPendingMessages] = useState(
    JSON.parse(localStorage.getItem(`${userName}pending${room}`)) 
    || 
    []
  )

  const scrollToBottom = () => {
    setTimeout(() =>{
      const container = document.getElementById('message-container')
      container.scrollTop = container.scrollHeight;
    }, 10)
  }

  const sendPendingMessages = async () => {
    for(let i = 0; i < pendingMessages.length; i++){
      await socket.emit("send_message", pendingMessages[i]);
      await axios.post('https://vchat-backend-zv0s.onrender.com/messages', {
        "sender": pendingMessages[i].author,
        "room": pendingMessages[i].room,
        "content": pendingMessages[i].message
      })
    }

    localStorage.removeItem(`${userName}pending${room}`)
  }




  const sendMessage = async () => {
    if(navigator.onLine){
      if( currentMessage !== "" ) {
        // console.log(currentMessage.timeStamp);
        const messageData = {
          room: room,
          author: userName,
          message: currentMessage,
          time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
          status: "send"
        };

        // for(let i = 0; i < pendingMessages.length; i++){
        //   await socket.emit("send_message", pendingMessages[i]);
        //   pendingMessages.shift()
        // }
        await socket.emit("send_message", messageData);
        await axios.post('https://vchat-backend-zv0s.onrender.com/messages', {
          "sender": messageData.author,
          "room": messageData.room,
          "content": messageData.message
        })
        
        setMessageList(list => {
          localStorage.setItem(
            `${userName}${room}`,
            JSON.stringify([...list, messageData])      
          );

          return [...list, messageData];
        });

        
        
        setCurrentMessage("");
        setTimeout(() =>{
          const container = document.getElementById('message-container')
          container.scrollTop = container.scrollHeight;
        }, 10)
        }
      }
      else{
        if( currentMessage !== "" ) {
          // console.log(currentMessage.timeStamp);
          const messageData = {
            room: room,
            author: userName,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            status: "pending"
          };

          
    
          setMessageList(list => {
            localStorage.setItem(
              `${userName}${room}`,
              JSON.stringify([...list, messageData])      
            );
    
            return [...list, messageData];
          });

          setPendingMessages(list => {
            localStorage.setItem(
              `${userName}pending${room}`,
              JSON.stringify([...list, messageData])      
            );


            return [...list, messageData]
          })


          
          setCurrentMessage("");
          setTimeout(() =>{
            const container = document.getElementById('message-container')
            container.scrollTop = container.scrollHeight;
          }, 10)
        }
      }
  }


  const handleReset = () => {
    localStorage.removeItem(`${userName}${room}`)
    setMessageList([]);
  }


  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList(list => [...list, data]);
      setTimeout(() =>{
        const container = document.getElementById('message-container')
        container.scrollTop = container.scrollHeight;
      }, 10)
    });
    
  }, [socket]);

  useEffect(() => {
    sendPendingMessages()
  }, [onlineStatus])


  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setOnlineStatus(navigator.onLine);
    };

    
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);
 

  return (
    <div className="flex flex-col justify-between items-center border-[3px] sm:border-[3px] border-black rounded-[3px] sm:h-3/4 sm:w-1/2 w-[98vw] h-[98vh]">
      <div className="h-[8vh] w-full px-4 flex flex-row justify-between items-center border-b-[1px] border-black bg-teal-300">
         <div className="text-purple-800 text-[30px]">
          <strong><h1>FiredChat</h1></strong>
         </div>
         <div title="Reset Chat" onClick={handleReset}>
          <i className="fas fa-trash active:translate-y-[5px]"></i>
         </div>
      </div>



      <div id="message-container" className="h-[82vh] w-full bg-gray-200 border-t-2 border-b-2 border-black overflow-auto p-2 pb-[40px]">
        {messageList.map((messageContent) => {
          return (
            userName === messageContent.author ? (
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



      <div className="h-[8vh] w-full flex flex-row justify-between p-2 border-t-[1px] border-black bg-teal-300">
         <input 
          className="border-none rounded text-[20px] p-1 w-10/12 bg-slate-200"
          type="text" 
          placeholder="Message..." 
          onChange = {(e) => {setCurrentMessage(e.target.value)}}
          value={currentMessage}
         />
         <button onClick = {sendMessage} title="Send" className=" flex justify-center items-center rounded-full w-[40px] bg-white text-[20px]">
            <i className="fas fa-paper-plane -ml-1"></i>
         </button>
         <button 
          onClick = {scrollToBottom} 
          id='scroll-to-bottom-button' 
          className="absolute flex justify-center items-center rounded-full w-[40px] h-[40px] bg-sky-300 text-[20px] text-black translate-x-[80vw] sm:translate-x-[45vw] -translate-y-[10vh] sm:-translate-y-[8vh]"
        >
          <i className="fas fa-arrow-down"></i>
        </button>
      </div>
    </div>
  )
}

export default Chat;