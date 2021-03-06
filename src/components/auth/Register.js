import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from './../../context/alert/alertContext'
import AuthContext from './../../context/auth/authContext'

const Register = props => {
	const alertContext = useContext(AlertContext)
	const authContext = useContext(AuthContext)
	let navigate = useNavigate()

	const { setAlert } = alertContext
	const { register, error, clearErrors, isAuthenticated } = authContext

	useEffect(() => {
		if (isAuthenticated) {
			return navigate('/')
		}
		if (error === 'User already exists') {
			setAlert(error, 'danger')
			clearErrors()
		}
	}, [error, isAuthenticated, props.history])

	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
	})

	const { username, email, password, password2 } = user

	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const onSubmit = e => {
		e.preventDefault()
		if (!username || !email || !password) {
			setAlert('All fields are required', 'danger')
		} else if (password !== password2) {
			setAlert('Passwords do not match', 'danger')
			clearErrors()
		}
		register({
			username,
			email,
			password,
		})
	}

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Register</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Username</label>
					<input
						type="text"
						name="username"
						value={username}
						onChange={onChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email Address</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={onChange}
						required
						minLength="6"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password2">Confirm Password</label>
					<input
						type="password"
						name="password2"
						value={password2}
						onChange={onChange}
						required
					/>
				</div>
				<input
					type="submit"
					value="Register"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	)
}

export default Register
