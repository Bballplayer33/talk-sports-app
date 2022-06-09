import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/Routes";

export default function ChatContainer({currentChat, socket}) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(async () => {
        const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        const response = await axios.post(recieveMessageRoute, {
            from: data._id,
            to: currentChat._id,
        });
        setMessages(response.data);
    }, [currentChat]);

    

}

const ChatContainerDiv = styled.div `
    display: grid;
    grid-template-rows: 10% 80% 10%;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;}

`;