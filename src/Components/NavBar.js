import React from "react";
import '../css/navbar.css'
import { Link } from "react-router-dom";

function NavBar(props) {
	return (
		<div className="navbar-outer">
			<div className="navbar-inner">
				<div className="navbar-content-left">
					<img className="logo-img" alt="Logo" src='./logo.png' />
					<div className="logo-name">BaatChat App</div>
				</div>
				<div className="navbar-content-right">
					{props.currUser?
					<div>{props.currUser.name}</div>
					:
					<Link className="navbar-content-right-login" to="/signup">Join for Free</Link>
					}
				</div>
			</div>
		</div>
	)
}

export default NavBar;