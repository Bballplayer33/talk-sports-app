import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/Routes";

export default function Login() {

    const navigate = useNavigate();
    const [values, setValues] = useState({username: '', password: ''});

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
        <div>
            <p>Test Login Page</p>
        </div>
    )
};
