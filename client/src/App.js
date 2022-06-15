import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Avatar from './components/Avatar';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cont from './components/ChatContainer';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<Avatar />} />
        <Route path="/" element={<Chat />} />
        <Route path="/chat" element={<Cont />} />
      </Routes>
    </BrowserRouter>
  );
}
