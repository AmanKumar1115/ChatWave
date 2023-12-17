/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import attach from "../assets/attach.png";
import img from "../assets/img.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


const Input = () => {
  const [text, setText ] = useState("");
  const [image, setImage] = useState(null);

  const { currentUser} = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async ()=>{
    if(Image){
      const storageRef = ref(storage,uuid());
      const uploadTask = uploadBytesResumable(storageRef,image);
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
        await updateDoc(doc(db,"chats",data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date:Timestamp.now(),
          img:downloadURL,
        }),
      });
      } catch (error) {
        console.log(error);
      }
    });
  }
);
    }else{
      await updateDoc(doc(db,"chats",data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date:Timestamp.now(),
        })
      })
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp(),
    })
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp(),
    })
    setText("");
    setImage(null);
  }

  return (
    <div className="flex h-[50px] bg-white p-[10px] items-center justify-between">
      <input type="text" onChange={e=>setText(e.target.value)} value={text} className="w-[70%] border-none outline-none text-[#2f2d52] text-[18px] placeholder-[#d3d3d3]" placeholder="Type Something..." />
      <div className="flex items-center gap-[10px]">
        <img src={attach} alt="" className="h-6 cursor-pointer" />
        <input type="file" id="file" onChange={e=>setImage(e.target.files[0])} className="hidden" />
        <label htmlFor="file" >
          <img src={img} alt="" className="h-6 cursor-pointer" />
        </label>
        {/* <button className="border-none px-[15px] py-[10px] text-white bg-[#8da4f1] cursor-pointer " onClick={handleSend} >Send</button> */}
        <button className="border-none px-[15px] py-[10px] text-white bg-[#8da4f1] cursor-pointer rounded-md transition duration-300 ease-in-out hover:bg-[#6883d1]" onClick={handleSend}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M21 12l-18 8V4l18 8zm-2 2H3v-4h16v4z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Input

