import React from "react";
import axios from "axios"
import { BASE_URL } from "../myEnv";
import MsgBox from "./MsgBox";

function Convo({currFriend, socket, sessionToken}) {
	const [msgs, setMsgs] = React.useState([]);
	const [arrivalMessage, setArrivalMessage] = React.useState();
	const scrollToBottom = React.useRef();

	React.useEffect(() => {
		//scroll the chats to the bottom when loaded
		const scrollDiv = scrollToBottom.current;
		scrollDiv.scrollTop = scrollDiv.scrollHeight;
	})

	React.useEffect(() => {
		if (socket.current) {
			socket.current.on('receive-msg', (msg) => {
				setArrivalMessage(msg);
			})
		}
	})

	React.useEffect(() => {
		if (arrivalMessage?.author === currFriend) {
			setMsgs(oldMsgs => [
				...oldMsgs,
				arrivalMessage
			])
		}
	}, [arrivalMessage])

	// React.useEffect(() => {
	// 	console.log("currFriend: (Convo)", currFriend)
	// 	if (socket.current) {
	// 		socket.current.on('receive-msg', msg => {
	// 			console.log("msg.author: (Convo)", msg.author)
	// 			if (msg.author == currFriend)  {
	// 				setMsgs(oldMsgs => [
	// 					...oldMsgs,
	// 					msg
	// 				])
	// 			}
	// 			console.log("msgs: ", msgs)
	// 		})
	// 	}
	// }, [])

	async function fetchMsgs() {
		console.log('currFriend: ', currFriend)
		try {
			const result = await axios.get(BASE_URL + "/exchMsg/" + currFriend, {
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
				<div className="scroll" ref={scrollToBottom}>
					<div className="convo-outer-container">
						{
							currFriend?
							msgs?.map(msg => 
								msg.author === currFriend?
								<div className="friend-msg" key={msg.id} >{msg.text}</div>
								:
								<div className="my-msg" key={msg.id} >{msg.text}</div>
							)
							:
							<div id="no-currFriend">Select a friend to chat</div>
						}
					</div>
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