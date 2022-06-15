import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import "../styles/chat.css"
import { allUsersRoute, host } from "../utils/Routes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {

  return (
    <>
      <ChatContainerStyle>
        <div className="card">
          <Welcome />
        </div>
      </ChatContainerStyle>

    </>
  )
}

const ChatContainerStyle = styled.div`
    height:100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    


`;


