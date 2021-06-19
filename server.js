import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('App run')
})

const port = process.env.port || 3001
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
