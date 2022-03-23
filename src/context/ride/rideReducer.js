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

export default (state, action) => {
	switch (action.type) {
		case GET_RIDES:
			return {
				...state,
				rides: action.payload,
				loading: false,
			}
		case ADD_RIDE:
			return {
				...state,
				rides: [action.payload, ...state.rides],
				loading: false,
			}
		case UPDATE_RIDE:
			return {
				...state,
				rides: state.rides.map(ride =>
					ride._id === action.payload._id ? action.payload : ride
				),
				loading: false,
			}
		case DELETE_RIDE:
			return {
				...state,
				rides: state.rides.filter(ride => ride._id !== action.payload),
				loading: false,
			}
		case CLEAR_RIDES:
			return {
				...state,
				rides: null,
				filtered: null,
				error: null,
				current: null,
			}
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			}
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			}
		case FILTER_RIDES:
			return {
				...state,
				filtered: state.rides.filter(ride => {
					const regex = new RegExp(`${action.payload}`, 'gi')
					return ride.name.match(regex) || ride.email.match(regex)
				}),
			}
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			}
		case RIDE_ERROR:
			return {
				...state,
				error: action.payload,
			}
		default:
			return state
	}
}
