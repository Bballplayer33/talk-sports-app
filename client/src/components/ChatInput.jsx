import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({handleSendMsg}) {
    const {msg, setMsg} = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = () => {
        showEmojiPicker(!showEmojiPicker);
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
          <ChatInputContatiner>
              <div className="button">
                  <div className="emoji">
                      <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                  </div>
              </div>
              <form onSubmit={(event) => sendChat(event)}>
                  <input
                    type='text'
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg} 
                    />
                    <button type="submit" >
                        <IoMdSend />
                    </button>
              </form>
          </ChatInputContatiner>
      );
}

const ChatInputContatiner = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 5% 95%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0 1rem;
      gap: 1rem;
    }
`;
