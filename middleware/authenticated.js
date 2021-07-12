import config from 'config'
import { verify } from 'jsonwebtoken'

export default function (req, res, next) {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'ERROR 401: NOT AUTHORIZED!' })
  }

  try {
    const decoded = verify(token, config.get('jwt-secret'))

    req.user = decoded.user
    next()
  } catch (er) {
    res.status(401).json({ msg: 'ERROR 401: NOT AUTHORIZED!' })
  }
}
