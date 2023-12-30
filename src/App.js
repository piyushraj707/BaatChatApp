import React from 'react';
import LoginScreen from './Components/LoginScreen.js'
import SignupScreen from './Components/SignupScreen'
import ColorsUsed from './Components/colorsUsed.js'
import NavBar from './Components/NavBar.js'
import BaatChat from './Components/BaatChat.js';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import {io} from 'socket.io-client'

function App() {
  const [currUser, setCurrUser] = React.useState("");
  const [sessionToken, setSessionToken] = React.useState(localStorage.getItem('sessionToken'));
  let isFirstTime = React.useRef(1); //to track whether it is the first time the component is loading.

	React.useEffect(() => {
    // if (isFirstTime.current) {//Only run this code if it is the first time the component is rendering
      isFirstTime.current = 0;
      localStorage.setItem('sessionToken', sessionToken)
      axios.get("http://localhost:3002/verify", {
        headers: {
          Authorization: 'Bearer ' + sessionToken
        }
      })
      .then(res => {
        setCurrUser(res.data);
        console.log('socket.io')
        const socket = io('http://localhost:3001', {auth: {sessionToken: sessionToken}})
        socket.on('connect', () => {
          console.log('connected to the socket server.');
        })
      })
      .catch(err => {
        setCurrUser(0);
        console.log('There was an error')
      })
    // }
    // isFirstTime.current = 0; //Allow it to re-run 
	}, [sessionToken])

  return (
    <>
      <NavBar currUser = {currUser} setSessionToken = {setSessionToken}/>
      <div className='navbar-bg'></div>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<LoginScreen currUser = {currUser} setSessionToken = {setSessionToken} />} />
        <Route path='/signup' element={<SignupScreen currUser = {currUser} setSessionToken = {setSessionToken} />} />
        <Route path='/chat' element = {<BaatChat sessionToken = {sessionToken} />} />
        <Route path='/colorsused' element={<ColorsUsed />} />
      </Routes>
    </>
  )
}

export default App;