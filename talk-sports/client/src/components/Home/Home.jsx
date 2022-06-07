import './Home.css';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import {io} from 'socket.io-client';
// import {UsersRoute, host} from '../utils/API';
// import ChatContainer from '../components/Chat/ChatContainer';
// import Contacts from '../components/Contacts';
// import Welcome from '../components/Welcome';

function Home() {
    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate('/Login');
        } else {
            setCurrentUser(await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            ));
        }
    }, []);

    useEffect(async () => {
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                const data = await axios.get('${allUserRoute}/${currentUser._id}');
                setContacts(data.data);
            } else {
                navigate('/SetAvatar');
            }
        }
    }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };


    return (
       <>
            {/* <Container>
                <div className='containerdiv'>
                    <Contacts contacts={contacts} changeChat ={handleChatChange} />
                    {currentChat === undefined ?
                    (
                        <Welcome />
                    ) :
                    (
                        <ChatContainer currentChat={currentChat} socket={socket} />
                    )}
                </div>
            </Container> */}
        </>
    );


};


export default Home;

