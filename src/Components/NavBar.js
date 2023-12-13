import React from "react";
import '../css/navbar.css'
import { Link } from "react-router-dom";

function NavBar() {
	return (
		<div className="navbar-outer">
			<div className="navbar-inner">
				<div className="navbar-content-left">
					<img className="logo-img" src='./logo.png' />
					<div className="logo-name">BaatChat App</div>
				</div>
				<div className="navbar-content-right">
					<Link className="navbar-content-right-login" to="/signup">Join for Free</Link>
				</div>
			</div>
		</div>
	)
}

export default NavBar;