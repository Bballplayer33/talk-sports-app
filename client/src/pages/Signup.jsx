import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/signup.css"
import { signupRoute } from "../utils/Routes";

export default function Signup() {
  const navigate = useNavigate();

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
      console.error(
        "Password and confirm password should be same.",
      );
      return false;
    } else if (username.length < 3) {
      console.error(
        "Username should be greater than 3 characters.",
      );
      return false;
    } else if (password.length < 8) {
      console.error(
        "Password should be equal or greater than 8 characters.",
      );
      return false;
    } else if (email === "") {
      console.error("Email is required.");
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
    <>
      <div className="signupbody">

        <div className="signupContainer">
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
        </div>
      </div>
    </>
  )
}
  

