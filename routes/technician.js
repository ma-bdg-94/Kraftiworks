import express from 'express'
import { check, validationResult } from 'express-validator'

import authenticated from '../middleware/authenticated'
import Technician from '../models/Technician'
import User from '../models/User'

const router = express.Router()

// test route
router.get('/test', (req, res) => res.send('technician route: SUCCESS'))

// get current technician profile
router.get('/me', authenticated, async (req, res) => {
  try {
    const profile = await Technician.findOne({
      user: req.user.id,
    }).populate('user', ['email', 'avatar'])

    if (!profile) {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    res.json(profile)
  } catch (er) {
    console.error(er.message)
    res.status(500).send('Error 500! Something Went Wrong On The Server')
  }
})

// get profile by ID
router.get('/:profileId', async (req, res) => {
  try {
    const profile = await Technician.findOne({
      _id: req.params.profileId,
    }).populate('user', ['email', 'avatar'])

    if (!profile) {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    res.json(profile)
  } catch (er) {
    console.error(er.message)

    if (er.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    res.status(500).send('Error 500! Something Went Wrong On The Server')
  }
})

// get profile by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const profile = await Technician.findOne({
      user: req.params.userId,
    }).populate('user', ['email', 'avatar'])

    if (!profile) {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    res.json(profile)
  } catch (er) {
    console.error(er.message)

    if (er.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    res.status(500).send('Error 500! Something Went Wrong On The Server')
  }
})

// get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Technician.find().populate('user', [
      'email',
      'avatar',
    ])

    if (profiles === []) {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    res.json(profiles)
  } catch (er) {
    console.error(er.message)
    res.status(500).send('Error 500! Something Went Wrong On The Server')
  }
})

// create technician profile
router.post(
  '/',
  [
    authenticated,
    [
      check('fullName', 'Required Field! Must include your full name')
        .not()
        .isEmpty(),
      check('address', 'Required Field! Must include your address')
        .not()
        .isEmpty(),
      check('country', 'Required Field! Must include your country')
        .not()
        .isEmpty(),
      check('status', 'Required Field! Must include your status')
        .not()
        .isEmpty(),
      check('bio', 'Required Field! Must include your biography')
        .not()
        .isEmpty(),
      check('skills', 'Required Field! Must include your skills')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) })
    }

    const {
      fullName,
      address,
      country,
      status,
      bio,
      skills,
      phone,
      facebook,
      linkedin,
      website,
    } = req.body

    try {
      const profileObject = new Technician({
        user: req.user.id,
        fullName,
        address,
        country,
        status,
        bio,
        skills,
        phone,
        facebook,
        linkedin,
        website,
      })

      let profile = await Technician.findById(req.user.id).select('-password')

      if (!profile) {
        return res
          .status(400)
          .json({ msg: 'Error 400! User already Have A Profile' })
      }

      profile = await profileObject.save()
      res.json(profile)
    } catch (er) {
      console.error(er.message)
      res.status(500).send('Error 500! Something Went Wrong On The Server')
    }
  },
)

// update technician profile
router.put('/:profileId', authenticated, async (req, res) => {
  const {
    fullName,
    address,
    country,
    status,
    bio,
    skills,
    phone,
    facebook,
    linkedin,
    website,
  } = req.body

  // build profile object
  const fields = {}
  fields.user = req.user.id
  if (fullName) fields.fullName = fullName
  if (address) fields.address = address
  if (country) fields.country = country
  if (status) fields.status = status
  if (bio) fields.bio = bio
  if (skills) {
    fields.skills = skills.split(',').map((skill) => skill.trim())
  }

  // build socials object
  fields.socials = {}
  if (phone) fields.socials.phone = phone
  if (facebook) fields.socials.facebook = facebook
  if (linkedin) fields.socials.linkedin = linkedin
  if (website) fields.socials.website = website

  try {
    let profile = await Technician.findById(req.params.profileId)

    if (!profile) {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Error 401! Not Authorized' })
    }

    profile = await Technician.findOneAndUpdate(
      { _id: req.params.profileId, user: req.user.id },
      { $set: fields },
      { new: true },
    )

    res.json(profile)
  } catch (er) {
    console.error(er.message)

    if (er.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    res.status(500).send('Error 500! Something Went Wrong On The Server')
  }
})

// delete profile & user
router.delete('/:profileId', authenticated, async (req, res) => {
  try {
    const profile = await Technician.findById(req.params.profileId)

    if (!profile) {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Error 401! Not Authorized' })
    }

    // remove profile
    await Technician.findOneAndDelete({
      _id: req.params.profileId,
      user: req.user.id,
    })

    // remove user
    await User.findOneAndDelete({ _id: req.user.id })

    res.json({ msg: 'User deleted!' })
  } catch (er) {
    console.error(er.message)

    if (er.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    res.status(500).send('Error 500! Something Went Wrong On The Server')
  }
})

// add experience
router.post(
  '/experience/:profileId',
  [
    authenticated,
    [
      check('title', 'Required Field! Must include your job title')
        .not()
        .isEmpty(),
      check('company', 'Required Field! Must include your company name')
        .not()
        .isEmpty(),
      check('location', 'Required Field! Must include your company address')
        .not()
        .isEmpty(),
      check('startDate')
        .not()
        .isEmpty()
        .withMessage('Required Field! Must include your company address')
        .isDate()
        .withMessage('Wrong Date Format'),
      check(
        'desc',
        'Required Field! Must include a little description for your job (different tasks perfomed etc.)',
      )
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) })
    }

    const {
      title,
      company,
      location,
      startDate,
      endDate,
      currently,
      desc,
      technologies,
    } = req.body

    const newXp = {
      title,
      company,
      location,
      startDate,
      endDate,
      currently,
      desc,
      technologies,
    }

    try {
      const profile = await Technician.findOne({
        _id: req.params.profileId,
        user: req.user.id,
      })

      if (!profile) {
        return res.status(404).json({ msg: 'Error 404! No Profile Found' })
      }

      if (profile.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Error 401! Not Authorized' })
      }

      profile.experience.unshift(newXp)
      await profile.save()

      res.json(profile)
    } catch (er) {
      console.error(er.message)

      if (er.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Error 404! No Profile Found' })
      }

      res.status(500).send('Error 500! Something Went Wrong On The Server')
    }
  },
)

// delete experience
router.delete(
  '/experience/:profileId/:expId',
  authenticated,
  async (req, res) => {
    try {
      let profile = await Technician.findOne({
        _id: req.params.profileId,
        user: req.user.id,
      })

      if (!profile) {
        return res.status(404).json({ msg: 'Error 404! No Profile Found' })
      }

      if (profile.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Error 401! Not Authorized' })
      }

      // get remove index
      const remIndex = profile.experience
        .map((xp) => xp.id)
        .indexOf(req.params.expId)

      profile.experience.splice(remIndex, 1)

      await profile.save()
      res.json(profile)
    } catch (er) {
      console.error(er.message)

      if (er.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Error 404! No Profile Found' })
      }

      res.status(500).send('Error 500! Something Went Wrong On The Server')
    }
  },
)

// update experience
router.put('/experience/:profileId/:expId', authenticated, async (req, res) => {
  const {
    title,
    company,
    location,
    startDate,
    endDate,
    currently,
    desc,
    technologies,
  } = req.body

  // build experience object
  const expFields = {}
  if (title) expFields.title = title
  if (company) expFields.company = company
  if (location) expFields.location = location
  if (startDate) expFields.startDate = startDate
  if (endDate) expFields.endDate = endDate
  if (currently) expFields.currently = currently
  if (desc) expFields.desc = desc
  if (technologies) {
    expFields.technologies = technologies.split(',').map((tech) => tech.trim())
  }

  try {
    let profile = await Technician.findOne({
      _id: req.params.profileId,
      user: req.user.id,
    })

    if (!profile) {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Error 401! Not Authorized' })
    }

    // get update index
    const updateIndex = profile.experience
      .map((xp) => xp.id)
      .indexOf(req.params.expId)

    profile.experience[updateIndex] = expFields

    await profile.save()
    res.json(profile.experience)
  } catch (er) {
    console.error(er.message)

    if (er.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    res.status(500).send('Error 500! Something Went Wrong On The Server')
  }
})

// add education
router.post(
  '/education/:profileId',
  [
    authenticated,
    [
      check('degree', 'Required Field! Must include your degree')
        .not()
        .isEmpty(),
      check('field', 'Required Field! Must include your field of study')
        .not()
        .isEmpty(),
      check('college', 'Required Field! Must include your college')
        .not()
        .isEmpty(),
        check('university', 'Required Field! Must include your university')
        .not()
        .isEmpty(),
        check('location', 'Required Field! Must include your college address')
        .not()
        .isEmpty(),
      check('startDate')
        .not()
        .isEmpty()
        .withMessage('Required Field! Must include your company address')
        .isDate()
        .withMessage('Wrong Date Format'),
      check(
        'desc',
        'Required Field! Must include a little description for your job (different tasks perfomed etc.)',
      )
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) })
    }

    const {
      degree,
      field,
      college,
      university,
      location,
      startDate,
      endDate,
      currently,
      desc
    } = req.body

    const newEd = {
      degree,
      field,
      college,
      university,
      location,
      startDate,
      endDate,
      currently,
      desc,
      technologies,
    }

    try {
      const profile = await Technician.findOne({
        _id: req.params.profileId,
        user: req.user.id,
      })

      if (!profile) {
        return res.status(404).json({ msg: 'Error 404! No Profile Found' })
      }

      if (profile.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Error 401! Not Authorized' })
      }

      profile.education.unshift(newEd)
      await profile.save()

      res.json(profile)
    } catch (er) {
      console.error(er.message)

      if (er.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Error 404! No Profile Found' })
      }

      res.status(500).send('Error 500! Something Went Wrong On The Server')
    }
  },
)

// delete education
router.delete(
  '/education/:profileId/:edId',
  authenticated,
  async (req, res) => {
    try {
      let profile = await Technician.findOne({
        _id: req.params.profileId,
        user: req.user.id,
      })

      if (!profile) {
        return res.status(404).json({ msg: 'Error 404! No Profile Found' })
      }

      if (profile.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Error 401! Not Authorized' })
      }

      // get remove index
      const remIndex = profile.education
        .map((ed) => ed.id)
        .indexOf(req.params.edId)

      profile.education.splice(remIndex, 1)

      await profile.save()
      res.json(profile)
    } catch (er) {
      console.error(er.message)

      if (er.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Error 404! No Profile Found' })
      }

      res.status(500).send('Error 500! Something Went Wrong On The Server')
    }
  },
)

// update education
router.put('/education/:profileId/:edId', authenticated, async (req, res) => {
  const {
    degree,
    field,
    college,
    university,
    location,
    startDate,
    endDate,
    currently,
    desc
  } = req.body

  // build education object
  const edFields = {}
  if (degree) expFields.degree = degree
  if (field) expFields.field = field
  if (college) expFields.college = college
  if (university) expFields.university = university
  if (location) expFields.location = location
  if (startDate) expFields.startDate = startDate
  if (endDate) expFields.endDate = endDate
  if (currently) expFields.currently = currently
  if (desc) expFields.desc = desc

  try {
    let profile = await Technician.findOne({
      _id: req.params.profileId,
      user: req.user.id,
    })

    if (!profile) {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Error 401! Not Authorized' })
    }

    // get update index
    const updateIndex = profile.education
      .map((ed) => ed.id)
      .indexOf(req.params.edId)

    profile.education[updateIndex] = edFields

    await profile.save()
    res.json(profile.education)
  } catch (er) {
    console.error(er.message)

    if (er.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Error 404! No Profile Found' })
    }

    res.status(500).send('Error 500! Something Went Wrong On The Server')
  }
})

export default router
