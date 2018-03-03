import {
  GET_RATING_AVERAGE_SUCCESS,
  DOLLAR_CHANGED,
  TOTAL_RATED,
  PAYOUT_AMOUNT,
  LOCK_PAYOUTS
} from '../actions/types'

const INITIAL_STATE = {
  participantsAvg: [],
  dollarAmount: null,
  ratingsTotal: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RATING_AVERAGE_SUCCESS:
      return { ...state, participantsAvg: action.payload }
    case DOLLAR_CHANGED:
      return { ...state, dollarAmount: action.payload }
    case TOTAL_RATED:
      return { ...state, ratingsTotal: action.payload }
    case PAYOUT_AMOUNT:
      return {
        ...state,
        participantsAvg: {
          ...state.participantsAvg,
          2: action.payload
        }
      }
    case LOCK_PAYOUTS:
      return { ...state }
    default:
      return state
  }
}
