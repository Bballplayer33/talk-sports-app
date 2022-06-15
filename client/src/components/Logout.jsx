import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../utils/Routes";
import styled from "styled-components";
// import '../styles/logoutBtn.css'

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        const id = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY))._id;
        const data = await axios.get(`${logoutRoute}/${id}`);

        if (data.status === 200) {
            localStorage.clear();
            navigate('/login');
        }
    };

//     return (
//         <div className="logoutBtn" onClick={handleClick}>           
//          <BiPowerOff />
//         </div>
//     );
// }

return (
    <LogoutButton onClick={handleClick}>
        <BiPowerOff />
    </LogoutButton>
);
}

const LogoutButton = styled.button`
display: flex;
justify-content: center;
align-items: center;

padding: 0.5rem;
border-radius: 0.5rem;
background-color: black;
border: none;
cursor: pointer;
svg {
font-size: 1.3rem;
color: #ebe7ff;
}
`;