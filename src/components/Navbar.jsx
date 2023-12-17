import {signOut} from "firebase/auth";
import {auth} from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {

  const  {currentUser} = useContext(AuthContext);

  return (
    <div className="flex items-center bg-[#2f2d52] h-[50px] p-[10px] text-[#ddddf7] justify-between navbar">
      <span className="hidden sm:block font-bold">ChatWave</span>
      <div className="flex gap-2 user">
        <img src={currentUser.photoURL} className="bg-[#ddddf7] h-6 w-6 rounded-full object-cover " alt="" />
        <span>{currentUser.displayName}</span>
        <button className="bg-[#5d5b8d] text-[#ddddf7] text-[10px] border-none cursor-pointer p-1 " onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar
