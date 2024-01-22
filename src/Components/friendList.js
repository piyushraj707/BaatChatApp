import React from "react";
import axios from "axios";
import BigInt from "big-integer"
import { BASE_URL } from "../myEnv";
import { getAESKey } from "../myCrypto";

function FriendList(props) {
	const chatCount = React.useRef(0);

	function handleClick(friend, AES_KEY) {
		console.log("AES key in handleClick: ", AES_KEY)
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
						<div key = {friend.username} onClick={() => {handleClick(friend.username, friend.AES_KEY)}} className="contact left-card">
							<div className="contact-name">{friend.name}</div>
							<div className="chat-preview">Conduction me mai F lag gaya</div>
						</div>
					)
				})
			}
		</>
	)
}

export default FriendList;