/* eslint-disable no-unused-vars */
import addAvatar from "../assets/addAvatar.png";
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, db, storage} from "../firebase"
import { useState } from "react";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from "react-router-dom";




const Register = () => {
  const [err,setErr] = useState(false); 
  const navigate = useNavigate()

  const handleSubmit = async (event)=>{
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        // console.log('Upload is paused');
        break;
      case 'running':
        // console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      try {
        await updateProfile(res.user,{
        displayName,
        photoURL: downloadURL,
      });
      await setDoc(doc(db,"users",res.user.uid),{
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });
      await setDoc(doc(db,"userChats",res.user.uid),{});
      navigate("/");
        
      } catch (error) {
        console.log(err);
        setErr(true);
      }
      
    });
  }
);

    }catch(err){
      setErr(true);
    }

  }

  return (
    <div className="bg-blue-200 h-screen flex items-center justify-center">
      <div className="bg-white px-60 py-20 flex flex-col rounded-lg gap-3 items-center">
        <span className="text-[#5d5b8d] font-bold text-[24px]">ChatWave </span>
        <span className="text-[#5d5b8d] text-[12px]">Register</span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input className="p-15 w-250 border-b-[1px] border-blue-200 placeholder-gray-600" type="text" placeholder="Display Name" />
          <input className="p-15 w-250 border-b-[1px] border-blue-200 placeholder-gray-600" type="email" placeholder="email" />
          <input className="p-15 w-250 border-b-[1px] border-blue-200 placeholder-gray-600" type="password" placeholder="Password" />
          <input className="hidden p-15 border-none w-250 border-b-1 border-blue-200 placeholder-gray-600" type="file" id="file" />
          <label className="flex items-center g-3 text-[#8da4f1] text-[12px] cursor-pointer" htmlFor="file">
            <img className="w-[32px]" src={addAvatar} alt="avatarIcon" />
            <span>Add an avatar</span>
          </label>
          <button className="bg-blue-500 hover:bg-blue-700 text-white p-3 font-bold border-none cursor-pointer">Sign up</button>
          {err && <span>SomeThing went wrong!</span>}
        </form>
        <p className="text-[#5d5b8d] text-[12px] mt-[10px]">You do have an account? <Link to="/login" className=" hover:text-blue-700 hover:font-bold">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
