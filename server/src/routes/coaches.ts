import { Router } from 'express'
import { db } from '../db'

const router = Router()

router.get('/coaches', async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM coaches')

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch coaches' })
  }
})

export default router