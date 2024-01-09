import React from "react";
import AddButton from "./AddButton";
import FriendList from "./friendList";
import Convo from "./Convo";
import "../css/chat.css"

function BaatChat(props) {
	const [myFriends, setMyFriends] = React.useState([])
	const [currFriend, setCurrFriend] = React.useState('')

	return (
		<div className="container-outer">
			<div className="container-inner">
				<div className="left"> {/* this div would contain the contact list */}
					<div className="left-header left-card">
						<div className="left-header-text">All Chats</div>
						<AddButton
							sessionToken = {props.sessionToken}
							myFriends = {myFriends}
							setMyFriends = {setMyFriends}
						/>
					</div>
					<FriendList 
						myFriends = {myFriends}
						setMyFriends = {setMyFriends}
						sessionToken = {props.sessionToken}
						setCurrFriend = {setCurrFriend}
					/>
				</div>
				<Convo
					currFriend = {currFriend}
					socket = {props.socket}
					sessionToken = {props.sessionToken}
				/>
			</div>
		</div>
	)
}

export default BaatChat;