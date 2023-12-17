import Add from "../assets/Add.png";
import cam from "../assets/cam.png";
import more from "../assets/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex-[2] chat lg:w-60 xl:w-72">
      <div className="ChatInfo h-[50px] p-[10px] bg-[#5d5b8d] flex items-center justify-between text-[#d3d3d3]">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons flex">
          <img src={cam} alt="" className="h-6" />
          <img src={Add} alt="" className="h-6" />
          <img src={more} alt="" className="h-6" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;


