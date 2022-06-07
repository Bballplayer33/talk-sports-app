import './Login.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
// import {LoginRoute} from '../utils/API';

function Login() {
    const navigate = useNavigate;
    const [values, setvalues] = useState({username: '', password: ''});
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 10000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    };

    useEffect(()=> {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate('/');
        }
    }, []);

    const handleChange = (event) => {
        setvalues({...values, [event.target.name]: event.targe.value});
    };

    const validateForm = () => {
        const {username, password} = values;
        if (username === '') {
            toast.error('Both email and password are required for login. Please try again.', toastOptions);
            return false;
        } else if (password === '') {
            toast.error('Both email and password are required for login. Please try again.', toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const {username, password} = values;
            const {data} = await axios.post(LoginRoute, {username, password
        });
        if (data.status === false) {
            toast.error(data.msg, toastOptions);
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
                <button type='submit'>Login</button>
                <span>
                    <Link to='/Signup'>Create New Account.</Link>
                </span>
            </form>
        </FormContainer>
        <ToastContainer />
        </>
    );

};

export default Login;



