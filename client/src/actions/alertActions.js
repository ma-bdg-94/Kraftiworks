import { v4 as uuidv4 } from 'uuid'
import { SHOW_ALERT } from './types'

export const showAlert = (msg, variant) => (dispatch) => {
  const id = uuidv4()

  dispatch({
    type: SHOW_ALERT,
    payload: { msg, variant, id },
  })
}
