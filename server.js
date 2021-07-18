import express from 'express'
import dbConnect from './config/db'

// import routes
import usersRoute from './routes/users'
import authRoute from './routes/auth'
import technicianRoute from './routes/technician'

// initialize app
const app = express()

// connect to db
dbConnect()

// initiate middleware
app.use(express.json({ extended: false }))

// define routes
app.use('/users', usersRoute)
app.use('/auth', authRoute)
app.use('/technician', technicianRoute)

// test api
app.get('/', (req, res) => {
  res.send('App run')
})

const port = process.env.port || 3001
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
