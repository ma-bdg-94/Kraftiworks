import { v4 as uuidv4 } from 'uuid'
import { HIDE_ALERT, SHOW_ALERT } from './types'

export const showAlert = (msg, severity) => (dispatch) => {
  const id = uuidv4()

  dispatch({
    type: SHOW_ALERT,
    payload: { msg, severity, id },
  })

  setTimeout(
    () =>
      dispatch({
        type: HIDE_ALERT,
        payload: id,
      }),
    4500,
  )
}
