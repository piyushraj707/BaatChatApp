import React from "react";
import axios from "axios";
import '../css/login-signup.css'
import { Link } from "react-router-dom";
// import crypto from "crypto"

function SignupScreen() {
	const [formData, setFormData] = React.useState({
		name: "",
		email: "",
		username: "",
		password: "",
		cPassword: ""
	})

	function handleChange(event) {
		const {name, value} = event.target;
		setFormData(prevVal => ({
			...prevVal,
			[name]: value
		}))
	}

	function hashPass(pass) {
		const salt = "adfa"
		return {salt: salt, password: pass};
	}

	function isEmpty() {
		for (const key in formData) {
			if (!formData[key]) return true;
		}
		return false;
	}

	function handleSubmission(event) {
		event.preventDefault()
		if (isEmpty()) alert("Please fill the form completely.");
		else if (formData.password !== formData.cPassword) alert("Passwords do not match!")
		else {
			axios.post("http://localhost:3002/signup", {...formData, ...hashPass(formData.password)})
				.then(res => {
					if (res.status === 409) alert("username already taken")
					else alert("success")
				})
				.catch (err => {
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
						Full Name
						<input 
							value={formData.name}
							type="text"
							name="name"
							onChange={handleChange}
							placeholder="John Cena"/>
						Email
						<input
							value={formData.email}
							type="email"
							name="email"
							onChange={handleChange}
							placeholder="johncena@gmail.com"/>
						Username
						<input
							value={formData.username}
							type="text"
							name="username"
							onChange={handleChange}
							placeholder="johnC707"/>
						Password
						<input
							value={formData.password}
							type="password"
							name="password"
							onChange={handleChange}
							placeholder="********"/>
						Confirm Password
						<input
							value={formData.cPassword}
							type="password"
							name="cPassword"
							onChange={handleChange}
							placeholder="********"/>
						<button>Signup</button>
					</form>
					<div>Already have an account? <Link to="/login">Login</Link> </div>
				</div>
			</div>
		</>
	)
}

export default SignupScreen;