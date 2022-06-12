import React, { useState, useEffect } from "react";
import"../styles/Navbar.css"
import { useNavigate, Link } from "react-router-dom";


export default function Navbar(){
    return(
        <nav>
            <h1>QUOTE OF THE DAY: “Winners never quit and quitters never win.” —Vince Lombardi </h1>
            <ul>
                <li><Link to= '/login'>Login</Link></li>
                <li><Link to= '/signup'>Sign Up</Link></li>
            </ul>
        </nav>
    )

}