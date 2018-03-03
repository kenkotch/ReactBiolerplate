import {
  // FNAME_CHANGED_NEW_PARTICIPANT,
  // LNAME_CHANGED_NEW_PARTICIPANT,
  EMAIL_CHANGED_NEW_PARTICIPANT,
  ACCOUNTANT_CHANGED_NEW_PARTICIPANT,
  CREATE_SUCCEEDED,
  LOGOUT_NEW_PARTICIPANT
} from '../actions/types'

const INITIAL_STATE = {
  emailNewParticipant: '',
  accountant: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED_NEW_PARTICIPANT:
      return { ...state, emailNewParticipant: action.payload }
    case ACCOUNTANT_CHANGED_NEW_PARTICIPANT:
      return { ...state, accountant: action.payload }
    case CREATE_SUCCEEDED:
      return state // INITIAL_STATE
    case LOGOUT_NEW_PARTICIPANT:
      return INITIAL_STATE
    default:
      return state
  }
}
