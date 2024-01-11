import React from "react";
import axios from "axios";
import { BASE_URL } from "../myEnv";

function FriendList(props) {
	const chatCount = React.useRef(0);

	function handleClick(friend) {
		props.setCurrFriend(friend)
	}
	
	async function fetchFriendList() {
		try {
			const result = await axios.get(BASE_URL + "/addfriend/myfriends", {
				headers: {
					Authorization: 'Bearer ' + props.sessionToken
				}
			})
			props.setMyFriends(result.data)
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
						<div key = {friend.username} onClick={() => {handleClick(friend.username)}} className="contact left-card">
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