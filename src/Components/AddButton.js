import React from "react";
import axios from "axios";
import '../css/AddButton.css'
import { BASE_URL } from "../myEnv";

function AddButton(props) {
	function handleClick() {
		const friend = prompt("Enter username of your friend");
		if (!friend) return;
		if (props.myFriends.length && props.myFriends.find(obj => obj.username === friend)) return;
		axios.get(BASE_URL + "/addfriend/" + friend, {
				headers: {
					Authorization: 'Bearer ' + props.sessionToken
				}
			})
			.then((res) => {
				props.setMyFriends(oldVal => [...oldVal, {username: res.data.username, name: res.data.name}])
				alert('Friend added successfully.')
			})
			.catch((err) => {
				if (err.response.status === 404) alert('Username not found.')
				else if (err.response.status === 400) alert('Cannot add yourself as friend')
				else alert("Something went wrong.")
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