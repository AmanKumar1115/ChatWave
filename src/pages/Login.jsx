/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
    
  const [err,setErr] = useState(false); 
  const navigate = useNavigate()

  const handleSubmit = async (event)=>{
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");

    }catch(err){
      console.log(err);
      setErr(true);
    }

  }




  return (
    <div className="bg-blue-200 h-screen flex items-center justify-center " >
        <div className="bg-white px-60 py-20 flex flex-col rounded-lg gap-3 items-center ">
            <span className="text-[#5d5b8d] font-bold text-[24px]">ChatWave</span>
            <span className="text-[#5d5b8d] text-[12px] ">Login</span>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input className="p-15 border-none w-250 border-b-[1px] border-blue-200 placeholder-gray-600" type="email" placeholder="email" />
                <input className="p-15 border-none w-250 border-b-[1px] border-blue-200 placeholder-gray-600" type="password" placeholder="Password" />
                <button className="bg-blue-500 text-white p-3 font-bold border-none cursor-pointer" >Sign in</button>
                {err && <span>SomeThing went wrong!</span>}
            </form>
            <p className="text-[#5d5b8d] text-[12px] mt-[10px]">You do not have an account? <Link className=" hover:text-blue-700 hover:font-bold" to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login;