import { useContext, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username,setusername] = useState("");
  const [user,setUser] = useState(null);
  const [err,seterr] = useState(false);
  const  { currentUser} = useContext(AuthContext);

  const handleSearch =async () =>{
    const q = query(
      collection(db, "users"),
      where("displayName","==",username)
    );
    try {
      const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
        setUser(doc.data()); 
      });
    } catch (error) {
      console.log(error);
      seterr(true);
    }
    
  };

  const handleKey = (event) => {
    event.code === "Enter" && handleSearch();
  };

  const handleSelect = async() =>{
     const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db,"chats",combinedId));

      if(!res.exists()){
        await setDoc(doc(db,"chats",combinedId),{messages : []});

        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        });

        await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        });

      }
    } catch (error) {
      console.log(error);
    }
    setUser(null);
    setusername("");
  }




  return (
    <div className=" border-b border-gray-300">
      <div className="p-2">
        <input type="text" className=" bg-transparent border-none text-white placeholder-gray-400 focus:outline-none" placeholder="Find a user" onKeyDown={handleKey} onChange={e=>setusername(e.target.value)} value={username} />
      </div>
      {err && <span>Something went wrong!</span>}
      {
        user && <div className=" p-2 flex items-center gap-2 text-white cursor-pointer hover:bg-[#2f2d52] " onClick={handleSelect} >
          <img src={user.photoURL} className="w-[50px] h-[50px] rounded-full object-cover" />
          <div className="userChatInfo">
            <span className="text-lg font-semibold"> {user.displayName}</span>
          </div>
        </div> 
      }
    </div>
  )
}

export default Search