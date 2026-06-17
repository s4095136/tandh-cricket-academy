import express from 'express'
import { db } from '../db'
import nodemailer from 'nodemailer'
import { error } from 'console'

const router = express.Router()


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

router.post('/enquiries', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      program,
      message,
    } = req.body

    // Save to Railway DB
    await db.query(
      `
      INSERT INTO enquiries
      (
        full_name,
        email,
        phone,
        program,
        player_details
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        name,
        email,
        phone,
        program,
        message,
      ]
    )

    // Enquiry saved — respond to the user right away
    res.json({ success: true })

    // Send notification email in the background; don't block/fail the
    // request if the SMTP connection is slow or blocked
    console.log('EMAIL_USER:', process.env.EMAIL_USER)
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS)

    transporter
      .sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // or info@tandhcricket.com.au
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
      .catch((emailError) => {
        console.error('Failed to send enquiry notification email:', emailError)
      })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false })
  }
})

export default router
