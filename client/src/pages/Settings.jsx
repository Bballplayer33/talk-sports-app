import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Settings() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/login");
        } else {
          setCurrentUser(
            await JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )
          );
        }
      }, []);



    return (
        <>
            <SettingsContainer>
               
            </SettingsContainer>
        </>
    )
}

const SettingsContainer = styled.div `
    height:100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


`;
