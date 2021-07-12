import express from 'express'
import config from 'config'
import { check, validationResult } from 'express-validator'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import authenticated from '../middleware/authenticated'
import User from '../models/User'

const router = express.Router()

// test route
router.get('/test', (req, res) => res.send('auth route: SUCCESS'))

// authenticate user
router.get('/', authenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (er) {
    console.error(er.message)
    res.status(500).send('SERVER ERROR 500')
  }
})

// login user
router.post(
  '/',
  [
    check('email').not().isEmpty().withMessage('Required Field!'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('Required Field!')
      .exists()
      .withMessage('Inexisting User With Those Credentials!'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Inexisting User With Those Credentials!' }],
        })
      }

      const passwordMatch = await compare(password, user.password)
      if (!passwordMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Inexisting User With Those Credentials!' }],
        })
      }

      const payload = {
        user: {
          id: user.id,
        },
      }

      sign(
        payload,
        config.get('jwt-secret'),
        { expiresIn: 3600000 },
        (error, token) => {
          if (error) throw error
          res.json({ token })
        },
      )
    } catch (er) {
      console.error(er.message)
      res.status(500).send('SERVER ERROR 500')
    }
  },
)

export default router
