import express from 'express'
import apiRouter from './routes/api'
import coachesRouter from './routes/coaches'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use('/api', apiRouter)

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.send({ status: 'ok', message: 'th-cricket server running' })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

app.use('/api', coachesRouter)