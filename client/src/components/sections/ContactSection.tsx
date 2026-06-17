import React, { useState } from 'react'
import {
  Box, Container, Typography, Grid, TextField,
  Button, MenuItem, Alert, Stack,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

const API_URL = 'https://tandh-backend-deployment-production.up.railway.app'

const PROGRAMS = [
  'Beginner Program (Ages 6–12)',
  'Advanced Training (Ages 13–17)',
  'Elite / Representative (Ages 15+)',
  'Holiday Clinic',
  'General enquiry',
]

interface FormState {
  name: string
  email: string
  phone: string
  program: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', phone: '', program: '', message: '' }

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   // TODO: wire up to /api/contact on the Express server
  //   await new Promise((r) => setTimeout(r, 1000))
  //   setLoading(false)
  //   setSubmitted(true)
  //   setForm(EMPTY)
  // }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    setLoading(true)

    const response = await fetch(
      `${API_URL}/api/enquiries`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      }
    )

    const data = await response.json()

    if (data.success) {
      setSubmitted(true)
      setForm(EMPTY)
    }
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}
  return (
    <Box
      id="contact"
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="flex-start">

          {/* Left: info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1.5 }}>
              Get started
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '3.6rem' }, color: 'secondary.main', mb: 2 }}>
              Join a program
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Ready to take your cricket to the next level? Fill out the form and we'll get back to you within 24 hours with program details and availability.
            </Typography>

            {/* Contact details */}
            <Stack spacing={2} sx={{ mb: 4 }}>
              {[
                { label: 'Location', value: 'Melbourne, Victoria' },
                { label: 'Email', value: 'info@tandhcricket.com.au' },
                { label: 'Website', value: 'tandhcricket.com.au' },
              ].map((item) => (
                <Box key={item.label}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ mt: 0.3 }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* Socials */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<FacebookIcon />}
                href="https://www.facebook.com/profile.php?id=61559769562351"
                target="_blank"
                rel="noopener"
                size="small"
                sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '0.8rem' }}
              >
                Facebook
              </Button>
              <Button
                variant="outlined"
                startIcon={<InstagramIcon />}
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener"
                size="small"
                sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '0.8rem' }}
              >
                Instagram
              </Button>
            </Stack>
          </Grid>

          {/* Right: form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                p: { xs: 3, md: 4 },
              }}
            >
              {submitted ? (
                <Alert
                  severity="success"
                  sx={{ borderRadius: 2 }}
                  onClose={() => setSubmitted(false)}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Thanks! We'll be in touch within 24 hours.
                  </Typography>
                </Alert>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="Full name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        size="small"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="Email address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        size="small"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Phone (optional)"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        size="small"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        select
                        label="Program of interest"
                        name="program"
                        value={form.program}
                        onChange={handleChange}
                        size="small"
                      >
                        {PROGRAMS.map((p) => (
                          <MenuItem key={p} value={p}>{p}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Tell us about your player (age, experience, goals)"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        size="small"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        disabled={loading}
                        endIcon={<SendIcon />}
                        sx={{ py: 1.4 }}
                      >
                        {loading ? 'Sending...' : 'Send enquiry'}
                      </Button>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5, textAlign: 'center' }}>
                        We'll respond within 24 hours · No spam, ever.
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
