import React, { useState, useEffect } from "react";
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import "../styles/welcome.css"


export default function Welcome() {
    const [userName, setUserName] = useState('');


    useEffect(async () => {
        setUserName(
            await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            ).username
        );
    }, []);


    const navigate = useNavigate();

    const chatRoom = () => {
    navigate("/chat");
     };

//     const changeCurrentChat = (index, chatRoom) => {
//       setCurrentSelected(index);
//       changeChat(chatRoom);
//     };
  
return (
    <div className="welcome-wrapper" >
        <div className="welcome-container" >
            <h1 >Welcome, {userName}</h1>
            <h2>Select A Chat To Begin</h2>
            <div className="chatRooms-container">
                <div className="date" >
                    <Moment parse="YYYY-MM-DD HH:mm">
                        2022-06-15 7:15</Moment>
                </div>
                <section className="chatrooms" >

                    <div className="baseball" onClick={chatRoom} />
                    <div className="basketball" onClick={chatRoom} />
                    <div className="soccer" onClick={chatRoom} />
                    <div className="football" onClick={chatRoom} />
                </section>
            </div>

        </div>
    </div>

);

}
