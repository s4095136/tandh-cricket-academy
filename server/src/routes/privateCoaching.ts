import express from 'express'
import { db } from '../db'
import { Resend } from 'resend'

const router = express.Router()
const resend = new Resend(process.env.RESEND_API_KEY)

router.post('/1on1-enquiry', async (req, res) => {
  try {
    const { name, email, phone, grade, coach, message } = req.body

    if (!name?.trim() || !email?.trim() || !grade?.trim() || !coach?.trim()) {
      res.status(400).json({ success: false, message: 'Name, email, grade and coach are required.' })
      return
    }

    // Persist to database
    await db.query(
      `INSERT INTO private_coaching_enquiries
         (full_name, email, phone, grade, preferred_coach, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        email.trim(),
        phone?.trim() || null,
        grade.trim(),
        coach.trim(),
        message?.trim() || null,
      ]
    )

    // Respond immediately — don't make the client wait on emails
    res.json({ success: true })

    const FROM = 'T&H Cricket <onboarding@resend.dev>'

    // ── 1. Admin notification ──────────────────────────────────────────────
    const adminHtml = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
        <div style="background:#021a4a;padding:28px 32px;border-radius:12px 12px 0 0">
          <h1 style="margin:0;color:#f5c842;font-size:22px;letter-spacing:0.04em">
            New 1-on-1 Coaching Enquiry
          </h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.55);font-size:13px">
            T&amp;H Cricket Academy · Private Coaching
          </p>
        </div>
        <div style="background:#f9f9fb;padding:28px 32px;border:1px solid #e5e5ef">
          <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;border-collapse:collapse">
            ${[
              ['Name',             name],
              ['Email',           email],
              ['Phone',           phone || 'Not provided'],
              ['Grade',           grade],
              ['Preferred Coach', coach],
            ].map(([label, value]) => `
              <tr>
                <td style="padding:8px 0;color:#666;width:38%;font-weight:600">${label}</td>
                <td style="padding:8px 0;color:#1a1a2e">${value}</td>
              </tr>
            `).join('')}
          </table>
          ${message ? `
            <div style="margin-top:20px;padding:16px;background:#fff;border:1px solid #e5e5ef;border-radius:8px">
              <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.06em">
                Additional Notes
              </p>
              <p style="margin:0;font-size:14px;color:#333;line-height:1.6">${message}</p>
            </div>
          ` : ''}
        </div>
        <div style="background:#f0f0f5;padding:16px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e5ef;border-top:none;font-size:12px;color:#999;text-align:center">
          T&amp;H Cricket Academy · Private Coaching Enquiries
        </div>
      </div>
    `

    // ── 2. Confirmation email to the enquirer ──────────────────────────────
    const confirmHtml = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
        <div style="background:#021a4a;padding:28px 32px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="margin:0;color:#f5c842;font-size:26px;letter-spacing:0.04em">
            T&amp;H Cricket
          </h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.6);font-size:13px">
            Private Coaching · Session Enquiry
          </p>
        </div>
        <div style="background:#f9f9fb;padding:32px;border:1px solid #e5e5ef;text-align:center">
          <div style="width:56px;height:56px;background:#f5c842;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:26px;line-height:56px">
            🏏
          </div>
          <h2 style="margin:0 0 10px;font-size:20px;color:#021a4a">
            Thanks, ${name.split(' ')[0]}!
          </h2>
          <p style="margin:0 0 20px;font-size:14px;color:#555;line-height:1.7">
            We've received your enquiry for a 1-on-1 session with <strong>${coach}</strong>.
            One of our team will be in touch within <strong>24–48 hours</strong> to arrange your session.
          </p>
          <div style="background:#fff;border:1px solid #e5e5ef;border-radius:8px;padding:16px 20px;text-align:left;margin-bottom:24px">
            <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.06em">Your enquiry summary</p>
            <p style="margin:6px 0;font-size:14px;color:#333"><strong>Coach:</strong> ${coach}</p>
            <p style="margin:6px 0;font-size:14px;color:#333"><strong>Grade:</strong> ${grade}</p>
            ${phone ? `<p style="margin:6px 0;font-size:14px;color:#333"><strong>Phone:</strong> ${phone}</p>` : ''}
          </div>
          <p style="margin:0;font-size:13px;color:#888">
            Questions? Email us at
            <a href="mailto:info@tandhcricket.com.au" style="color:#021a4a">info@tandhcricket.com.au</a>
          </p>
        </div>
        <div style="background:#f0f0f5;padding:16px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e5ef;border-top:none;font-size:12px;color:#999;text-align:center">
          T&amp;H Cricket Academy · Melbourne, VIC
        </div>
      </div>
    `

    const [adminResult, confirmResult] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: process.env.EMAIL_USER!,
        subject: `New 1-on-1 Enquiry — ${name} (${coach})`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: FROM,
        to: email.trim(),
        subject: 'Your T&H Cricket coaching enquiry',
        html: confirmHtml,
      }),
    ])

    if (adminResult.error)   console.error('Admin email error:', adminResult.error)
    if (confirmResult.error) console.error('Confirm email error:', confirmResult.error)

    if (!adminResult.error && !confirmResult.error) {
      console.log(`1-on-1 emails sent — admin + confirmation to ${email}`)
    }

  } catch (err) {
    console.error('1on1-enquiry error:', err)
    // Only send error response if we haven't already sent success
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Server error. Please try again.' })
    }
  }
})

export default router
