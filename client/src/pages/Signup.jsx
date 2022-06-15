import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import "../styles/signup.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupRoute } from "../utils/Routes";
//import Navbar from "../components/Navbar";

export default function Signup() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
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
        email,
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
      {/* <Navbar/> */}
      <div className="signupbody">

        <SignupContainer>
          <form action="" className="signupform" onSubmit={(event) => handleSubmit(event)}>
            <div className="header">
              <h1>TALK SPORTS</h1>
            </div>
            <input
              type='text'
              placeholder='Username'
              name='username'
              onChange={(e) => handleChange(e)}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={(e) => handleChange(e)}
            />
            <input
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              onChange={(e) => handleChange(e)}
            />
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Create Account</button>
            <Link to='/login'>Login</Link>
          </form>
        </SignupContainer>
      </div>
      <ToastContainer />
    </>
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
