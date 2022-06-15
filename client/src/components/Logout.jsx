import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../utils/Routes";
import '../styles/logoutBtn.css'

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        const id = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY));
        const data = await axios.get(`${logoutRoute}/${id}`);

        if (data.status === 200) {
            localStorage.clear();
            navigate('/login');
        }
    };

    return (

        <div className="logoutBtn" onClick={handleClick}>           
         <BiPowerOff />
        </div>
    );
}

