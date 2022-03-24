import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import RideContext from '../../context/ride/rideContext'

const RideItem = ({ ride }) => {
	const rideContext = useContext(RideContext)
	const { deleteRide, setCurrent, clearCurrent } = rideContext

	const { _id, instructor, duration, output, mileage, date } = ride

	const onDelete = () => {
		deleteRide(_id)
		clearCurrent()
	}

	return (
		<div className="card bg-light">
			<h3 className="text-primary text-left">{instructor} </h3>
			<ul className="list">
				{duration && (
					<li>
						<i className="fas fa-envelope-open"></i>
						{duration}
					</li>
				)}
				{output && (
					<li>
						{/* <i className="fas fa-output"></i> */}
						{output}
					</li>
				)}
				{mileage && (
					<li>
						{/* <i className="fas fa-output"></i> */}
						{mileage}
					</li>
				)}
				{date && (
					<li>
						{/* <i className="fas fa-output"></i> */}
						{date}
					</li>
				)}
			</ul>
			<p>
				<button
					className="btn btn-dark btn-sm"
					onClick={() => setCurrent(ride)}
				>
					Edit
				</button>
				<button className="btn btn-danger btn-sm" onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	)
}

RideItem.propTypes = {
	ride: PropTypes.object.isRequired,
}

export default RideItem
