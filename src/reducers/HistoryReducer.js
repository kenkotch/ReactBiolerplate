import {
  GET_HISTORY,
  CLEAR_HISTORY
} from '../actions/types'

const INITIAL_STATE = {
  history: null,
  uniqueDates: null,
  latest: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_HISTORY:
      return { ...state, history: action.payload.data, uniqueDates: action.payload.uniqueDates, latest: action.payload.latest }
    case CLEAR_HISTORY:
      return { ...state, history: [], uniqueDates: [], latest: null }
    default:
      return state
  }
}
