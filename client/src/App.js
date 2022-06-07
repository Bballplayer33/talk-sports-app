import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Avatar from "./components/Avatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Avatar" element={<Avatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
