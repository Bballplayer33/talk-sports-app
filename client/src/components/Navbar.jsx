import React, { useState, useEffect } from "react";
import"../styles/Navbar.css"
export default function Navbar(){
    return(
        <nav>
            <h1>Test Nav Bar</h1>
            <ul>
                <li><a href="/login"></a>Login</li>
                <li><a href="/Signup"></a>Signup</li>
            </ul>
        </nav>
    )

}