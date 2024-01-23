import React from "react";
import axios from "axios";
import BigInt from "big-integer"
import { BASE_URL } from "../myEnv";
import { getAESKey } from "../myCrypto";

function FriendList(props) {
	const chatCount = React.useRef(0);
	const eventTarget = React.useRef(null); //holds onto the current friend div

	function handleClick(friend, AES_KEY, event) {
		if (eventTarget.current) eventTarget.current.classList.remove('selected-card');
		event.target.classList.add('selected-card')
		eventTarget.current = event.target;
		props.setAES_KEY(AES_KEY)
		props.setCurrFriend(friend)
	}
	
	async function fetchFriendList() {
		try {
			const result = await axios.get(BASE_URL + "/friendship/myfriends", {
				headers: {
					Authorization: 'Bearer ' + props.sessionToken
				}
			})
			props.setMyFriends(result.data.map(friendData => {
				return {
					username: friendData.username,
					name: friendData.name,
					AES_KEY: getAESKey(BigInt(friendData.signedSecKey), props.secKey.current)
				}
			}))
		}
		catch {
			console.log("There was an error");
		}
	}

	React.useEffect(() => {
		fetchFriendList();
	}, [])

	return (
		<>
			{
				props.myFriends.map((friend) => {
					chatCount.current += 1
					return (
						<div key = {friend.username} onClick={(event) => {handleClick(friend.username, friend.AES_KEY, event)}} className="contact left-card">
							<div className="contact-name">{friend.name}</div>
							<div className="chat-preview">{/*Conduction me mai F lag gaya*/}</div>
						</div>
					)
				})
			}
		</>
	)
}

export default FriendList;