import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import '../styles/chatContainer.css'
import { io } from "socket.io-client";
import { host } from "../utils/Routes";
import { useNavigate } from 'react-router-dom'

export default function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const scrollRef = useRef();
  const navigate = useNavigate()
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (!socket) {
        let mainSocket = io(host, { transports: ["websocket"] });
        mainSocket.emit('add-user', currentUser._id);
        setSocket(mainSocket)
      } else {
        socket.on("msg-recieved", data => {
          setMessages(msg => [...msg, data])
        })
      }
    }
  }, [currentUser, socket]);

  console.log(messages)



  const handleSendMsg = async (msg) => {
    const data = {
      currentUser, message: msg
    }
    socket.emit('msg-sent', data)
  };


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });

  }, [messages]);

  return (
    <ChatContainerDiv>
      <div className="header">
        <div className="user-details">
          <div className="avater">
            <img src={require('../assets/welcome/Basketball.png')} />
          </div>
          <div className="username">
            <h3>{'All Chats'}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages" style={{ overflowY: "scroll" }} >
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div className={`message ${message.currentUser.username == currentUser.username ? 'sended' : 'recieved'}`}>
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </ChatContainerDiv>
  );
}

const ChatContainerDiv = styled.div`
    display: grid;
    
    grid-template-rows: 10% 80% 10%;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;}

    .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
      .user-details {
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar {
          img {
            height: 3rem;
          }
        }
        .username {
          h3 {
            color: white;
          }
        }
      }
    }
    .chat-messages {
      padding: 1rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: gold;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      .message {
        display: flex;
        align-items: center;
        .content {
          max-width: 40%;
          overflow-wrap: break-word;
          padding: 1rem;
          font-size: 1.1rem;
          border-radius: 1rem;
          color: gold;
          @media screen and (min-width: 720px) and (max-width: 1080px) {
            max-width: 70%;
          }
        }
      }
      .sended {
        justify-content: flex-end;
        .content {
          background-color: gold;
          color : black;
        }
      }
      .recieved {
        justify-content: flex-start;
        .content {
          background-color: gold;
          color : black;
        }
      }
    }

`;



