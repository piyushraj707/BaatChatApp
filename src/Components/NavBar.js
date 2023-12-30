import React from "react";
import DropdownMenu from './DropdownMenu.js'
import '../css/navbar.css'
import { Link } from "react-router-dom";

function NavBar(props) {
	const [notif, setNotif] = React.useState(false);
	return (
		<div className="navbar-outer">
			<div className="navbar-inner">
				<div className="navbar-content-left">
					<img className="logo-img" alt="Logo" src='./logo.png' />
					<div className="logo-name">BaatChat App</div>
				</div>
				{props.currUser?
					<div className="navbar-content-right">
						<div onClick={() => {setNotif(!notif)}} className="navbar-profile">
							{props.currUser.name}
							{
								notif && <DropdownMenu currUser = {props.currUser} setSessionToken = {props.setSessionToken} />
							}
						</div>
						{/* <div onClick={() => {props.setSessionToken('')}}>Logout</div> */}
					</div>
					:
					<div className="navbar-content-right">
						<Link className="navbar-content-right-login" to="/login">Join for Free</Link>
					</div>
				}
			</div>
		</div>
	)
}

export default NavBar;