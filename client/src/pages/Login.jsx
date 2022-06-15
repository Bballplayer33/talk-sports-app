import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css"
//import Navbar from "../components/Navbar";
import { loginRoute } from "../utils/Routes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: '', password: '' });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };


  return (
    <>
    {/* <Navbar /> */}

      <LoginContainer>
        <form action="" className="loginForm" onSubmit={(event) => handleSubmit(event)}>
          <div className="header">
            <style>{'body { background-color: black; }'}</style>
            <h1>TALK SPORTS</h1>
          </div>
          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={(e) => handleChange(e)}
            min='4' />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)}
            />
          <button type="submit">Log In</button>
          <Link to='/signup'>Account Signup</Link>
        </form>
      </LoginContainer>
      <ToastContainer/>
    </>
  )
}

const LoginContainer = styled.div`
  height:100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
  }

  
`;




