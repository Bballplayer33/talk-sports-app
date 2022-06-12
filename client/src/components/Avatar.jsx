import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/Routes";

export default function Avatar() {
    const api = `https://api.multiavatar.com/4645648`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    useEffect(async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
        navigate('/login');
    }, []);

    const setProfileAvatar = async () => {
        if (selectedAvatar === undefined) {
            console.error('Select An Avatar');
        } else {
            const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

        if (data.isSet) {
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(user)
            );
            navigate("/");
          } else {
            console.error("Error, Please try again.");
        }
    }
    };

    useEffect(async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      }, []);

      return (
          <>
          {isLoading ? (
          <AvatarContainer>
          </AvatarContainer>
            ) : (
            <AvatarContainer>
                <div className="title">
                    <h1>Select Your Profile Picture</h1>
                </div>
                <div className="avatar-options">
                    {avatars.map((avatar, index) => {
                        return (
                            <div className={`avatar ${selectedAvatar === index ? 'selected' : ''}`} >
                                <img 
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    alt = 'avatar'
                                    key = {avatar}
                                    onClick = {() => setSelectedAvatar(index)} />
                            </div>
                        );
                    })}
                </div>
                <button onClick={setProfileAvatar}>
                    Select Avatar
                </button> 
            </AvatarContainer> 
            )}
          </>
      );
}

const AvatarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;

`;