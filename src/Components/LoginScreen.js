import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import '../css/login-signup.css'

function LoginScreen() {
	const navTo = useNavigate();
	const [formData, setFormData] = React.useState({username: "", password: ""});
	const [sessionToken, setSessionToken] = React.useState(localStorage.getItem("sessionToken"));

	React.useEffect(() => { //redirect if logged-in
		localStorage.setItem("sessionToken", sessionToken);
		if (sessionToken) navTo('/')
	}, [sessionToken])

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
			axios.post("http://localhost:3002/login", {username: formData.username, password: hashPass(formData.password)})
			.then((res) => {
				console.log("response: ", res.response)
				alert("correct credentials")
				setSessionToken(res.data.sessionToken)
				console.log("hi", res)
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