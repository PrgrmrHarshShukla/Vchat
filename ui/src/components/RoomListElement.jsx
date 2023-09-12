import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setUser } from "../slices/userSlice";



function RoomListElement(props) {
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userData = {
    userName: user.userName,
    email: user.email,
    currentRoom: props.room,
    rooms: user.rooms
  }

  const handleRoomEntry = (e) =>{
    e.preventDefault();
    dispatch(setUser(userData))
    navigate('/joinChat')
  }


  return (
    <div 
        className="w-[250px] h-[250px] rounded-[10px] border-2 border-black flex flex-row justify-center items-center text-2xl sm:text-3xl font-semibold"  
        onClick={handleRoomEntry}
    >
        <span>{props.room}</span>
    </div>
  )
}

export default RoomListElement