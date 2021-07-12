import express from 'express'
import config from 'config'
import { check, validationResult } from 'express-validator'
import { url } from 'gravatar'
import { genSalt, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'

const router = express.Router()

// test route
router.get('/test', (req, res) => res.send('users route: SUCCESS'))

// register new user
router.post(
  '/',
  [
    check('email')
      .not()
      .isEmpty()
      .withMessage('Required Field!')
      .isEmail()
      .withMessage('Wrong Email Format!'),
    check('isTech', 'Required Field').isBoolean(),
    check('password')
      .not()
      .isEmpty()
      .withMessage('Required Field!')
      .isLength({ min: 10 })
      .withMessage(
        'Wrong Password Format! Must contain 10 characters at least',
      ),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) })
    }

    const { email, isTech, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'Already Existing User With Those Credentials!' }],
        })
      }

      const avatar = url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      })

      user = new User({
        email,
        isTech,
        password,
        avatar,
      })

      const salt = await genSalt(10)
      user.password = await hash(password, salt)

      await user.save()

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