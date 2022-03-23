import React, { useContext, useEffect } from 'react'
import Rides from './../rides/Rides'
import RideForm from './../rides/RideForm'
import RideFilter from './../rides/RideFilter'
import AuthContext from './../../context/auth/authContext'

const Home = () => {
	const authContext = useContext(AuthContext)

	useEffect(() => {
		authContext.loadUser()
	}, [])

	return (
		<div className="grid-2">
			<div>
				<RideForm />
			</div>
			<div>
				<RideFilter />
				<Rides />
			</div>
		</div>
	)
}

export default Home
