import React, { useEffect, useContext, useRef } from 'react'
import RideContext from './../../context/ride/rideContext'

const RideFilter = () => {
	const rideContext = useContext(RideContext)
	const text = useRef()

	const { filterRides, clearFilter, filtered } = rideContext

	useEffect(() => {
		if (filtered === null) {
			text.current.value = ''
		}
	})

	const onChange = e => {
		if (text.current.value !== '') {
			filterRides(e.target.value)
		} else {
			clearFilter()
		}
	}

	return (
		<form>
			<input
				ref={text}
				type="text"
				placeholder="Filter Rides..."
				onChange={onChange}
			/>
		</form>
	)
}

export default RideFilter
