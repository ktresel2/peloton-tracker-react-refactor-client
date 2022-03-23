import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import RideItem from './RideItem'
import Spinner from '../layout/Spinner'
import RideContext from '../../context/ride/rideContext'

const Rides = () => {
	const rideContext = useContext(RideContext)

	const { rides, filtered, getRides, loading } = rideContext

	useEffect(() => {
		getRides()
	}, [])

	if (rides !== null && rides.length === 0 && !loading) {
		return <h4>Please add a ride</h4>
	}

	return (
		<Fragment>
			{rides && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map(ride => (
								<CSSTransition timeout={1000} classNames="item" key={ride._id}>
									<RideItem ride={ride} />
								</CSSTransition>
						  ))
						: rides.map(ride => (
								<CSSTransition timeout={100} classNames="item" key={ride._id}>
									<RideItem ride={ride} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	)
}

export default Rides
