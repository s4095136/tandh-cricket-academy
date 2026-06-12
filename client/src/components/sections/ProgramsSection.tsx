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
  Friday:              { bg: 'rgba(245,200,66,0.15)', text: '#f5c842' },
  Saturday:            { bg: 'rgba(74,144,217,0.15)', text: '#7eb8f5' },
  Sunday:              { bg: 'rgba(77,214,138,0.15)', text: '#4dd68a' },
  'Saturday & Sunday': { bg: 'rgba(74,144,217,0.15)', text: '#7eb8f5' },
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

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.05)',

    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.15)',
    },

    '&:hover fieldset': {
      borderColor: '#f5c842',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#f5c842',
    },
  },

  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.7)',
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: '#f5c842',
  },

  '& .MuiInputBase-input': {
    color: '#fff',
  },

  '& .MuiSelect-select': {
    color: '#fff',
  },

  '& .MuiSvgIcon-root': {
    color: '#f5c842',
  },
}

export default function ProgramsSection() {
  const [selected, setSelected] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const program = PROGRAMS[selected]
  const col = DAY_COLOR[program.day] ?? { bg: 'rgba(255,255,255,0.08)', text: '#fff' }

  const handleOpen = () => {
    setSubmitted(false)
    setError(null)
    setForm(EMPTY_FORM)
    setModalOpen(true)
  }

  const handleClose = () => setModalOpen(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:4000'}/api/enquiries`, {
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
    <Box
      id="programs"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
      }}
    >
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ mb: { xs: 5, md: 6 } }}>
<Typography variant="overline" sx={{ display: 'block', mb: 1, color: '#f5c842' }}>
  2026 Season · May – August
</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: '#ffffff' }}>
            Programs
          </Typography>
        </Box>

        {/* Main panel */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: 'rgba(255,255,255,0.03)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
            minHeight: { md: 420 },
          }}
        >
          {/* Left — program list */}
          <Box
            sx={{
              width: { xs: '100%', md: 220 },
              borderRight: { md: '1px solid rgba(255,255,255,0.2)' },
              borderBottom: { xs: '1px solid rgba(255,255,255,0.2)', md: 'none' },
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
                  borderLeftColor: selected === i ? '#f5c842' : 'transparent',
                  bgcolor: selected === i ? 'rgba(245,200,66,0.07)' : 'transparent',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: selected === i ? 'rgba(245,200,66,0.07)' : 'rgba(255,255,255,0.04)',
                  },
                  borderBottom: i < PROGRAMS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    letterSpacing: '0.04em',
                    fontSize: '1.1rem',
                    fontWeight: selected === i ? 700 : 500,
                    color: selected === i ? '#f5c842' : 'rgba(255,255,255,0.7)',
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
                    color: '#f5c842',
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                  }}
                >
                  {program.label}
                </Typography>
                <Chip
                  label={program.day}
                  sx={{ bgcolor: col.bg, color: col.text, fontWeight: 700, fontSize: '0.78rem', border: `1px solid ${col.text}40` }}
                />
              </Box>

              {/* Squad tags */}
              <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                {program.squads.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.72rem' }}
                  />
                ))}
              </Stack>

              {/* Details */}
              <Stack spacing={2.5}>
                {[
                  { icon: <AccessTimeIcon sx={{ fontSize: 18, color: '#fff' }} />, label: 'Time', value: program.time },
                  { icon: <LocationOnIcon sx={{ fontSize: 18, color: '#fff' }} />, label: 'Location', value: 'Hoppers Crossing Cricket Store' },
                  { icon: <CalendarTodayIcon sx={{ fontSize: 18, color: '#fff' }} />, label: 'Season', value: program.dates },
                  { icon: <PersonIcon sx={{ fontSize: 18, color: '#fff' }} />, label: 'Coaches', value: program.coaches },
                ].map(({ icon, label, value }) => (
                  <Box key={label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.06)',
                        border: '2px solid #ffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', mb: 0.2 }}>
                        {label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                        {value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* CTA */}
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleOpen}
                sx={{
                  bgcolor: '#f5c842',
                  color: '#021a4a',
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#e0b030' },
                }}
              >
                Apply for {program.label}
              </Button>            
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Application modal */}
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
PaperProps={{
  sx: {
    backgroundColor: '#021a4a',
    backgroundImage:
      'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
    color: '#fff',
    border: '1px solid rgba(245,200,66,0.15)',
    borderRadius: 4,
    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
  },
}}      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.04em', fontSize: '1.4rem', color: '#f5c842' }}>
              Apply — {program.label}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)' }}>
              Hoppers Crossing Cricket Store · {program.dates}
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

<DialogContent
  dividers
  sx={{
    color: '#fff',
    borderColor: 'rgba(255,255,255,0.08)',
  }}
>          {submitted ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontFamily: '"Bebas Neue", sans-serif', color: '#f5c842', mb: 1 }}>
                Application received!
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Thanks! We'll be in touch within 24 hours.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ pt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Full name" name="name" value={form.name} onChange={handleChange} required size="small" sx={inputSx} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} required size="small" sx={inputSx} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} size="small" sx={inputSx} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Club" name="club" value={form.club} onChange={handleChange} placeholder="e.g. Werribee CC" size="small" sx={inputSx} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth select label="Batting hand" name="battingHand" value={form.battingHand} onChange={handleChange} size="small" sx={inputSx}
                  SelectProps={{ MenuProps: { PaperProps: { sx: { bgcolor: '#021a4a', color: '#fff' } } } }}
                >
                  <MenuItem value="Right">Right handed</MenuItem>
                  <MenuItem value="Left">Left handed</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth select label="Bowling hand" name="bowlingHand" value={form.bowlingHand} onChange={handleChange} size="small" sx={inputSx}
                  SelectProps={{ MenuProps: { PaperProps: { sx: { bgcolor: '#021a4a', color: '#fff' } } } }}
                >
                  <MenuItem value="Right">Right handed</MenuItem>
                  <MenuItem value="Left">Left handed</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth select label="Bowling type" name="bowlingType" value={form.bowlingType} onChange={handleChange} size="small" sx={inputSx}
                  SelectProps={{ MenuProps: { PaperProps: { sx: { bgcolor: '#021a4a', color: '#fff' } } } }}
                >
                  <MenuItem value="Fast">Fast bowler</MenuItem>
                  <MenuItem value="Spinner">Spinner</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth multiline rows={3} label="Anything else? (optional)" name="message" value={form.message} onChange={handleChange} size="small" sx={inputSx} />
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
<DialogActions
  sx={{
    px: 3,
    py: 2,
    borderTop: '1px solid rgba(255,255,255,0.08)',
    bgcolor: 'rgba(0,0,0,0.15)',
  }}
>
<Button
  onClick={handleClose}
  sx={{
    color: 'rgba(255,255,255,0.75)',
    '&:hover': {
      bgcolor: 'rgba(255,255,255,0.05)',
    },
  }}
>
  Cancel
</Button>
<Button
  variant="contained"
  onClick={handleSubmit}
  disabled={loading || !form.name || !form.email}
  endIcon={<ArrowForwardIcon />}
  sx={{
    bgcolor: '#f5c842',
    color: '#021a4a',
    fontWeight: 700,
    '&:hover': {
      bgcolor: '#e0b030',
    },
    '&.Mui-disabled': {
      bgcolor: 'rgba(245,200,66,0.3)',
      color: 'rgba(2,26,74,0.5)',
    },
  }}
>
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  )
}