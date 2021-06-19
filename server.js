import express from 'express'
import dbConnect from './config/db'

// import routes
import usersRoute from './routes/users'
import authRoute from './routes/auth'

// initialize app
const app = express()

// connect to db
dbConnect()

// define routes
app.use('/users', usersRoute)
app.use('/auth', authRoute)

// test api
app.get('/', (req, res) => {
  res.send('App run')
})

const port = process.env.port || 3001
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
