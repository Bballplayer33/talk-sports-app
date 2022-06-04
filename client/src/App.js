import React from 'react';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import SetAvatar from './components/SetAvatar';

import Home from './pages/Home';

import Login from './pages/Login';

import Signup from './pages/Signup';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/setAvatar' element={<SetAvatar />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;

