import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import '../styles/chatInput.css'

export default function ChatInput({ handleSendMsg }) {
  const { msg, setMsg } = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerHideShow = () => {
    showEmojiPicker(!showEmojiPicker);
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="chatContainer" >
      <form onSubmit={(event) => sendChat(event)}>
        <div className="button">
          <div className="emoji">
            <BsEmojiSmileFill style={{ fontSize: "26px" }} onClick={handleEmojiPickerHideShow} />
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
        <input
          type='text'
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit" >
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

