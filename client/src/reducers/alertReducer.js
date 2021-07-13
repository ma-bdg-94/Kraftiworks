/* eslint-disable import/no-anonymous-default-export */
import { HIDE_ALERT, SHOW_ALERT } from '../actions/types'

const initState = []

export default function (state = initState, action) {
  const { type, payload } = action

  switch (type) {
    case SHOW_ALERT:
      return [...state, payload]
    case HIDE_ALERT:
      return state.filter((al) => al.id !== payload)
    default:
      return state
  }
}
