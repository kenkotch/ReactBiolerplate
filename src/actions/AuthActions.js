import firebase from 'firebase'
// import { AsyncStorage } from 'react-native'
// import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import URL from '../URL'

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
  LOGOUT,
  ADD_TO_STORE,
  GET_HAS_RATED,
  CHECK_USER,
  EMPLOYEE_LOGIN_SUCCESS
} from './types'

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const secondPasswordChanged = text => {
  return {
    type: SECOND_PASSWORD_CHANGED,
    payload: text
  }
}

export const newPassword = ({ password }) => {
  return (dispatch) => {
    const { currentUser } = firebase.auth()
    let newPass = password
    currentUser.updatePassword(newPass)
      .then(() => {
        dispatch({
          type: NEW_PASSWORD,
          payload: password
        })
        // AsyncStorage.removeItem(password)
        // .then(() => {
        // AsyncStorage.setItem("password", password)
        // })
      })
      .catch((error) => {})
  }
}

export const passwordMatchFail = () => {
  return { type: MATCH_PASSWORD }
}

// login user with email and password
export const loginUser = ({ email, password }) => {
  const url = `${URL}users/`
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })
    // current user sign in
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(data => {
        firebase.auth().currentUser.getIdToken(true)
          .then(idToken => {
            const user = data
            axios.get(`${url}${idToken}`)
              .then(res => {
                let { id, sphere_id, fname, lname, token, sphere_name, hasrated, participantsData, ratingData, accountant, windowopened, haspaid } = res.data
                // AsyncStorage.multiSet([
                // ["token", token],
                // ["email", email],
                // ["password", password]
                // ])
                loginUserSuccess(dispatch, id, sphere_id, token, fname, lname, sphere_name, user, password, hasrated, participantsData, ratingData, accountant, windowopened, haspaid)
              })
              .catch(error => loginUserFail(dispatch))
          })
          .catch(error => loginUserFail(dispatch))
      })
      .catch(error => loginUserFail(dispatch))
  }
}

// create new user with email and password, then login
export const signupUser = ({ email, password }) => {
  const url = `${URL}users/`
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => firebase.auth().currentUser.getIdToken(true)
        .then(idToken => {
          axios.post(url, {
            email: user.email,
            token: idToken
          })
            .then(res => {
              let { token, sphere_id, user, id } = res.data
              loginNewUserSuccess(dispatch, token, id, sphere_id, user, password)
            })
            .catch(error => loginUserFail(dispatch))
        })
        .catch(error => loginUserFail(dispatch)))
      .catch(() => loginUserFail(dispatch))
  }
}

const loginNewUserSuccess = (dispatch, token, id, sphere_id, sphere_name, user, password) => {
  dispatch({
    type: LOGIN_CREATE_USER_SUCCESS,
    payload: { token, id, sphere_id, user, password }
  })

  if (password === 'password') {
    // Actions.passwordChange()
  } else {
    // Actions.newUserInfoForm({ type: 'reset' })
  }
}

export const loginUserSuccess = (dispatch, id, sphere_id, userToken, fname, lname, sphere_name, user, password, hasrated, participantsData, ratingData, accountant, windowopened, haspaid) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: { id, sphere_id, userToken, user, password }
  })
  // dispatch from EmployeeFormReducer
  dispatch({
    type: EMPLOYEE_LOGIN_SUCCESS,
    payload: { fname, lname, sphere_name, accountant }
  })
  // dispatch from ParticipantReducer
  dispatch({
    type: GET_HAS_RATED,
    payload: { hasrated, participantsData, ratingData, windowopened, haspaid }
  })

  if (password === 'password') {
    // Actions.passwordChange()
  } else if (!accountant) {
    // Actions.home({ title: sphere_name })
  } else {
    // Actions.accountantHome({ title: sphere_name })
  }
}

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL })
}

export const addToStore = (token, email, password) => {
  return {
    type: ADD_TO_STORE,
    payload: { token, email, password }
  }
}

export const checkUser = () => {
  return {
    type: CHECK_USER
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT
  }
}
