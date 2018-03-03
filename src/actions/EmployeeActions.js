import firebase from 'firebase'
import axios from 'axios'
// import { Actions } from 'react-native-router-flux'
import URL from '../URL'
import {
  NEW_USER,
  FNAME_CHANGED,
  LNAME_CHANGED,
  SPHERE_CHANGED,
  NEW_EMAIL_CHANGED,
  LOGOUT_EMPLOYEE,
  LOGIN_NEW_USER_SUCCESS,
  LOGIN_CREATE_USER_SUCCESS,
  ADD_SPHERE_ID
} from './types'


// new user signup
export const addNewUser = ({ fname, lname, token, sphere_name }) => {
  const url = `${URL}users/addname/`
  return (dispatch) => {
    axios.post(url, {
      first_name: fname,
      last_name: lname,
      sphere_name,
      token
    })
      .then(res => {
        let { fname, lname, sphere_name, sphere_id, token } = res.data
        addNameSuccess(dispatch, fname, lname, sphere_name, sphere_id, token)
      })
      .catch(error => console.error(error))
  }
}

// new user signup helper
export const addNameSuccess = (dispatch, fname, lname, sphere_name, sphere_id, token) => {
  dispatch({
    type: ADD_SPHERE_ID,
    payload: sphere_id
  })
  // Actions.home({ title: sphere_name })
}

export const invitedUserAddName = ({ fname, lname, id, token, sphere_name, sphere_id, accountant }) => {
  const url = `${URL}users/invitedaddname/`
  return (dispatch) => {
    axios.post(url, {
      first_name: fname,
      last_name: lname,
      id,
      token
    })
      .then(res => {
        addInvitedSuccess(dispatch, fname, lname, sphere_name, sphere_id, accountant)
      })
      .catch(error => console.error(error))
  }
}

// invitedUserAddName helper
export const addInvitedSuccess = (dispatch, fname, lname, sphere_name, sphere_id, accountant) => {
  dispatch({
    type: LOGIN_NEW_USER_SUCCESS
  })
  if (!accountant) {
    // Actions.home({ title: sphere_name })
  } else {
    // Actions.accountantHome({ title: sphere_name })
  }
}

export const fNameChanged = (text) => {
  return {
    type: FNAME_CHANGED,
    payload: text
  }
}

export const lNameChanged = (text) => {
  return {
    type: LNAME_CHANGED,
    payload: text
  }
}

export const updateUserName = (fname, lname, id, token, accountant, sphere_name) => {
  const url = `${URL}users/updateUserName/`
  return (dispatch) => {
    axios.post(url, {
      first_name: fname,
      last_name: lname,
      id,
      token
    })
      .then(res => {
        if (!accountant) {
          // Actions.home({ title: sphere_name })
        } else {
          // Actions.accountantHome({ title: sphere_name })
        }
      })
  }
}

export const sphereChanged = (text) => {
  return {
    type: SPHERE_CHANGED,
    payload: text
  }
}

export const newEmailChanged = (text) => {
  return {
    type: NEW_EMAIL_CHANGED,
    payload: text
  }
}

export const logoutEmployee = () => {
  return {
    type: LOGOUT_EMPLOYEE
  }
}
