import React, { useState, useContext, useEffect } from 'react'
import RideContext from '../../context/ride/rideContext'

const RideForm = () => {
	const rideContext = useContext(RideContext)

	const { addRide, updateRide, clearCurrent, current } = rideContext

	useEffect(() => {
		if (current !== null) {
			setRide(current)
		} else {
			setRide({
				instructor: '',
				duration: '',
				output: '',
				mileage: '',
			})
		}
	}, [rideContext, current])

	const [ride, setRide] = useState({
		instructor: '',
		duration: '',
		output: '',
		mileage: '',
	})

	const { instructor, duration, output, mileage } = ride

	const onChange = e => setRide({ ...ride, [e.target.name]: e.target.value })

	const onSubmit = e => {
		e.preventDefault()
		if (current === null) {
			addRide(ride)
		} else {
			updateRide(ride)
		}
		clearAll()
	}

	const clearAll = () => {
		clearCurrent()
	}

	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary">{current ? 'Edit Ride' : 'Add Ride'}</h2>
			<input
				type="text"
				placeholder="Instructor"
				name="instructor"
				value={instructor}
				onChange={onChange}
			/>
			<input
				type="number"
				placeholder="Duration"
				name="duration"
				value={duration}
				onChange={onChange}
			/>
			<input
				type="number"
				placeholder="Output"
				name="output"
				value={output}
				onChange={onChange}
			/>
			<input
				type="number"
				name="mileage"
				placeholder="Mileage"
				value={mileage}
				onChange={onChange}
			/>
			<div>
				<input
					type="submit"
					value={current ? 'Update Ride' : 'Add Ride'}
					className="btn btn-primary btn-block"
				/>
			</div>
			{current && (
				<div>
					<button className="btn btn-light btn-block" onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	)
}

export default RideForm
