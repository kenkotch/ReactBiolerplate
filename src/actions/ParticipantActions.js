import firebase from 'firebase'
import axios from 'axios'
import URL from '../URL'

import {
  PARTICIPANT_LOAD,
  PARTICIPANT_FETCH,
  GET_PARTICIPANTS_SUCCESS,
  SET_PARTICIPANT_RATE_INITIAL,
  HANDLE_PARTICIPANT_DATA,
  HANDLE_RATING_DATA,
  PARTICIPANT_RATING,
  REFRESH_RATING,
  GET_HAS_RATED,
  USER_HAS_RATED,
  ADD_RATING_TO_STORE,
  DELETE_PARTICIPANT,
  CLEAR_PARTICIPANT_RATINGS,
  LOGOUT_PARTICIPANT
} from './types'

export const getParticipantsList = ({ sphere_id, token, id }) => {
  const url = `${URL}users/list/${token}`
  return async(dispatch) => {
    axios.post(url, {
      sphere_id,
      token
    })
      .then(res => {
        getParticipantsSuccess(dispatch, res.data, id)
      })
  }
}

const getParticipantsSuccess = (dispatch, res) => {
  dispatch({
    type: GET_PARTICIPANTS_SUCCESS,
    payload: res
  })
}

export const handleRefreshPull = ({ sphere_id, token, id, rating }) => {
  const url = `${URL}users/list/${token}`
  let parts
  return async(dispatch) => {
    axios.post(url, {
      sphere_id,
      token
    })
      .then(res => {
        parts = res.data
        getParticipantsSuccess(dispatch, res.data, id)
      })
      .then(() => {
        makeRates2(id, parts, rating, dispatch)
      })
  }
}

const makeRates2 = (id, parts, rating, dispatch) => {
  // if there are participants, filter out logged in user and set initial rating of others to 5
  if (parts) {
    let participantsFiltered = []
    for (let i = 0; i < parts.length; i++) {
      if (parts[ i ].id !== id && parts[i].accountant === false) {
        participantsFiltered.push(parts[ i ])
      }
    }
    let rates = {}
    participantsFiltered.map(users => rates[ users.id ] = 5)
    return dispatch({
      type: REFRESH_RATING,
      payload: rates
    })
  }
}

export const participantRatingChange = ({ id, rating }) => {
  return {
    type: PARTICIPANT_RATING,
    payload: { id, rating }
  }
}

export const sendRatingsToDataBase = ({ rating, id, token }) => {
  const url = `${URL}users/sendrate`

  return (dispatch) => {
    axios.post(url, {
      rating,
      token,
      id
    })
      .catch(error => console.error(error))
  }
}

export const handleParticipantsData = ({ participants, id }) => {
  return {
    type: HANDLE_PARTICIPANT_DATA,
    payload: { participants, id }
  }
}

export const handleRatingData = ({ rating, id }) => {
  return {
    type: HANDLE_RATING_DATA,
    payload: { rating, id }
  }
}

export const deleteParticipant = (deleteId, id, rating, participants) => {
  const url = `${URL}users/delete/${deleteId}`
  return dispatch => {
    axios.delete(url, {
      id: deleteId
    })
      .catch(error => console.error(error))
      .then(res => {
        return dispatch({
          type: DELETE_PARTICIPANT,
          payload: deleteId
        })
      })
      .then(res => {
        if (participants.length > 0) {
          let participantsFiltered = []
          for (let i = 0; i < participants.length; i++) {
            if (participants[i].id !== id &&
              participants[i].id !== deleteId &&
              participants[i].accountant === false) {
              participantsFiltered.push(participants[i])
            }
          }
          let rates = {}
          participantsFiltered.map(users => rates[users.id] = 5)
          return dispatch({
            type: REFRESH_RATING,
            payload: rates
          })
        }
      })
  }
}

export const userHasRated = () => {
  return {
    type: USER_HAS_RATED
  }
}

export const addRatingToStore = (dispatch, data) => {
  dispatch({
    type: ADD_RATING_TO_STORE,
    payload: data
  })
}

export const clearParticipantRatings = () => {
  return { type: CLEAR_PARTICIPANT_RATINGS }
}

export const logoutParticipantList = () => {
  return {
    type: LOGOUT_PARTICIPANT
  }
}
