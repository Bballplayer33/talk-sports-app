import React, { useState, useEffect } from "react";
import styled from "styled-components";


export default function Contacts({contacts, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(async () => {
        const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
    }, []);
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    return (
        <>
            {currentUserImage && currentUserImage && (
                <ContactsContainer>
                    <div className="header">
                        <h2>Talk Sports</h2>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div key={contact._id} className={`contact ${index === currentSelected ? 'selected':''}`}
                                onClick ={() => changeCurrentChat(index, contact)}>
                                <div className="avater">
                                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} />
                                </div>
                                <div className="username">
                                    <h3>{contact.username}</h3>
                                </div>
                    </div> 
                    );
                    })}
                    </div>
                    <div className="current-user">
                        <div className="avater">
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt='avatar' />
                        </div>
                        <div className="username">
                            <h3>{currentUserName}</h3>
                        </div>
                    </div>
                </ContactsContainer>
            )}
        </>
    );
}

const ContactsContainer = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
`;