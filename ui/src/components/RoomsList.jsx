import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import RoomListElement from "./RoomListElement";
import { useNavigate } from "react-router-dom";
import { setUser } from "../slices/userSlice";


function RoomsList() {
  const user = useSelector(state => state.user.value)
  const [roomsList, setRoomsList] = useState(user.rooms)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const newUserData = {
    userName: user.userName,
    email: user.email,
    currentRoom: "",
    rooms: user.rooms
  };



  const list = roomsList.map((room, index) => {
    return(
      <RoomListElement room={room} key={index} roomID={index} />
    )
  })


  const createRoom = async (e) => {
    e.preventDefault()
    dispatch(setUser(newUserData))
    navigate('/joinChat')
  }

  return (
    <div className="w-[100vw] px-[2vw] bg-slate-400 ">
      <button className="w-[100vw] sm:w-[96vw] h-[8vh] border-b-[2px] border-black text-2xl sm:text-4xl font-bold text-violet-800 bg-teal-200" onClick={createRoom}>
          <span>
            Create Room
          </span>
      </button>
      <div className="w-[100vw] sm:w-[96vw] h-auto min-h-[92vh] bg-sky-100">
      {
        roomsList.length > 0 
        ?
        <div className="w-[100%] h-auto min-h-[92vh] flex flex-row flex-wrap gap-[2vw] justify-around items-center px-[1vw] py-[2vh]">
          {list}
        </div>
        : 
        <div className="w-[100vw] sm:w-[96vw] h-[92vh] bg-sky-100 text-center flex flex-col justify-center items-center text-2xl sm:text-4xl">
          <p className="max-w-[80%]">You seem to have no Chat Rooms yet.</p>
          <p className="max-w-[80%]">Create one above.</p>
        </div>
      }
      </div>
    </div>
  )
}

export default RoomsList