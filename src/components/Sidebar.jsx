import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div className="flex-[1] bg-[#3e3c61] relative lg:w-40 xl:w-48">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;


