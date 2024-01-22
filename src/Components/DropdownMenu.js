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
				<div className="blank-notif">If your are connected via Vercel, live messaging won't work. Run this on a local machine to support Live Messaging.</div>
			</div>
			<div className="divider"></div>
			<div onClick={() => {
				localStorage.setItem('sessionToken', null);
				localStorage.setItem('secKey', null);
				props.setSessionToken('');
			}} className="logout-button">Log Out</div>
		</div>
	)
}

export default DropdownMenu