import React from "react";

function MsgBox({setMsgs, currFriend, socket, sessionToken}) {
	const [text, setText] = React.useState("")
	
	function handleSendMsg(event) {
		event?.preventDefault();
		if (!text) return;
		setMsgs(oldVal => [...oldVal, {
			author: 'me',
			timestamp: 1,
			text: text
		}])
		socket.current?.emit('send-msg', {
			friend: currFriend,
			text: text
		})
		
		setText('')
		return;
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