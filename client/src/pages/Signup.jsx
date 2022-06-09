import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { signupRoute } from "../utils/Routes";
import"../styles/signup.css"
import Navbar from "../components/Navbar";

export default function Signup() {
    const navigate = useNavigate();
    const [values, setValues] = useState({username: '', password: '', passwordconfirm: '', email: ''});

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/");
        }
      }, []);

      const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
      };

      const handleValidation = () => {
        const { password, passwordconfirm, username, email } = values;
        if (password !== passwordconfirm) {
          console.error("Password's Must Be The Same.");
          return false;
        } else if (username.length < 4) {
          console.error(
            "Username Must Be 4 Characters or More.");
          return false;
        } else if (password.length < 4) {
          console.error(
            "Password Must Be 4 Characters or More.");
          return false;
        } else if (email === "") {
          console.error("Email Required.");
          return false;
        }
    
        return true;
      };
      
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
          const { email, username, password } = values;
          const { data } = await axios.post(signupRoute, {
            username,
            password,
            email,
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
    <><Navbar/>
        <div className="signupbody">

<SignupContainer>
    <form action="" onSubmit={(event) => handleSubmit(event)}>
        <div className="header">
            <h1>Talk Sports</h1>
        </div>
        <input
        type= 'text'
        placeholder = 'Username'
        name = 'username'
        onChange = {(e) => handleChange(e)}
        min = '4' />
        <input
        type = 'password'
        placeholder= 'Password'
        name = 'password'
        onChange = {(e) => handleChange(e)}
        min = '4' />
        <input
        type = 'password'
        placeholder= 'Confirm Password'
        name = 'passwordconfirm'
        onChange = {(e) => handleChange(e)}
        min = '4' />
        <input
        type = 'email'
        placeholder= 'Email'
        name = 'email'
        onChange = {(e) => handleChange(e)}
        min = '4' />
        <button type="submit">Create Account</button>
        <Link to = '/login'>Login</Link>
    </form>
</SignupContainer>
</div></>
    )
}

const SignupContainer = styled.div`
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





