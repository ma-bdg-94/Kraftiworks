/* eslint-disable import/no-anonymous-default-export */

import {
  AUTH_FAIL,
  AUTH_SUCC,
  SIGNIN_FAIL,
  SIGNIN_SUCC,
  SIGNUP_FAIL,
  SIGNUP_SUCC,
  SIGN_OUT,
} from '../actions/types'

const initState = {
  token: localStorage.getItem('token'),
  authenticated: null,
  loading: true,
  user: null,
}

export default function (state = initState, action) {
  const { type, payload } = action

  switch (type) {
    case AUTH_SUCC:
      return {
        ...state,
        authenticated: true,
        loading: false,
        user: payload,
      }
    case SIGNUP_SUCC:
    case SIGNIN_SUCC:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        authenticated: true,
        loading: false,
      }
    case SIGNUP_FAIL:
    case SIGNIN_FAIL:
    case SIGN_OUT:
    case AUTH_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        authenticated: false,
        loading: false,
      }
    default:
      return state
  }
}
