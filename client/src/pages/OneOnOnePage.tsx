import React, { useState } from 'react'
import {
  Box, Container, Typography, Avatar, Chip, Button, Card,
  Dialog, DialogContent, TextField, Grid, MenuItem, IconButton,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CloseIcon from '@mui/icons-material/Close'
import PersonIcon from '@mui/icons-material/Person'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import { useNavigate, useLocation } from 'react-router-dom'
import { CLOUDINARY_BASE } from '../config/cloudinary'

const API_URL = import.meta.env.VITE_API_URL || 'https://tandh-backend-deployment-production.up.railway.app'

const COACHES = [
  {
    name: 'Aiman Nadeem',
    image: 'aiman-nadeem.png',
    role: 'Lead Coach',
    speciality: 'Batting & Fielding',
    bio: 'Victorian state representative with a wealth of competitive experience. Aiman brings elite-level technical knowledge to every 1-on-1 session.',
    objectPosition: 'center 5%',
    highlights: ['State Representative', 'Batting Specialist', 'High Performance'],
  },
  {
    name: 'Aayan Nadeem',
    image: 'aayan-nadeem.png',
    role: 'Coach',
    speciality: 'Batting & Bowling',
    bio: 'A technically refined coach focused on developing well-rounded cricketers. Aayan tailors every session to the individual player\'s needs and goals.',
    objectPosition: 'center 5%',
    highlights: ['All-Round Coach', 'Technical Focus', 'Youth Development'],
  },
  {
    name: 'Daksh Kumar',
    image: 'daksh-kumar.png',
    role: 'Coach',
    speciality: 'Bowling & Fitness',
    bio: 'Known for his high-intensity approach, Daksh specialises in bowling mechanics and cricket-specific fitness, helping players unlock their full athletic potential.',
    objectPosition: 'center 5%',
    highlights: ['Bowling Specialist', 'Fitness & Conditioning', 'Pace Development'],
  },
  {
    name: 'Ali Khan',
    image: 'ali-khan.png',
    role: 'Lead Coach',
    speciality: 'Batting & Strategy',
    bio: 'A strategic thinker with a passion for the mental side of the game. Ali\'s sessions cover batting technique, game awareness and match-day preparation.',
    objectPosition: 'center 5%',
    highlights: ['Batting Coach', 'Game Strategy', 'Mental Preparation'],
  },
]

const GRADE_OPTIONS = ['Under 10', 'Under 12', 'Under 14', 'Under 16', 'Under 18', 'Senior / Open']

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.05)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&:hover fieldset': { borderColor: '#f5c842' },
    '&.Mui-focused fieldset': { borderColor: '#f5c842' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#f5c842' },
  '& .MuiInputBase-input': { color: '#fff' },
  '& .MuiSelect-select': { color: '#fff' },
  '& .MuiSvgIcon-root': { color: '#f5c842' },
}

function RegisterModal({ open, onClose, preselected }: { open: boolean; onClose: () => void; preselected?: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', grade: '', coach: preselected ?? '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  React.useEffect(() => {
    if (open) setForm(f => ({ ...f, coach: preselected ?? '' }))
  }, [open, preselected])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    setError(null)
    if (!form.name.trim() || !form.email.trim() || !form.grade || !form.coach) {
      setError('Please fill in your name, email, grade and preferred coach.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/1on1-enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) {
        setError(data.message || 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Could not reach the server. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => { setSubmitted(false); setError(null) }, 300)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableScrollLock
      slotProps={{ paper: { sx: { bgcolor: '#021a4a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, backgroundImage: 'none' } } }}
    >
      <DialogContent sx={{ p: 0 }}>
        {submitted ? (
          <Box sx={{ textAlign: 'center', py: 5, px: 3 }}>
            <Typography variant="h5" sx={{ fontFamily: '"Bebas Neue", sans-serif', color: '#f5c842', mb: 1 }}>
              Interest Registered!
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
              Thanks! We'll be in touch shortly to arrange your 1-on-1 session.
            </Typography>
            <Button variant="text" onClick={handleClose} sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#fff' } }}>
              Close
            </Button>
          </Box>
        ) : (
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography variant="h5" sx={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.04em', color: '#fff', mb: 0.5 }}>
                  Register Your Interest
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                  Book a 1-on-1 session with one of our specialists.
                </Typography>
              </Box>
              <IconButton onClick={handleClose} sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#fff' }, mt: -0.5, mr: -1 }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Full name" name="name" value={form.name} onChange={handleChange} size="small" sx={inputSx} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} size="small" sx={inputSx} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Phone (optional)" name="phone" value={form.phone} onChange={handleChange} size="small" sx={inputSx} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth select label="Grade" name="grade" value={form.grade} onChange={handleChange} size="small" sx={inputSx}
                  slotProps={{ select: { MenuProps: { slotProps: { paper: { sx: { bgcolor: '#021a4a', color: '#fff' } } } } } }}>
                  {GRADE_OPTIONS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth select label="Preferred coach" name="coach" value={form.coach} onChange={handleChange} size="small" sx={inputSx}
                  slotProps={{ select: { MenuProps: { slotProps: { paper: { sx: { bgcolor: '#021a4a', color: '#fff' } } } } } }}>
                  {COACHES.map(c => <MenuItem key={c.name} value={c.name}>{c.name}</MenuItem>)}
                  <MenuItem value="No preference">No preference</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth multiline rows={3} label="Anything else you'd like us to know (optional)" name="message" value={form.message} onChange={handleChange} size="small" sx={inputSx} />
              </Grid>
              {error && (
                <Grid size={{ xs: 12 }}>
                  <Typography color="error" variant="caption">{error}</Typography>
                </Grid>
              )}
              <Grid size={{ xs: 12 }}>
                <Button variant="contained" onClick={handleSubmit} disabled={loading} endIcon={<ArrowForwardIcon />}
                  sx={{ bgcolor: '#f5c842', color: '#021a4a', fontWeight: 700, '&:hover': { bgcolor: '#e0b030' }, '&.Mui-disabled': { bgcolor: 'rgba(245,200,66,0.3)', color: 'rgba(2,26,74,0.5)' } }}>
                  {loading ? 'Submitting...' : 'Register Interest'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default function OneOnOnePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const fromExplore = (location.state as any)?.from === 'explore'
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCoach, setSelectedCoach] = useState<string | undefined>()

  const openModal = (coach?: string) => { setSelectedCoach(coach); setModalOpen(true) }

  return (
    <Box
      component="main"
      sx={{
        background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 9, md: 10 }, pb: { xs: 8, md: 12 } }}>
        {/* Back / Home button */}
        <Box sx={{ mb: 3 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => fromExplore ? navigate('/#explore') : navigate('/')}
            sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#f5c842' }, pl: 0 }}>
            {fromExplore ? 'Back' : 'Home'}
          </Button>
        </Box>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Chip label="Private coaching" size="small" sx={{ mb: 3, bgcolor: 'rgba(245,200,66,0.15)', color: '#f5c842', border: '1px solid rgba(245,200,66,0.3)', fontWeight: 600, letterSpacing: '0.05em', fontSize: '0.72rem' }} />
          <Typography variant="h1" sx={{ fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' }, color: '#ffffff', mb: 1.5 }}>
            1-on-1 Coaching
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.62)', maxWidth: 580, mx: 'auto', fontSize: { xs: '1rem', md: '1.05rem' }, lineHeight: 1.75 }}>
            Dedicated sessions tailored to your game. Work directly with one of our specialist coaches to accelerate your development.
          </Typography>
        </Box>

        {/* Benefits row */}
        <Box sx={{ display: 'flex', gap: { xs: 1, md: 2 }, justifyContent: 'center', mb: { xs: 6, md: 8 }, flexWrap: 'wrap' }}>
          {[
            { icon: <PersonIcon sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />, label: 'Personalised feedback' },
            { icon: <SportsCricketIcon sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />, label: 'Tailored drills' },
            { icon: <EmojiEventsIcon sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />, label: 'Elite-level coaches' },
          ].map(({ icon, label }) => (
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 }, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, px: { xs: 1.25, md: 2.5 }, py: { xs: 0.9, md: 1.2 }, flexShrink: 0 }}>
              <Box sx={{ color: '#f5c842', display: 'flex' }}>{icon}</Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: { xs: '0.72rem', md: '0.9rem' }, whiteSpace: 'nowrap' }}>{label}</Typography>
            </Box>
          ))}
        </Box>

        {/* Coach cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, gap: 3 }}>
          {COACHES.map((coach) => (
            <Card
              key={coach.name}
              sx={{
                bgcolor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 4,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
                '&:hover': { transform: 'translateY(-5px)', bgcolor: 'rgba(255,255,255,0.08)', boxShadow: '0 12px 32px rgba(0,0,0,0.35)' },
              }}
            >
              {/* Photo */}
              <Box sx={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                <Box
                  component="img"
                  src={`${CLOUDINARY_BASE}/${coach.image}`}
                  alt={coach.name}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: coach.objectPosition }}
                />
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(1,13,42,0.85) 100%)' }} />
              </Box>

              {/* Info */}
              <Box sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', mb: 0.25 }}>{coach.name}</Typography>
                <Typography sx={{ color: '#f5c842', fontWeight: 600, fontSize: '0.8rem', mb: 1.5 }}>{coach.speciality}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.65, mb: 2, flexGrow: 1 }}>{coach.bio}</Typography>
                <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 2.5 }}>
                  {coach.highlights.map(h => (
                    <Chip key={h} label={h} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontSize: '0.67rem' }} />
                  ))}
                </Box>
                <Button variant="outlined" fullWidth onClick={() => openModal(coach.name)} endIcon={<ArrowForwardIcon />}
                  sx={{ color: '#f5c842', borderColor: 'rgba(245,200,66,0.35)', fontWeight: 700, fontSize: '0.82rem', borderRadius: 2.5, '&:hover': { borderColor: '#f5c842', bgcolor: 'rgba(245,200,66,0.06)' } }}>
                  Book with {coach.name.split(' ')[0]}
                </Button>
              </Box>
            </Card>
          ))}
        </Box>

        {/* Bottom CTA */}
        <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 8 } }}>
          <Button variant="contained" onClick={() => openModal()} endIcon={<ArrowForwardIcon />}
            sx={{ bgcolor: '#f5c842', color: '#021a4a', fontWeight: 700, px: 4, py: 1.4, fontSize: '1rem', '&:hover': { bgcolor: '#e0b030' } }}>
            Register Interest
          </Button>
        </Box>
      </Container>

      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} preselected={selectedCoach} />
    </Box>
  )
}
