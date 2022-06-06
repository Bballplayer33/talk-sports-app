import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import {sendMessageRoute, recieveMessageRoute} from '../utils/API';
import ChatInput from './ChatInput';
import Logout from './Logout';
import '../styles/ChatContainer.css';

function ChatContainer({currentChat, socket}){
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(async () => {
        const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY));
        const response = await axios.post(recieveMessageRoute, {
            from: data._id,
            to: currentChat._id ,
        });
        setMessages(response.data);
    }, [currentChat]);

    useEffect( () => {
        const getCurrentChat = async () => {
            if (currentChat) {
                await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY)
                )._id;
            }
        };
        getCurrentChat();
    }, [currentChat]);

    const hadleSendMsg = async (msg) => {
        const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY));
        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: data._id,
            msg,
        });
        await axios.post(sendMessageRoute, {
            from: data._id,
            to: currentChat._id,
            message: msg,
        });
        
        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        setMessages(msgs);
    };
    
    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-receive', (msg) => {
                setArrivalMessage({fromSelf: false, message: msg});
        });
        }
    }, []);

    useEffect( () => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect( () => {
        scrollRef.current?.scrollIntoView({behavior: 'smoot'});
    }, [messages]);


    return (
        <Container>
            <div className='chat-header'>
                <div className='user-details'>
                    <div className='avatar'>
                        <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                        alt='Avatar' />
                    </div>
                    <div className='username'>
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className='chat-messages'>
                {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${
                                message.fromSelf ? 'sended' : 'received'
                            }`}>
                            <div className='content'>
                                <p>{message.message}</p>
                            </div>
                        </div>
                        </div>
                    );
                })}
            </div>
            <ChatInput hadleSendMsg={hadleSendMsg} />
        </Container>
    );
    

};

export default ChatContainer;