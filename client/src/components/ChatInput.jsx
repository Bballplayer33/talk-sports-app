import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import '../styles/chatInput.css'



export default function ChatInput( handleSendMsg ) {
  const { msg, setMsg } = useState('');

  const sendChat = (event) => {
    event.preventDefault();
      handleSendMsg(msg);
      setMsg("");
  };

  return (
    <div className="chatContainer" >
      <form onSubmit={(event) => sendChat(event)}>
        <input
          type='text'
          value={msg}
        />
        <button type="submit" >
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

