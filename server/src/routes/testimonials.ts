import { Router } from 'express'
import { db } from '../db'
import nodemailer from 'nodemailer'

const router = Router()

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

router.get('/testimonials', async (_req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM testimonials WHERE status = 'approved'`)
    res.json(rows)
  } catch (error: any) {
    console.error('DB ERROR:', error.message)
    res.status(500).json({ error: error.message })
  }
})

router.post('/testimonials', async (req, res) => {
  try {
    const { name, role, rating, quote } = req.body

    if (!name || !quote || !rating) {
      return res.status(400).json({ success: false, message: 'Name, rating and review are required.' })
    }

    const ratingNum = Number(rating)
    if (!Number.isFinite(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5.' })
    }

    const initials = getInitials(name)

    const [result]: any = await db.query(
      `INSERT INTO testimonials (initials, name, role, rating, quote, status) VALUES (?, ?, ?, ?, ?, 'pending')`,
      [initials, name, role || '', ratingNum, quote]
    )

    res.json({
      success: true,
      message: 'Thanks! Your review has been submitted and will appear once it has been reviewed.',
    })

    console.log('EMAIL_USER:', process.env.EMAIL_USER)
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS)

    transporter
      .sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New T&H Review pending approval from ${name}`,
        html: `
          <h2>New Review Submitted (Pending Approval)</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Role:</strong> ${role || 'Not provided'}</p>
          <p><strong>Rating:</strong> ${ratingNum} / 5</p>
          <p><strong>Review:</strong></p>
          <p>${quote}</p>
          <p>Review ID: ${result.insertId}. To publish it, set its "status" to 'approved' in the testimonials table.</p>
        `,
      })
      .catch((emailError) => {
        console.error('Failed to send review notification email:', emailError)
      })
  } catch (error: any) {
    console.error('DB ERROR:', error.message)
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' })
  }
})

export default router
