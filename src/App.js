import React from 'react';
import LoginScreen from './Components/LoginScreen.js'
import SignupScreen from './Components/SignupScreen'
import ColorsUsed from './Components/colorsUsed.js'
import NavBar from './Components/NavBar.js'
import Home from './Components/Home.js';
import BaatChat from './Components/BaatChat.js';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { io } from 'socket.io-client'
import { BASE_URL } from './myEnv.js';
import BigInt from "big-integer"

function App() {
  const [currUser, setCurrUser] = React.useState("");
  const [sessionToken, setSessionToken] = React.useState(localStorage.getItem('sessionToken'));
  const socket = React.useRef()
  const isLive = React.useRef(false);
  const isFirstTime = React.useRef(); //to track whether it is the first time the component is loading.
  const secKey = React.useRef(localStorage.getItem('secKey')?.toString() !== "null" ?BigInt(localStorage.getItem('secKey')):0); //secret key for Diffie-Hellman key exchange.
  //const secKey = React.useRef(0)


  React.useEffect(() => {
    // if (isFirstTime.current) {//Only run this code if it is the first time the component is rendering
    isFirstTime.current = 0;
    localStorage.setItem('sessionToken', sessionToken)
    localStorage.setItem('secKey', secKey.current?.toString())
    axios.get(BASE_URL + "/verify", {
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    })
      .then(res => {
        setCurrUser(res.data);
        socket.current = io('http://localhost:3001', { auth: { sessionToken: sessionToken } })
        socket.current.on('connect', () => {
          isLive.current = true;
          console.log('connected to the socket server with id: ', socket.current?.id);
        })
        socket.current.on('disconnect', () => {
          isLive.current = false;
          console.log("Socket connection disconnected.");
        })
      })
      .catch(err => {
        setCurrUser(0);
        localStorage.setItem('sessionToken', null);
        localStorage.setItem('secKey', null);
        console.log('There was an error')
      })
    // }
    // return () => {
    //   socket?.disconnnect();
    // }
    // isFirstTime.current = 0; //Allow it to re-run 
  }, [sessionToken])

  return (
    <>
      <NavBar currUser={currUser} setSessionToken={setSessionToken} />
      <div className='navbar-bg'></div>
      <Routes>
        <Route path="/" element={<Home currUser={currUser} />} />
        <Route path="/login" element={<LoginScreen currUser={currUser} secKey={secKey} setSessionToken={setSessionToken} />} />
        <Route path='/signup' element={<SignupScreen currUser={currUser} secKey={secKey} setSessionToken={setSessionToken} />} />
        <Route path='/chat' element={<BaatChat currUser={currUser} secKey={secKey} sessionToken={sessionToken} socket={socket} isLive={isLive} />} />
        <Route path='/colorsused' element={<ColorsUsed />} />
      </Routes>
    </>
  )
}

export default App;
