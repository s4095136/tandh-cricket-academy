import React, { useState } from 'react'
import {
  Box, Container, Typography, Stack, Button, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, IconButton, Grid,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CloseIcon from '@mui/icons-material/Close'

interface Program {
  label: string
  day: string
  time: string
  coaches: string
  dates: string
  squads: string[]
}

const PROGRAMS: Program[] = [
  {
    label: 'Open',
    day: 'Saturday',
    time: 'White: 6:45pm – 9:00pm · Navy: 4:45pm – 7:00pm',
    coaches: 'Hanni, Alan, Tom, Simon & Aiman',
    dates: '2 May – 30 Aug 2026',
    squads: ['Open Team White', 'Open Team Navy'],
  },
  {
    label: '16s',
    day: 'Saturday & Sunday',
    time: 'White: 2:45pm – 5:00pm (Sat) · Navy: 5:45pm – 8:00pm (Sun)',
    coaches: 'Hanni, Alan, Ayman, Hashim, Daksh, Ritin & Krish',
    dates: '2 May – 31 Aug 2026',
    squads: ['16&U White', '16&U Navy'],
  },
  {
    label: '14s',
    day: 'Sunday',
    time: 'Navy: 3:45pm – 6:00pm · 14&U: 1:45pm – 4:00pm',
    coaches: 'Hanni, Aiman & Ritwik',
    dates: '3 May – 31 Aug 2026',
    squads: ['14&U Navy', '14&U'],
  },
  {
    label: '12s & Under',
    day: 'Friday',
    time: '6:15pm – 8:30pm',
    coaches: 'Hanni, Aiman, Ali Khan & Ceriac',
    dates: '1 May – 29 Aug 2026',
    squads: ['Special Group'],
  },
  {
    label: '10s',
    day: 'Friday',
    time: '4:45pm – 6:30pm',
    coaches: 'Hanni, Richard, Ritwik, Rehit & Humza',
    dates: '1 May – 29 Aug 2026',
    squads: ['10&U'],
  },
]

const DAY_COLOR: Record<string, { bg: string; text: string }> = {
  Friday:              { bg: '#ede7f6', text: '#5c35a0' },
  Saturday:            { bg: '#e3f0fb', text: '#032053' },
  Sunday:              { bg: '#e8f5e9', text: '#1a6e3c' },
  'Saturday & Sunday': { bg: '#e3f0fb', text: '#032053' },
}

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  club: '',
  battingHand: '',
  bowlingHand: '',
  bowlingType: '',
  message: '',
}

export default function ProgramsSection() {
  const [selected, setSelected] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const program = PROGRAMS[selected]
  const col = DAY_COLOR[program.day] ?? { bg: '#f0f0f0', text: '#333' }

  const handleOpen = () => {
    setSubmitted(false)
    setError(null)
    setForm(EMPTY_FORM)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:4000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, program: program.label }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Could not reach the server. Please email us at info@tandhcricket.com.au')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box id="programs" component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ mb: { xs: 5, md: 6 } }}>
          <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1 }}>
            2026 Season · May – August
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: 'secondary.main' }}>
            Programs
          </Typography>
        </Box>

        {/* Main panel */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: 'background.paper',
            boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
            minHeight: { md: 420 },
          }}
        >
          {/* Left — program list */}
          <Box
            sx={{
              width: { xs: '100%', md: 220 },
              borderRight: { md: '1px solid' },
              borderBottom: { xs: '1px solid', md: 'none' },
              borderColor: 'divider',
              flexShrink: 0,
            }}
          >
            {PROGRAMS.map((p, i) => (
              <Box
                key={p.label}
                onClick={() => setSelected(i)}
                sx={{
                  px: 3,
                  py: 2.2,
                  cursor: 'pointer',
                  borderLeft: '3px solid',
                  borderColor: selected === i ? 'secondary.main' : 'transparent',
                  bgcolor: selected === i ? 'rgba(245,200,66,0.07)' : 'transparent',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: selected === i ? 'rgba(245,200,66,0.07)' : 'rgba(0,0,0,0.03)',
                  },
                  borderBottom: i < PROGRAMS.length - 1 ? '1px solid' : 'none',
                  borderBottomColor: 'divider',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    letterSpacing: '0.04em',
                    fontSize: '1.1rem',
                    fontWeight: selected === i ? 700 : 500,
                    color: selected === i ? 'primary.main' : 'text.primary',
                  }}
                >
                  {p.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Right — detail panel */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              {/* Title + day chip */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: { xs: '2.4rem', md: '3.2rem' },
                    color: 'primary.main',
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                  }}
                >
                  {program.label}
                </Typography>
                <Chip label={program.day} sx={{ bgcolor: col.bg, color: col.text, fontWeight: 700, fontSize: '0.78rem' }} />
              </Box>

              {/* Squad tags */}
              <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                {program.squads.map((s) => (
                  <Chip key={s} label={s} size="small" sx={{ bgcolor: 'rgba(3,32,83,0.06)', color: 'primary.main', fontWeight: 600, fontSize: '0.72rem' }} />
                ))}
              </Stack>

              {/* Details */}
              <Stack spacing={2.5}>
                {[
                  { icon: <AccessTimeIcon sx={{ fontSize: 18, color: 'primary.main' }} />, label: 'Time', value: program.time },
                  { icon: <LocationOnIcon sx={{ fontSize: 18, color: 'primary.main' }} />, label: 'Location', value: 'Hoppers Crossing Cricket Store' },
                  { icon: <CalendarTodayIcon sx={{ fontSize: 18, color: 'primary.main' }} />, label: 'Season', value: program.dates },
                  { icon: <PersonIcon sx={{ fontSize: 18, color: 'primary.main' }} />, label: 'Coaches', value: program.coaches },
                ].map(({ icon, label, value }) => (
                  <Box key={label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'rgba(3,32,83,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.2 }}>{label}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{value}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* CTA */}
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} onClick={handleOpen}>
                Apply for {program.label}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Application modal */}
      <Dialog open={modalOpen} onClose={handleClose} maxWidth="sm" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.04em', fontSize: '1.4rem', color: 'primary.main' }}>
              Apply — {program.label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Hoppers Crossing Cricket Store · {program.dates}
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small"><CloseIcon fontSize="small" /></IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {submitted ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontFamily: '"Bebas Neue", sans-serif', color: 'primary.main', mb: 1 }}>
                Application received!
              </Typography>
              <Typography color="text.secondary">
                Thanks! We'll be in touch within 24 hours.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ pt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Full name" name="name" value={form.name} onChange={handleChange} required size="small" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} required size="small" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} size="small" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Club" name="club" value={form.club} onChange={handleChange} placeholder="e.g. Werribee CC" size="small" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth select label="Batting hand" name="battingHand" value={form.battingHand} onChange={handleChange} size="small">
                  <MenuItem value="Right">Right handed</MenuItem>
                  <MenuItem value="Left">Left handed</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth select label="Bowling hand" name="bowlingHand" value={form.bowlingHand} onChange={handleChange} size="small">
                  <MenuItem value="Right">Right handed</MenuItem>
                  <MenuItem value="Left">Left handed</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth select label="Bowling type" name="bowlingType" value={form.bowlingType} onChange={handleChange} size="small">
                  <MenuItem value="Fast">Fast bowler</MenuItem>
                  <MenuItem value="Spinner">Spinner</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth multiline rows={3} label="Anything else? (optional)" name="message" value={form.message} onChange={handleChange} size="small" />
              </Grid>
              {error && (
                <Grid size={{ xs: 12 }}>
                  <Typography color="error" variant="caption">{error}</Typography>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>

        {!submitted && (
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={handleClose} color="inherit">Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading || !form.name || !form.email}
              endIcon={<ArrowForwardIcon />}
            >
              {loading ? 'Sending...' : 'Submit application'}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  )
}