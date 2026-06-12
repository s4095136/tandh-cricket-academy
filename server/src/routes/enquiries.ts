import express from 'express'
import { db } from '../db'
import nodemailer from 'nodemailer'
import { error } from 'console'

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
const emailInfo = await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
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

console.log('✅ EMAIL SENT')
console.log(emailInfo.response)

res.json({
  success: true,
  message: 'Enquiry saved and email sent successfully',
})    } catch (error) {
  console.error('❌ ENQUIRY ERROR:', error)

  res.status(500).json({
    success: false,
    message: 'Failed to save enquiry or send email',
  })
}
})

export default router
