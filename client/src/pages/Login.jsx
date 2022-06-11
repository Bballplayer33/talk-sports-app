import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { loginRoute } from "../utils/Routes";
import "../styles/login.css"
import Navbar from "../components/Navbar";

export default function Login() {

  const navigate = useNavigate();
  const [values, setValues] = useState({ username: '', password: '' });

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
      console.error("Email and Password Required for Login.");
      return false;
    } else if (password === "") {
      console.error("Email and Password Required for Login.");
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
        console.error(data.msg);
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
    <><Navbar />

      <LoginContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="header">
            <style>{'body { background-color: black; }'}</style>
            <h1>Talk Sports</h1>
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
            min='4' />
          <button type="submit">Log In</button>
          <Link to='/signup'>Account Signup</Link>
        </form>
      </LoginContainer>
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




