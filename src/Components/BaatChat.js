import React from "react";
import AddButton from "./AddButton";
import "../css/chat.css"

function BaatChat(props) {
	const [myFriends, setMyFriends] = React.useState([])
	const chatCount = React.useRef(0);
	return (
		<div className="container-outer">
			<div className="container-inner">
				<div className="left"> {/* this div would contain the contact list */}
					<div className="left-header left-card">
						<div className="left-header-text">All Chats</div>
						<AddButton sessionToken = {props.sessionToken} myFriends = {myFriends} setMyFriends = {setMyFriends} />
					</div>
					{
						myFriends.map((friend) => {
							chatCount.current += 1
							return (
								<div key={chatCount.current}  className="contact left-card">
									<div className="contact-name">{friend.name}</div>
									<div className="chat-preview">Conduction me mai F lag gaya</div>
								</div>
							)
						})
					}
					<div className="contact left-card">
						<div className="contact-name">Yogesh Banshiwal</div>
						<div className="chat-preview">Conduction me mai F lag gaya</div>
					</div>
					<div className="contact left-card">
						<div className="contact-name">Indraji Kuli</div>
						<div className="chat-preview">Now I admit. Windows>>>Mac</div>
					</div>
					<div className="contact left-card">
						<div className="contact-name">Sanat Tudu</div>
						<div className="chat-preview">Chal sting pilata hu</div>
					</div>
					<div className="contact left-card">
						<div className="contact-name">Satish Kumar Oraon</div>
						<div className="chat-preview">Mera hoodie dekha h</div>
					</div>
				</div>
				<div className="right"> {/*This div would display the chat for a given contact.*/}
					This is where the chat would appear
				</div>
			</div>
		</div>
	)
}

export default BaatChat;