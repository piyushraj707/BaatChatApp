import React from 'react';
import LoginScreen from './Components/LoginScreen.js'
import SignupScreen from './Components/SignupScreen'
import ColorsUsed from './Components/colorsUsed.js'
import NavBar from './Components/NavBar.js'
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <div className='navbar-bg'></div>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path='/colorsused' element={<ColorsUsed />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path='/signup' element={<SignupScreen />} />
      </Routes>
    </>
  )
}

export default App;