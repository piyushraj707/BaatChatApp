import React from "react";
import axios from "axios";
import '../css/AddButton.css'

function AddButton() {
	function handleClick() {
		const friend = prompt("Enter username of your friend");
		axios.get("http://localhost:3002/addfriend/abcd")
			.then(() => {
				alert("success")
			})
			.catch(() => {
				alert("No user with this username")
			});
	}
	return (
		<div className="add-button-box" onClick={handleClick}>
			<div className="vertical bar"></div>
			<div className="horizontal bar"></div>
		</div>
	)
}

export default AddButton;