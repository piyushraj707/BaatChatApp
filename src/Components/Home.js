import React from "react";
import {useNavigate} from "react-router-dom"

function Home({currUser}) {
	const navTo = useNavigate();
	const myStyle = {
		"text-align": "center"
	}
	React.useEffect(() => {
		if (currUser) navTo('/chat')
	}, [currUser])
	return (
		<h1 style={myStyle}>Please log in to continue.</h1>
	)
}

export default Home;