import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  SECOND_PASSWORD_CHANGED,
  NEW_PASSWORD,
  MATCH_PASSWORD,
  LOGIN_USER_SUCCESS,
  LOGIN_NEW_USER_SUCCESS,
  LOGIN_CREATE_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  ADD_SPHERE_ID,
  ADD_TO_STORE,
  LOGOUT
} from '../actions/types'

const INITIAL_STATE = {
  email: '',
  password: '',
  secondPassword: '',
  id: null,
  token: null,
  error: '',
  sphere_id: null,
  loading: false,
  user: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload }
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, error: '' }
    case SECOND_PASSWORD_CHANGED:
      return { ...state, secondPassword: action.payload, error: '' }
    case NEW_PASSWORD:
      return { ...state, password: action.payload }
    case MATCH_PASSWORD:
      return { ...state, error: 'Passwords Must Match', password: '', secondPassword: '' }
    case LOGIN_USER:
      return { ...state, loading: true, error: '' }
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, id: action.payload.id, sphere_id: action.payload.sphere_id, token: action.payload.userToken, user: action.payload.user, password: action.payload.password }
    case LOGIN_NEW_USER_SUCCESS:
      return { ...state, loading: false }
    case LOGIN_CREATE_USER_SUCCESS:
      return { ...state, loading: false, sphere_id: action.payload.sphere_id, user: action.payload.user, token: action.payload.token, id: action.payload.id }
    case ADD_SPHERE_ID:
      return { ...state, sphere_id: action.payload }
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', secondPassword: '', loading: false }
    case ADD_TO_STORE:
      return { ...state, token: action.payload.token, email: action.payload.email, password: action.payload.password }
    case LOGOUT:
      return { ...state, ...INITIAL_STATE }
    default:
      return state
  }
}
