import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div
          className="p-2 flex items-center gap-2 text-white cursor-pointer hover:bg-[#2f2d52]"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          {/* For small devices */}
          <img
            src={chat[1].userInfo.photoURL}
            className="w-[50px] h-[50px] rounded-full object-cover block sm:hidden"
          />

          {/* For medium and large devices */}
          <img
            src={chat[1].userInfo.photoURL}
            className="w-[50px] h-[50px] rounded-full object-cover hidden sm:block"
          />
          <div className="userChatInfo">
            <span className="text-lg font-semibold hidden sm:block">
              {chat[1].userInfo.displayName}
            </span>
            <p className="text-sm text-gray-400 hidden sm:block">
              {chat[1].lastMessage?.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
