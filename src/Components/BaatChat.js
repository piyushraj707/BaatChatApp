import React from "react";
import AddButton from "./AddButton";
import FriendList from "./friendList";
import Convo from "./Convo";
import {useNavigate} from "react-router-dom"
import "../css/chat.css"

function BaatChat(props) {
	const [myFriends, setMyFriends] = React.useState([])
	const [currFriend, setCurrFriend] = React.useState('')
	const navTo = useNavigate();

	React.useEffect(() => {
		if (!props.currUser) navTo("/login")
	}, [props.currUser])

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