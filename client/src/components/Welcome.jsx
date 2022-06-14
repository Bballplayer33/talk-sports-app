import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Moment from 'react-moment';
import {useNavigate} from 'react-router-dom';
import "../styles/welcome.css"

export default function Welcome() {
    const [userName, setUserName] = useState('');

    useEffect(async () => {
        setUserName(
            await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                ) .username
                );
    }, []);

    const navigate = useNavigate();

    const chatRoom = () => {
        navigate("/chat");
    };
        // const dateToFormat = new Date('1976-04-19T12:59-0500');

    return (
        <WelcomeContainer>
            <h1>Welcome, {userName}</h1>
            <h2>Select A Chat To Begin</h2>
            <div className="chatRooms-container">
            <div>
            <Moment  parse="YYYY-MM-DD HH:mm">
                2022-06-15 7:15</Moment>
            </div>
            <button className="baseball" onClick={chatRoom}> Chat Room1 </button>
            <button className="basketball" onClick={chatRoom}> Chat Room2 </button>
            <button className="football" onClick={chatRoom}> Chat Room3 </button>
            <button className="soccer" onClick={chatRoom}> Chat Room4 </button>
            </div>
            
        </WelcomeContainer>
    );

}

const WelcomeContainer = styled.div `
    display: flex;
    justicy-content: center;
    align-items: center;
    flex-direction: column;

    img {
        height: 20rem;
      }
      span {
        color: #4e0eff;
      }
`;