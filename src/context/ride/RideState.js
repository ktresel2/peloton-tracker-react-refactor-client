import React, { useReducer } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import RideContext from './rideContext'
import rideReducer from './rideReducer'
import {
	GET_RIDES,
	ADD_RIDE,
	DELETE_RIDE,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_RIDE,
	FILTER_RIDES,
	CLEAR_RIDES,
	CLEAR_FILTER,
	RIDE_ERROR,
} from '../types'

const RideState = props => {
	const initialState = {
		rides: null,
		current: null,
		filtered: null,
		error: null,
	}

	const [state, dispatch] = useReducer(rideReducer, initialState)

	const getRides = async () => {
		try {
			const res = await axios.get(apiUrl + '/api/rides')

			dispatch({
				type: GET_RIDES,
				payload: res.data,
			})
		} catch (err) {
			dispatch({
				type: RIDE_ERROR,
				payload: err.response.msg,
			})
		}
	}

	const addRide = async ride => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		try {
			const res = await axios.post(apiUrl + '/api/rides', ride, config)

			dispatch({
				type: ADD_RIDE,
				payload: res.data,
			})
		} catch (err) {
			dispatch({
				type: RIDE_ERROR,
				payload: err.response.msg,
			})
		}
	}

	const deleteRide = async id => {
		try {
			await axios.delete(apiUrl + `/api/rides/${id}`)

			dispatch({
				type: DELETE_RIDE,
				payload: id,
			})
		} catch (err) {
			dispatch({
				type: RIDE_ERROR,
				payload: err.response.msg,
			})
		}
		dispatch({ type: DELETE_RIDE, payload: id })
	}

	const updateRide = async ride => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		try {
			const res = await axios.put(
				apiUrl + `/api/rides/${ride._id}`,
				ride,
				config
			)

			dispatch({
				type: UPDATE_RIDE,
				payload: res.data,
			})
		} catch (err) {
			dispatch({
				type: RIDE_ERROR,
				payload: err.response.msg,
			})
		}
	}

	const clearRides = () => {
		dispatch({ type: CLEAR_RIDES })
	}

	const setCurrent = ride => {
		dispatch({ type: SET_CURRENT, payload: ride })
	}

	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT })
	}

	const filterRides = text => {
		dispatch({ type: FILTER_RIDES, payload: text })
	}

	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER })
	}

	return (
		<RideContext.Provider
			value={{
				rides: state.rides,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				getRides,
				addRide,
				deleteRide,
				clearRides,
				setCurrent,
				clearCurrent,
				updateRide,
				filterRides,
				clearFilter,
			}}
		>
			{props.children}
		</RideContext.Provider>
	)
}

export default RideState
