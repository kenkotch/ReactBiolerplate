import firebase from 'firebase'
import axios from 'axios'
import URL from '../URL'
import {
  GET_HISTORY,
  CLEAR_HISTORY
} from './types'


// new user signup
export const getHistory = (sphere_id) => {
  const url = `${URL}users/history/`
  return (dispatch) => {
    axios.post(url, {
      sphere_id
    })
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].created_at = +res.data[i].created_at.slice(0, 10).replace(/-/g, '')
        }
        getHistorySuccess(dispatch, res.data)
      })
      .catch(error => console.error(error))
  }
}

export const getHistorySuccess = (dispatch, data) => {
  // get unique dates
  const uniqueDates = [...new Set(data.map(item => item.created_at))].sort().reverse()
  const latest = Math.max(...uniqueDates)
  dispatch({
    type: CLEAR_HISTORY
  })

  dispatch({
    type: GET_HISTORY,
    payload: { data, uniqueDates, latest }
  })
}
