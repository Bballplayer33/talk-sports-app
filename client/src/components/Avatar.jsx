import React, { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/Routes";

import '../styles/avatar.css'

export default function Avatar() {
  const images = [
    {
      number: 1,
      title: 'Stephanie',
      image: 'Stephanie'
    },
    {
      number: 2,
      title: 'Chance',
      image: 'Chance'
    },
    {
      number: 3,
      title: 'Earl',
      image: 'Earl'
    },
    {
      number: 4,
      title: 'Erica',
      image: 'Erica'
    },
    {
      number: 5,
      title: 'Ashley',
      image: 'Ashley'
    },
    {
      number: 6,
      title: 'Mike',
      image: 'Mike'
    },
    {
      number: 7,
      title: 'Juan',
      image: 'Juan'
    },
    {
      number: 8,
      title: 'Helma',
      image: 'Helma'
    }
  ];
  const navigate = useNavigate();
  const [avatars] = useState([]);
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
      navigate("/login");
  }, []);

  const setProfileAvatar = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: images[selectedAvatar],
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
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  return (
    <>
      {
        <div className="avatar-wrapper" >
          <div className="title">
            <h1>Select Your Profile Picture</h1>
          </div>
          <div className="avatar-options">
            {images.map((item, index) => (

              <li key={index}>
                <button onClick={() => setSelectedAvatar(item.title)}>
                  <img
                    src={require('../assets/' + item.image + '.png')}
                    alt={item.title} />
                  <p>{item.image}</p>
                </button>
              </li>
            ))};
          </div>
          <button className="select-button" onClick={setProfileAvatar}>Select Avatar</button>
        </div>
      }
    </>
  );
}


