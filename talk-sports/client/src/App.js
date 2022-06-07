import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SetAvatar from "./components/SetAvatar/SetAvatar";

import Home from "./components/Home/Home";

import Login from "./components/Login/Login";

import Signup from "./components/Signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SetAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
