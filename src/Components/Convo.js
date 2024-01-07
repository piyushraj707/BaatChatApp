import React from "react";
import axios from "axios"
import MsgBox from "./MsgBox";

function Convo({currFriend, socket, sessionToken}) {
	const [msgs, setMsgs] = React.useState([]);

	React.useEffect(() => {
		if (socket.current) {
			socket.current.on('receive-msg', msg => {
				setMsgs(oldMsgs => [
					...oldMsgs,
					msg
				])
				console.log("msg received (Convo): ", msg)
			})
		}
	}, [socket.current])

	async function fetchMsgs() {
		try {
			const result = await axios.get("http://localhost:3002/exchMsg/" + currFriend, {
				headers: {
					Authorization: 'Bearer ' + sessionToken
				}
			});
			setMsgs(result.data);
		}
		catch {
			console.log("There was no msg")
		}
	}

	React.useEffect(() => {
		setMsgs([])
		if (currFriend) fetchMsgs();
	}, [currFriend]);

	return (
		<div className="right">
			<div className="convo-outer-container">
				{
					currFriend?
					msgs?.map(msg => 
						msg.author === currFriend?
						<div className="friend-msg">{msg.text}</div>
						:
						<div className="my-msg">{msg.text}</div>
					)
					:
					<div id="no-currFriend">Select a friend to chat</div>
				}
			</div>
			{
				currFriend &&
				<MsgBox
					setMsgs = {setMsgs}
					currFriend = {currFriend}
					socket = {socket}
					sessionToken = {sessionToken}
				/>
			}
		</div>
	)
}

export default Convo;