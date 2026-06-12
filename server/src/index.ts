import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import apiRouter from './routes/api'
import coachesRouter from './routes/coaches'
import testimonialsRouter from './routes/testimonials'
import enquiriesRouter from './routes/enquiries'
import cors from 'cors'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.send({ status: 'ok', message: 'th-cricket server running' })
})

app.use('/api', apiRouter)
app.use('/api', coachesRouter)
app.use('/api', testimonialsRouter)
app.use('/api', enquiriesRouter)
app.use(
  '/images',
  express.static(path.join(process.cwd(), 'images'))
)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})