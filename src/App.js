import React from 'react';
import LoginScreen from './Components/LoginScreen.js'
import SignupScreen from './Components/SignupScreen'
import ColorsUsed from './Components/colorsUsed.js'
import NavBar from './Components/NavBar.js'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';

function App() {
  const [currUser, setCurrUser] = React.useState("");
  const [sessionToken, setSessionToken] = React.useState(localStorage.getItem('sessionToken'));

	React.useEffect(() => {
    axios.get("http://localhost:3002/verify", {
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    })
    .then(res => {
      setCurrUser(res.data);
    })
    .catch(err => {
      setCurrUser(0);
      console.log('There was an error')
    })
	}, [sessionToken])

  return (
    <>
      <NavBar currUser = {currUser}/>
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