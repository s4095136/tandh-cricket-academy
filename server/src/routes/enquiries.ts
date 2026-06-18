import express from 'express'
import { db } from '../db'
import { Resend } from 'resend'

const router = express.Router()
const resend = new Resend(process.env.RESEND_API_KEY)

router.post('/enquiries', async (req, res) => {
  try {
    const { name, email, phone, program, message } = req.body

    await db.query(
      `INSERT INTO enquiries (full_name, email, phone, program, player_details) VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone, program, message]
    )

    res.json({ success: true })

    const { error } = await resend.emails.send({
      from: 'T&H Cricket <onboarding@resend.dev>',
      to: process.env.EMAIL_USER!,
      subject: `New T&H Enquiry - ${program}`,
      html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Program:</strong> ${program}</p>
        <h3>Player Information</h3>
        <p>${message}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
    } else {
      console.log('Enquiry email sent successfully')
    }

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false })
  }
})

export default router