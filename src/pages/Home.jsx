import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const Home = () => {
  return (
     <div className=" bg-[#a7bcff] h-screen flex items-center justify-center ">
      <div className="border border-white rounded-lg w-[100%] h-[100%] flex overflow-hidden  ">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home