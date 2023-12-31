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
import {io} from 'socket.io-client'

function App() {
  const [currUser, setCurrUser] = React.useState("");
  const [sessionToken, setSessionToken] = React.useState(localStorage.getItem('sessionToken'));
  const socket = React.useRef()
  const isFirstTime = React.useRef(); //to track whether it is the first time the component is loading.

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
        socket.current = io('http://localhost:3001', {auth: {sessionToken: sessionToken}})
        socket.current.on('connect', () => {
          console.log('connected to the socket server with id: ', socket.current?.id);
        })
      })
      .catch(err => {
        setCurrUser(0);
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
      <NavBar currUser = {currUser} setSessionToken = {setSessionToken}/>
      <div className='navbar-bg'></div>
      <Routes>
        <Route path="/" element={<Home currUser = {currUser} />} />
        <Route path="/login" element={<LoginScreen currUser = {currUser} setSessionToken = {setSessionToken} />} />
        <Route path='/signup' element={<SignupScreen currUser = {currUser} setSessionToken = {setSessionToken} />} />
        <Route path='/chat' element = {<BaatChat currUser = {currUser} sessionToken = {sessionToken} socket = {socket}/>} />
        <Route path='/colorsused' element={<ColorsUsed />} />
      </Routes>
    </>
  )
}

export default App;