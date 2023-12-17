import { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef(); 
  useEffect(() => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  

  return (
    <div  ref={ref} className={`flex gap-5 mb-5 items-end ${message.senderId === currentUser.uid ? '' : 'flex-row-reverse'}`}>
      <div className="flex flex-col text-gray-400 font-light messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" className="w-10 h-10 rounded-full object-cover" />
        <span className="text-sm">just now</span>
      </div>
      <div className={`max-w-[80%] flex flex-col gap-5 ${message.senderId === currentUser.uid ? '' : 'items-end'}`}>
        <p className={`py-2 px-4 rounded-tl-lg rounded-bl-lg max-w-max-content ${message.senderId === currentUser.uid ? 'bg-white' : 'bg-blue-500 text-white rounded-bl-0'}`}>{message.text}</p>
        {message.img && <img src={message.img} alt="" className="w-1/2" />}
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    senderId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    img: PropTypes.string // If img is optional
    // Add more specific PropTypes as needed
  }).isRequired,
};

export default Message;


