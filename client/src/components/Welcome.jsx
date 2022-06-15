// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Moment from 'react-moment';
// import {useNavigate} from 'react-router-dom';
// import "../styles/welcome.css"

// export default function Welcome({chatRoom, changeChat}) {
//     const [userName, setUserName] = useState('');
//     const [currentUser, setCurrentUser] = useState(undefined);
//     const [currentSelected, setCurrentSelected] = useState(undefined);

//     useEffect(async () => {
//         if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
//           navigate("/login");
//         } else {
//           setCurrentUser(
//             await JSON.parse(
//               localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//             )
//           );
//         }
//       }, []);


//     useEffect(async () => {
//         setUserName(
//             await JSON.parse(
//                 localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//                 ) .username
//                 );
//     }, []);


//     const navigate = useNavigate();

//     // const chatRoom = () => {
//     //     navigate("/chat");
//     // };

//     const changeCurrentChat = (index, chatRoom) => {
//       setCurrentSelected(index);
//       changeChat(chatRoom);
//     };
  
//     return (
//         <WelcomeContainer>
//             <h1>Welcome, {userName}</h1>
//             <h2>Select A Chat To Begin</h2>
            
//             <div className="chatRooms-container">
//             <Moment  parse="YYYY-MM-DD HH:mm">
//                 2022-06-15 7:15</Moment>
//             </div>
//             <div className="baseball"
//               onClick={() => changeCurrentChat(index, chatRoom)} >
//               </div>
//             <div>
//             <button className="basketball" onClick={chatRoom}> Chat Room2 </button>
//             <button className="football" onClick={chatRoom}> Chat Room3 </button>
//             <button className="soccer" onClick={chatRoom}> Chat Room4 </button>
//             </div>
            
//         </WelcomeContainer>
//     );

// }

// const WelcomeContainer = styled.div `
//     display: flex;
//     justicy-content: center;
//     align-items: center;
//     flex-direction: column;

//     img {
//         height: 20rem;
//       }
//       span {
//         color: #4e0eff;
//       }
// `;