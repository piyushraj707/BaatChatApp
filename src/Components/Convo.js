import React from "react";
import axios from "axios"
import MsgBox from "./MsgBox";

const demoChat = [
	{
		author: 'kuli',
		timestamp: 1,
		text: "Hey!!!"
	},
	{
		author: 'piyushraj707',
		timestamp: 2,
		text: "Hello!"
	},
	{
		author: 'kuli',
		timestamp: 3,
		text: "How are you?"
	},
	{
		author: 'piyushraj707',
		timestamp: 4,
		text: 'Ya I am fine.'
	},
	{
		author: 'kuli',
		timestamp: 5,
		text: 'Just wanted to tell you that you are fucked up!'
	},
	{
		author: 'kuli',
		timestamp: 5,
		text: 'Your professor was telling me that you have performed so bad in your exam.'
	},
	{
		author: 'kuli',
		timestamp: 5,
		text: 'Meet him as soon as possible'
	},
	{
		author: 'piyushraj707',
		timestamp: 1,
		text: '😭😭😭'
	},
	{
		author: 'piyushraj707',
		timestamp: 1,
		text: 'Thanks for telling me!'
	}
]

function Convo({currFriend, sessionToken}) {
	const [msgs, setMsgs] = React.useState([]);

	async function fetchMsgs() {
		// return;
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
					sessionToken = {sessionToken}
				/>
			}
		</div>
	)
}

export default Convo;