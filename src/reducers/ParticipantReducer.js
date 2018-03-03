import {
  PARTICIPANT_LOAD,
  PARTICIPANT_FETCH,
  GET_PARTICIPANTS_SUCCESS,
  PARTICIPANT_RATING,
  REFRESH_RATING,
  SET_PARTICIPANT_RATE_INITIAL,
  HANDLE_PARTICIPANT_DATA,
  HANDLE_RATING_DATA,
  GET_HAS_RATED,
  USER_HAS_RATED,
  ADD_RATING_TO_STORE,
  DELETE_PARTICIPANT,
  REMOVE_PARTICIPANT_RATING,
  UPDATE_HAS_PAID,
  CLEAR_PARTICIPANT_RATINGS,
  LOGOUT_PARTICIPANT
} from '../actions/types'

const INITIAL_STATE = {
  participants: null,
  rating: {},
  hasrated: null,
  participantsData: [],
  ratingData: [],
  windowopened: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PARTICIPANT_LOAD:
      return state
    case PARTICIPANT_FETCH:
      return { ...state }
    case GET_PARTICIPANTS_SUCCESS:
      return { ...state, participants: action.payload }
    case PARTICIPANT_RATING:
      let copyOfRatingObject = Object.assign({}, state.rating)
      copyOfRatingObject[ action.payload.id ] = action.payload.rating
      return { ...state, rating: copyOfRatingObject }
    case REFRESH_RATING:
      return { ...state, rating: action.payload }
    case HANDLE_PARTICIPANT_DATA:
      let newParticipantsData = []
      for (let i = 0; i < state.participants.length; i++) {
        if (state.participants[i].id !== action.payload.id && state.participants[i].accountant === false) {
          newParticipantsData.push(state.participants[i].first_name)
        }
      }
      return { ...state, participantsData: newParticipantsData }
    case HANDLE_RATING_DATA:
      return { ...state, ratingData: Number(Object.values(action.payload.rating)) }
    case GET_HAS_RATED:
      return { ...state, hasrated: action.payload.hasrated, participantsData: action.payload.participantsData, ratingData: action.payload.ratingData, windowopened: action.payload.windowopened, haspaid: action.payload.haspaid }
    case USER_HAS_RATED:
      return { ...state, hasrated: true }
    case ADD_RATING_TO_STORE:
      return { ...state }
    case DELETE_PARTICIPANT:
      let newParticipants = []
      for (let i = 0; i < state.participants.length; i++) {
        if (state.participants[i].id !== action.payload) {
          newParticipants.push(state.participants[ i ])
        }
      }
      return { ...state, participants: newParticipants }
    case UPDATE_HAS_PAID:
      return { ...state, haspaid: true }
    case CLEAR_PARTICIPANT_RATINGS:
      return { ...state, participants: null, rating: null }
    case LOGOUT_PARTICIPANT:
      return { ...INITIAL_STATE, rating: {} }
    default:
      return state
  }
}
