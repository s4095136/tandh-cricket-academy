import express from 'express'
import { db } from '../db'
import nodemailer from 'nodemailer'

const router = express.Router()


const transporter = nodemailer.createTransport({
  service: 'gmail',
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

    // Send notification email
    await transporter.sendMail({
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

    res.json({ success: true })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false })
  }
})

export default router
