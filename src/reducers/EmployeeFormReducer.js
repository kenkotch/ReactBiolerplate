import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_FIRE,
  NEW_USER,
  FNAME_CHANGED,
  LNAME_CHANGED,
  SPHERE_CHANGED,
  NEW_EMAIL_CHANGED,
  GET_SPHERE_NAME,
  ADD_NAME_SUCCESS,
  LOGOUT_EMPLOYEE
} from '../actions/types'

const INITIAL_STATE = {
  fname: '',
  lname: '',
  sphere_name: '',
  accountant: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_USER:
      return { ...state }
    case FNAME_CHANGED:
      return { ...state, fname: action.payload }
    case LNAME_CHANGED:
      return { ...state, lname: action.payload }
    case SPHERE_CHANGED:
      return { ...state, sphere_name: action.payload }
    case NEW_EMAIL_CHANGED:
      return { ...state, email: action.payload }
    case EMPLOYEE_LOGIN_SUCCESS:
      return { ...state, fname: action.payload.fname, lname: action.payload.lname, sphere_name: action.payload.sphere_name, accountant: action.payload.accountant }
    case LOGOUT_EMPLOYEE:
      return { ...state, ...INITIAL_STATE }
    default:
      return state
  }
}
