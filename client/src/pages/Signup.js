import '../styles/Signup.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import {SignupRoute} from '../utils/API';

function Signup() {
    const navigate = useNavigate();
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 10000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    };

    const [values, setvalues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(()=> {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate('/');
        }
    }, []);

    const handleChange = (event) => {
        setvalues({...values, [event.target.name]: event.targe.value});
    };

    const handleValidation = () => {
        const {password, confirmPassword, username, email} = values;
        if (password!== confirmPassword) {
            toast.error('Password do not match.', toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error('Username must be more than 4 characters.', toastOptions);
            return false;
        } else if (password.length < 4) {
            toast.error('Password must be more than 4 characters.', toastOptions);
            return false;
        } else if (email === '') {
            toast.error('Email required.', toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const {email, username, password} = values;
            const {data} = await axios.post(SignupRoute, {
                username, 
                email,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg , toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(data.user)
                );
                navigate('/');
            }
        }
    };


    return (
        <>
            <FormContainer>
            <form action='' onSubmit={(event) => handleSubmit(event)}>
                <div className='header'>
                    <img src={Logo} alt='logo' />
                    <h1>Talk Sports</h1>
                </div>
                <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    onChange={(e) => handleChange(e)}
                    min='4'
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    onChange={(e) => handleChange(e)}
                    min='4'
                />
                <input
                    type='password'
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    onChange={(e) => handleChange(e)}
                    min='4'
                />
                <input
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    onChange={(e) => handleChange(e)}
                />
                <button type='submit'>Create Account</button>
                <span>
                    <Link to='/signup'>Login With Existing Account</Link>
                </span>
            </form>
        </FormContainer>
        <ToastContainer />
        </>
    )

};


export default Signup;