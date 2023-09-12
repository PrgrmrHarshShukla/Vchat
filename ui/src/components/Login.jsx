import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/userSlice'


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const user = useSelector(state => state.user.value);

  const dispatch = useDispatch();


  const userDataPostRequest = {
    email: email,
    password: password,
  };


  const login = async (e) => {
    try{
      e.preventDefault();

      if( password == '' || email == '' ){
        alert(`Please fill all the details!`);
        return;
      }

      const response = await axios.post('https://vchat-backend-zv0s.onrender.com/users/login', userDataPostRequest);
      // console.log(response);

      if(response.status == 200){
        const data = response.data;
        const filteredData = {
          userName: data.user.userName,
          email: data.user.email,
          currentRoom: "",
          rooms: data.user.rooms
        };
        console.log('Logged in.');
        dispatch(setUser(filteredData))
        navigate('/roomsList')
      }
      else{
        const errorData = response.data;
        console.error("Login failed:\n", errorData);
      }

    }
    catch(err){
      console.log("In catch block.\n");
      alert("An unexpected error occured.")
      console.error(err.stack);
      console.error(err.message);
    }
  }




  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
      <div className="flex flex-col items-center border-black border-2 border-solid max-w-[400px] w-[50vw] min-w-[250px] text-center gap-12 p-2 rounded py-12">

        <strong className="text-2xl "><u>Login</u></strong>


        <form className=" flex flex-col justify-center text-left">

          <p className="font-semibold">E-mail</p>
          <input className="mb-4 p-1 rounded w-full border-2 border-black border-solid" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <p className="font-semibold">Password</p>
          <input className="mb-4 p-1 rounded w-full border-2 border-black border-solid" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button className=" rounded border-2 border-black border-solid mt-12 p-1 bg-blue-400  active:bg-blue-500" type="submit" onClick={login}>Login</button>

        </form>
        <p>New here? <Link to="/register" className="font-semibold text-blue-800"><u>Register</u></Link></p>

      </div>

    </div>
  )
}

export default Login