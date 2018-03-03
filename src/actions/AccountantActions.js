import firebase from 'firebase'
import axios from 'axios'
import URL from '../URL'

import {
  GET_RATING_AVERAGE_SUCCESS,
  DOLLAR_CHANGED,
  TOTAL_RATED,
  PAYOUT_AMOUNT,
  LOCK_PAYOUTS,
  UPDATE_HAS_PAID
} from './types'

export const getRatingAverages = ({ sphere_id, token }) => {
  const url = `${URL}users/averagerating/${token}`
  return async(dispatch) => {
    axios.post(url, {
      sphere_id,
      token
    })
      .then(res => getRatingAveragesSuccess(dispatch, res.data))
  }
}

const getRatingAveragesSuccess = (dispatch, data) => {
  dispatch({
    type: GET_RATING_AVERAGE_SUCCESS,
    payload: data
  })
}

export const dollarChanged = dollar => {
  return {
    type: DOLLAR_CHANGED,
    payload: +dollar
  }
}

export const totalRated = participantsAvg => {
  let sum = 0
  for (let i = 0; i < participantsAvg[1].length; i++) {
    sum += +participantsAvg[1][i]
  }
  return {
    type: TOTAL_RATED,
    payload: sum
  }
}

export const payoutAmount = (participantsAvg, ratingsTotal, dollarAmount) => {
  let toPay = []
  // for each person, avg rating / ratings total * dollar entered rounded to 2 places
  for (let i = 0; i < participantsAvg[1].length; i++) {
    toPay.push(+((+participantsAvg[1][i] / ratingsTotal) * dollarAmount).toFixed(2))
  }
  return {
    type: PAYOUT_AMOUNT,
    payload: toPay
  }
}

export const lockPayouts = (id, token, participantsAvg) => {
  const url = `${URL}users/lockpayouts/`
  return (dispatch) => {
    axios.post(url, {
      id,
      user_id: participantsAvg[3],
      token,
      money_paid: participantsAvg[2],
      average_rating: participantsAvg[1]
    })
      .then(res => updateHasPaid(dispatch, res.data[0]))
  }
}

const updateHasPaid = (dispatch, haspaid) => {
  dispatch({
    type: UPDATE_HAS_PAID,
    payload: haspaid
  })
}
