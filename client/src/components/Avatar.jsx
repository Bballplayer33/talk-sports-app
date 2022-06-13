import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
//import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/Routes";

export default function Avatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    //const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

    useEffect(async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
        navigate('/login');
    }, []);

    const setProfileAvatar = async () => {
        if (selectedAvatar === undefined) {
          toast.error("Please select an avatar", toastOptions);
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
            toast.error("Error setting avatar. Please try again.", toastOptions);        }
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
        //setIsLoading(false);
      }, []);

      return (
          <>
          {(
            <AvatarContainer>
                <div className="title">
                    <h1>Select Your Profile Picture</h1>
                </div>
                <div className="avatar-options">
                    {avatars.map((avatar, index) => {
                        return (
                            <div className={`avatar ${selectedAvatar === index ? 'selected' : ''}`} >
                                <img 
                                    src={`data:image/png + xml;base64,${avatar}`}
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
                <ToastContainer />
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

    .title-container {
        h1 {
          color: white;
        }
      }
      .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
          border: 0.4rem solid transparent;
          padding: 0.4rem;
          border-radius: 5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.5s ease-in-out;
          img {
            height: 6rem;
            transition: 0.5s ease-in-out;
          }
        }
        .selected {
          border: 0.4rem solid #4e0eff;
        }
      }
      .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
          background-color: #4e0eff;
        }
      }

`;