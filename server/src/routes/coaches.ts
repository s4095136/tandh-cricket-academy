import { Router } from 'express'
import { db } from '../db'

const router = Router()

router.get('/coaches', async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM coaches')
    res.json(rows)
  } catch (error: any) {
    console.error('DB ERROR:', error.message)
    res.status(500).json({ error: error.message })
  }
})

export default router