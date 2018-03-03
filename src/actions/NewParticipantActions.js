import firebase from 'firebase'
import axios from 'axios'
// import { Actions } from 'react-native-router-flux'
// import sendEmail from './AuthActions'
import URL from '../URL'
import {
  EMAIL_CHANGED_NEW_PARTICIPANT,
  ACCOUNTANT_CHANGED_NEW_PARTICIPANT,
  CREATE_SUCCEEDED,
  LOGIN_USER,
  LOGOUT_NEW_PARTICIPANT
} from './types'

export const emailChangedNewParticipant = (text) => {
  return {
    type: EMAIL_CHANGED_NEW_PARTICIPANT,
    payload: text
  }
}

export const accountantChangedNewParticipant = (boolean) => {
  return {
    type: ACCOUNTANT_CHANGED_NEW_PARTICIPANT,
    payload: boolean
  }
}

export const createParticipant = ({ emailNewParticipant, sphere_id, sphere_name, accountant }) => {
  const url = `${URL}users/newparticipant/`
  const password = 'password'
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })

    firebase.auth().createUserWithEmailAndPassword(emailNewParticipant, password)
      .then(user => firebase.auth().currentUser.getIdToken(true)
        .then(idToken => {
          axios.post(url, {
            email: emailNewParticipant,
            token: idToken,
            sphere_id,
            sphere_name,
            accountant
          })
            .then(() => {
              createParticipantSuccess(dispatch, sphere_name)
            })
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error)))
      .catch(error => console.error(error))
  }
}

// new user add helper
export const createParticipantSuccess = (dispatch) => {
  dispatch({
    type: CREATE_SUCCEEDED
  })
  // Actions.home()
}

// send email verification - not using?
const sendEmail = () => {
  const newUser = firebase.auth().currentUser
  newUser.sendEmailVerification().then(() => {
    // Email sent
    return {
      type: "EMAIL_SENT_SUCCEEDED",
      payload: true
    }
  }).catch((error) => {
    return {
      type: "EMAIL_SENT_FAILED",
      payload: error
    }
  })
}

export const logoutNewParticipant = () => {
  return {
    type: LOGOUT_NEW_PARTICIPANT
  }
}
