import React from "react";
import axios from "axios";
import { BASE_URL } from "../myEnv";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { getSecKey } from "../myCrypto";
import '../css/login-signup.css'

function LoginScreen(props) {
	const navTo = useNavigate();
	const [formData, setFormData] = React.useState({username: "", password: ""});

	React.useEffect(() => { //redirect if logged-in
		if (props.currUser) navTo('/chat')
	}, [props.currUser])

	function handleChange(event) {
		const {name, value} = event.target;
		setFormData(prevVal => ({...prevVal, [name]: value}))
	}
	
	function hashPass(pass) {
		return CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
	}

	function handleSubmission(event) {
		event.preventDefault();
		if (!formData.username) alert("Please enter username");
		else if (!formData.password) alert("Please enter password");
		else {
			const dataToPost = {
				username: formData.username,
				password: hashPass(formData.password)
			}
			axios.post(BASE_URL + "/login", dataToPost)
			.then((res) => {
				props.secKey.current = getSecKey(dataToPost.password)
				alert("correct credentials")
				props.setSessionToken(res.data.sessionToken)
			})
			.catch(err => {
				if (err.response.status === 404) alert("Username not found. Please register.")
				else if (err.response.status === 401) alert("Wrong username/password combination.")
				console.log("There was an error.")
				console.log(err)
			})
		}
	}
	return (
		<>
			<div className="Container-1">
				<div className="Container-2">
					<form onSubmit={handleSubmission} method="POST" className="mainForm">
						Username
						<input 
							value={formData.username}
							type="text"
							name="username"
							onChange={handleChange}
							placeholder="johncena@gmail.com"/>
						Password
						<input
							value={formData.password}
							type="password"
							name="password"
							onChange={handleChange}
							placeholder="********"/>
						<button type="submit">Login</button>
					</form>
					<div>Don't have an account? <Link to='/signup'>Signup</Link></div>
					<div><Link to="/">Forgot your password?</Link></div>
				</div>
			</div>
		</>
	)
}

export default LoginScreen;