import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/login-signup.css'

function LoginScreen() {
	const [formData, setFormData] = React.useState({username: "", password: ""});

	function handleChange(event) {
		const {name, value} = event.target;
		setFormData(prevVal => ({...prevVal, [name]: value}))
	}
	
	function handleSubmission(event) {
		event.preventDefault();
		if (!formData.username) alert("Please enter username");
		else if (!formData.password) alert("Please enter password");
		else {
			axios.post("http://localhost:3002/login", formData)
			.then((res) => {
				console.log(res)
			})
			.catch(err => {
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