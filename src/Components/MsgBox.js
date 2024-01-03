import React from "react";
import axios from "axios";

function MsgBox({setMsgs, currFriend, sessionToken}) {
	const [text, setText] = React.useState("")
	
	function handleSendMsg(event) {
		event?.preventDefault();
		if (!text) return;
		axios.post('http://localhost:3002/exchMsg/', {
			friend: currFriend,
			text: text
		}, {
			headers: {
				Authorization: 'Bearer ' + sessionToken
			}
		})
		.then(res => {
			setMsgs(oldVal => [...oldVal, {
				author: 'me',
				timestamp: 1,
				text: text
			}])
			setText('')
		})
		.catch(err => {
			console.log("There was an error sending the msg.")
		})
	}

	return (
		<div className="msg-outer-container">
			<form onSubmit={handleSendMsg} className="msg-form">
				<input
					id="someInput"
					className="msg-input"
					placeholder="Type your message here"
					type="text"
					value={text}
					onChange={(event) => {setText(event.target.value)}}
				/>
				<div onClick={handleSendMsg} className="send-button">
					<div className="send-button-bar-1"></div>
					<div className="send-button-bar-2"></div>
				</div>
			</form>
		</div>
	)
}

export default MsgBox