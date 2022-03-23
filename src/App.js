import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alerts from './components/layout/Alerts'
import PrivateRoute from './components/routing/PrivateRoute'

import RideState from './context/ride/RideState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import setAuthToken from './utils/setAuthToken'
import './App.css'

if (localStorage.token) {
	setAuthToken(localStorage.token)
}

const App = () => {
	return (
		<AuthState>
			<RideState>
				<AlertState>
					<Router>
						<div className="App">
							<Navbar />
							<div className="container">
								<Alerts />
								<Routes>
									<Route exact path="/about" element={<About />} />
									<Route exact path="/register" element={<Register />} />
									<Route exact path="/login" element={<Login />} />
									<Route
										exact
										path="/"
										element={
											<PrivateRoute>
												<Home />
											</PrivateRoute>
										}
									/>
								</Routes>
							</div>
						</div>
					</Router>
				</AlertState>
			</RideState>
		</AuthState>
	)
}

export default App
