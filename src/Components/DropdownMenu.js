// import react from "react"
import '../css/drop-down-menu.css'

function DropdownMenu (props) {
	return (
		<div className="menu-container">
			<div className="name">{props.currUser.name}</div>
			<div className="divider"></div>
			<div className="username">{props.currUser.username}</div>
			<div className="email">{props.currUser.email}</div>
			<div className="divider"></div>
			<div className="notifications">
				<div className="blank-notif">No New Notifications</div>
			</div>
			<div className="divider"></div>
			<div onClick={() => {props.setSessionToken('')}} className="logout-button">Log Out</div>
		</div>
	)
}

export default DropdownMenu