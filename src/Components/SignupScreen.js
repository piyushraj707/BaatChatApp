import React from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { BASE_URL } from "../myEnv";
import '../css/login-signup.css'
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { getSecKey, getSignedSecKey } from "../myCrypto";

function SignupScreen(props) {
	const navTo = useNavigate();
	const [formData, setFormData] = React.useState({
		name: "",
		email: "",
		username: "",
		password: "",
		cPassword: ""
	})

	React.useEffect(() => { //redirect if logged-in
		if (props.currUser) navTo('/')
	}, [props.currUser])


	function handleChange(event) {
		const {name, value} = event.target;
		setFormData(prevVal => ({
			...prevVal,
			[name]: value
		}))
	}

	function hashPass(pass) {
		return CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
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
			const dataToPost = {
				...formData,
				password: hashPass(formData.password),
				signedSecKey: getSignedSecKey(getSecKey(hashPass(formData.password))).toString()
			};
			delete dataToPost["cPassword"];

			axios.post(BASE_URL + "/signup", dataToPost)
				.then(res => {
					props.secKey.current = getSecKey(dataToPost.password)
					alert("You are registered successfully (707).")
					props.setSessionToken(res.data.sessionToken);
				})
				.catch (err => {
					if (err.response.status === 409) alert("username already taken")
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