import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Welcome() {
    const [userName, setUserName] = useState('');

    useEffect(async () => {
        setUserName(
            await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                ) .username
                );
    }, []);

    return (
        <WelcomeContainer>
            <h1>Welcome {userName}</h1>
            <h2>Select A Chat To Begin</h2>
        </WelcomeContainer>
    );

}

const WelcomeContainer = styled.div `
    display: flex;
    justicy-content: center;
    align-items: center;
    flex-direction: column;
`;