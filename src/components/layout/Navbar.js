import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from './../../context/auth/authContext'
import RideContext from './../../context/ride/rideContext'

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext)
	const rideContext = useContext(RideContext)

	const { user, isAuthenticated, logout } = authContext
	const { clearRides } = rideContext

	const onLogout = () => {
		logout()
		clearRides()
	}
	const authLinks = (
		<Fragment>
			<li>Hello, {user && user.name}</li>
			<li>
				<a onClick={onLogout}>
					<i className="fas fa-sign-out-alt">
						<span className="hide-sm">Logout</span>
					</i>
				</a>
			</li>
		</Fragment>
	)

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</Fragment>
	)

	return (
		<div className="navbar bg-primary">
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	)
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
}

Navbar.defaultProps = {
	title: 'Peloton Tracker',
	icon: 'fas fa-id-card-alt',
}

export default Navbar
