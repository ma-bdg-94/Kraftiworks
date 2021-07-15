import axios from 'axios'
import setAuthToken from '../utilities/setAuthToken'
import { showAlert } from './alertActions'
import {
  AUTH_FAIL,
  AUTH_SUCC,
  SIGNIN_FAIL,
  SIGNIN_SUCC,
  SIGNUP_FAIL,
  SIGNUP_SUCC,
} from './types'

// get authenticated user
export const getUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('/auth')

    dispatch({
      type: AUTH_SUCC,
      payload: res.data,
    })
  } catch (er) {
    dispatch({
      type: AUTH_FAIL,
    })
  }
}

// register new user
export const signUp = ({ email, password, account }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ email, password, account })

  try {
    const res = await axios.post('/users', body, config)

    dispatch({
      type: SIGNUP_SUCC,
      payload: res.data,
    })

    dispatch(getUser())
  } catch (er) {
    const errors = er.response.data.errors

    if (errors) {
      errors.forEach((error) =>
        dispatch(showAlert(error.msg, (error.severity = 'error'))),
      )
    }

    dispatch({
      type: SIGNUP_FAIL,
    })
  }
}

// login user
export const signIn = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/auth', body, config)

    dispatch({
      type: SIGNIN_SUCC,
      payload: res.data,
    })

    dispatch(getUser())
  } catch (er) {
    const errors = er.response.data.errors

    if (errors) {
      errors.forEach((error) =>
        dispatch(showAlert(error.msg, (error.severity = 'error'))),
      )
    }

    dispatch({
      type: SIGNIN_FAIL,
    })
  }
}
