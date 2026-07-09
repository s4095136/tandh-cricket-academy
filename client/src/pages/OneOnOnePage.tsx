import React, { useState } from 'react'
import {
  Box, Container, Typography, Chip, Button, Card,
  Dialog, DialogContent, TextField, Grid, MenuItem, IconButton,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CloseIcon from '@mui/icons-material/Close'
import PersonIcon from '@mui/icons-material/Person'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { motion, type Variants } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { CLOUDINARY_BASE } from '../config/cloudinary'

const MotionBox = motion(Box)
const MotionTypography = motion(Typography)

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

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
      slotProps={{
        paper: {
          sx: {
            bgcolor: '#05091f',
            border: '1px solid rgba(245,200,66,0.18)',
            borderRadius: '24px',
            backgroundImage: 'none',
            overflow: 'hidden',
            boxShadow: '0 0 0 1px rgba(245,200,66,0.08), 0 32px 80px rgba(0,0,0,0.85)',
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>

        {/* Gold top accent line */}
        <Box sx={{
          position: 'absolute', top: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: 100, height: 2,
          background: 'linear-gradient(90deg, transparent, #f5c842, transparent)',
          zIndex: 2,
        }} />

        {/* Glow orb */}
        <Box sx={{
          position: 'absolute', top: -80, left: '50%',
          transform: 'translateX(-50%)',
          width: 320, height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(245,200,66,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {submitted ? (
          <Box sx={{ textAlign: 'center', py: { xs: 5, md: 7 }, px: 4, position: 'relative', zIndex: 1 }}>
            {/* Success icon */}
            <Box sx={{
              width: 64, height: 64, borderRadius: '50%',
              bgcolor: 'rgba(245,200,66,0.1)',
              border: '1px solid rgba(245,200,66,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mx: 'auto', mb: 2.5,
            }}>
              <EmojiEventsIcon sx={{ color: '#f5c842', fontSize: '1.8rem' }} />
            </Box>
            <Typography sx={{ fontFamily: '"Bebas Neue", sans-serif', color: '#f5c842', fontSize: '2rem', letterSpacing: '0.04em', mb: 1 }}>
              Interest Registered!
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', mb: 3.5, lineHeight: 1.7 }}>
              Thanks! We'll be in touch shortly to arrange your 1-on-1 session.
            </Typography>
            <Button variant="outlined" onClick={handleClose} sx={{ color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', '&:hover': { color: '#fff', borderColor: 'rgba(255,255,255,0.35)' } }}>
              Close
            </Button>
          </Box>
        ) : (
          <Box sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>

            {/* Modal header */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Chip
                  label="Private Coaching"
                  size="small"
                  sx={{ mb: 1, bgcolor: 'rgba(245,200,66,0.1)', color: '#f5c842', border: '1px solid rgba(245,200,66,0.22)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.1em' }}
                />
                <Typography sx={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.04em', color: '#fff', fontSize: { xs: '1.6rem', md: '2rem' }, lineHeight: 1 }}>
                  Book Your Session
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', mt: 0.5 }}>
                  Fill in your details and we'll be in touch.
                </Typography>
              </Box>
              <IconButton onClick={handleClose} sx={{ color: 'rgba(255,255,255,0.35)', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.06)' }, mt: -0.5, mr: -1 }}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Gold divider */}
            <Box sx={{ height: 1, bgcolor: 'rgba(245,200,66,0.12)', mb: 3 }} />

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
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={loading}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: '#f5c842', color: '#021a4a',
                    fontWeight: 800, py: 1.4, borderRadius: '12px',
                    fontSize: '0.95rem',
                    boxShadow: '0 4px 24px rgba(245,200,66,0.25)',
                    '&:hover': { bgcolor: '#e0b030', boxShadow: '0 6px 32px rgba(245,200,66,0.35)' },
                    '&.Mui-disabled': { bgcolor: 'rgba(245,200,66,0.2)', color: 'rgba(2,26,74,0.4)' },
                  }}
                >
                  {loading ? 'Submitting…' : 'Register Interest'}
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
        background: 'linear-gradient(170deg, #05091a 0%, #010d2a 40%, #021a4a 80%, #032053 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background dot grid */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── HERO ── */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 10, md: 11 }, mb: { xs: 6, md: 8 } }}>

        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => fromExplore ? navigate('/#explore') : navigate('/')}
          sx={{ color: 'rgba(255,255,255,0.35)', '&:hover': { color: '#f5c842' }, pl: 0, mb: 4 }}
        >
          {fromExplore ? 'Back' : 'Home'}
        </Button>

        {/* Hero card */}
        <Box sx={{
          position: 'relative',
          borderRadius: '28px',
          overflow: 'hidden',
          border: '1px solid rgba(245,200,66,0.15)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(245,200,66,0.03) 100%)',
          backdropFilter: 'blur(12px)',
          px: { xs: 3, sm: 5, md: 8 },
          py: { xs: 5, md: 7 },
          textAlign: 'center',
          boxShadow: '0 0 0 1px rgba(245,200,66,0.08), 0 24px 80px rgba(0,0,0,0.4)',
        }}>

          {/* Top gold line accent */}
          <Box sx={{
            position: 'absolute', top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: 120, height: 2,
            background: 'linear-gradient(90deg, transparent, #f5c842, transparent)',
          }} />

          {/* Glow orb behind text */}
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500, height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(245,200,66,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <MotionBox
            variants={stagger}
            initial="hidden"
            animate="show"
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <MotionBox variants={fadeUp}>
              <Chip
                label="Private Coaching"
                size="small"
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(245,200,66,0.1)',
                  color: '#f5c842',
                  border: '1px solid rgba(245,200,66,0.25)',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  fontSize: '0.65rem',
                }}
              />
            </MotionBox>

            <MotionTypography
              variants={fadeUp}
              variant="h1"
              sx={{
                fontSize: { xs: '3.4rem', sm: '4.8rem', md: '6.5rem' },
                color: '#fff',
                lineHeight: 0.92,
                mb: 3,
                letterSpacing: '-0.02em',
              }}
            >
              1-on-1<br />
              <Box component="span" sx={{ color: '#f5c842' }}>Coaching</Box>
            </MotionTypography>

            {/* Decorative divider */}
            <MotionBox variants={fadeIn} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ height: 1, width: 48, bgcolor: 'rgba(255,255,255,0.1)' }} />
              <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#f5c842', opacity: 0.6 }} />
              <Box sx={{ height: 1, width: 48, bgcolor: 'rgba(255,255,255,0.1)' }} />
            </MotionBox>

            <MotionTypography
              variants={fadeUp}
              sx={{
                color: 'rgba(255,255,255,0.55)',
                maxWidth: 480,
                mx: 'auto',
                fontSize: { xs: '0.97rem', md: '1.05rem' },
                lineHeight: 1.8,
                mb: 4.5,
              }}
            >
              Dedicated sessions built around your game. Work directly with our specialist coaches to fast-track your development.
            </MotionTypography>

            <MotionBox variants={fadeUp}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => openModal()}
              sx={{
                bgcolor: '#f5c842', color: '#021a4a',
                fontWeight: 800, px: 4.5, py: 1.5,
                fontSize: '0.95rem', borderRadius: '12px',
                boxShadow: '0 4px 28px rgba(245,200,66,0.28)',
                '&:hover': { bgcolor: '#e0b030', boxShadow: '0 8px 36px rgba(245,200,66,0.38)' },
              }}
            >
              Book a Session
            </Button>
            </MotionBox>
          </MotionBox>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pb: { xs: 10, md: 14 } }}>

        {/* Benefits strip */}
        <MotionBox
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',
            mb: { xs: 7, md: 9 },
          }}
        >
          {[
            { icon: <PersonIcon sx={{ fontSize: '1.1rem' }} />, label: 'Personalised feedback' },
            { icon: <SportsCricketIcon sx={{ fontSize: '1.1rem' }} />, label: 'Tailored drills' },
            { icon: <TrendingUpIcon sx={{ fontSize: '1.1rem' }} />, label: 'Measurable progress' },
            { icon: <EmojiEventsIcon sx={{ fontSize: '1.1rem' }} />, label: 'Elite-level coaches' },
          ].map(({ icon, label }) => (
            <MotionBox
              key={label}
              variants={fadeUp}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1,
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '12px',
                px: 2.5, py: 1.25,
                backdropFilter: 'blur(6px)',
              }}
            >
              <Box sx={{ color: '#f5c842', display: 'flex' }}>{icon}</Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600, fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
                {label}
              </Typography>
            </MotionBox>
          ))}
        </MotionBox>

        {/* Section label */}
        <MotionBox
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}
        >
          <Box sx={{ height: 2, width: 28, bgcolor: '#f5c842', borderRadius: 1 }} />
          <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.65rem', letterSpacing: '0.2em' }}>
            MEET YOUR COACHES
          </Typography>
        </MotionBox>

        {/* Coach cards */}
        <MotionBox
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
            gap: { xs: 2.5, md: 3 },
            mb: { xs: 7, md: 9 },
          }}
        >
          {COACHES.map((coach) => (
            <MotionBox
              key={coach.name}
              variants={fadeUp}
              sx={{
                bgcolor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease',
                '&:hover': {
                  transform: 'translateY(-7px)',
                  boxShadow: '0 20px 48px rgba(0,0,0,0.45)',
                  borderColor: 'rgba(245,200,66,0.2)',
                },
                '&:hover .photo-img': {
                  transform: 'scale(1.04)',
                },
                '&:hover .book-btn': {
                  bgcolor: '#f5c842',
                  color: '#021a4a',
                  borderColor: '#f5c842',
                },
              }}
            >
              {/* Photo */}
              <Box sx={{ height: 260, overflow: 'hidden', position: 'relative' }}>
                <Box
                  className="photo-img"
                  component="img"
                  src={`${CLOUDINARY_BASE}/${coach.image}`}
                  alt={coach.name}
                  sx={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: coach.objectPosition,
                    transition: 'transform 0.45s ease',
                    display: 'block',
                  }}
                />
                {/* Bottom gradient on photo */}
                <Box sx={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(1,8,30,0.9) 100%)',
                }} />
                {/* Role badge */}
                <Box sx={{
                  position: 'absolute', bottom: 14, left: 16,
                }}>
                  <Typography sx={{ color: '#f5c842', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                    {coach.role.toUpperCase()}
                  </Typography>
                  <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', lineHeight: 1.1 }}>
                    {coach.name}
                  </Typography>
                </Box>
              </Box>

              {/* Info */}
              <Box sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Gold accent line */}
                <Box sx={{ width: 32, height: 2, bgcolor: '#f5c842', borderRadius: 1, mb: 1.5 }} />

                <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', fontWeight: 600, mb: 1, letterSpacing: '0.04em' }}>
                  {coach.speciality}
                </Typography>

                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.84rem', lineHeight: 1.7, mb: 2, flexGrow: 1 }}>
                  {coach.bio}
                </Typography>

                <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap', mb: 2.5 }}>
                  {coach.highlights.map(h => (
                    <Chip
                      key={h} label={h} size="small"
                      sx={{
                        bgcolor: 'rgba(245,200,66,0.07)',
                        color: 'rgba(245,200,66,0.75)',
                        border: '1px solid rgba(245,200,66,0.15)',
                        fontSize: '0.65rem', fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>

                <Button
                  className="book-btn"
                  variant="outlined"
                  fullWidth
                  onClick={() => openModal(coach.name)}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: '0.9rem !important' }} />}
                  sx={{
                    color: '#f5c842',
                    borderColor: 'rgba(245,200,66,0.3)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    borderRadius: '10px',
                    py: 1,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      bgcolor: '#f5c842',
                      color: '#021a4a',
                      borderColor: '#f5c842',
                    },
                  }}
                >
                  Book with {coach.name.split(' ')[0]}
                </Button>
              </Box>
            </MotionBox>
          ))}
        </MotionBox>

        {/* ── CTA BLOCK ── */}
        <MotionBox
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{
            position: 'relative',
            borderRadius: '28px',
            mt: { xs: 2, md: 3 },
            overflow: 'hidden',
            border: '1px solid rgba(245,200,66,0.18)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(245,200,66,0.04) 100%)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 0 1px rgba(245,200,66,0.08), 0 24px 80px rgba(0,0,0,0.4)',
            p: { xs: 3.5, md: '48px 56px' },
            textAlign: { xs: 'center', md: 'left' },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          {/* Top gold accent */}
          <Box sx={{
            position: 'absolute', top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: 120, height: 2,
            background: 'linear-gradient(90deg, transparent, #f5c842, transparent)',
            pointerEvents: 'none',
          }} />

          {/* Glow orb */}
          <Box sx={{
            position: 'absolute', top: '50%', left: '30%',
            transform: 'translate(-50%, -50%)',
            width: 400, height: 250,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(245,200,66,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Chip
              label="Limited Spots"
              size="small"
              sx={{ mb: 1.5, bgcolor: 'rgba(245,200,66,0.1)', color: '#f5c842', border: '1px solid rgba(245,200,66,0.22)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.1em' }}
            />
            <Typography sx={{
              color: '#fff',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: { xs: '2.2rem', md: '3rem' },
              letterSpacing: '0.02em',
              lineHeight: 0.95,
              mb: 1.25,
            }}>
              Ready to Elevate<br />
              <Box component="span" sx={{ color: '#f5c842' }}>Your Game?</Box>
            </Typography>

            {/* Divider */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.25, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Box sx={{ height: 1, width: 36, bgcolor: 'rgba(255,255,255,0.1)' }} />
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#f5c842', opacity: 0.6 }} />
              <Box sx={{ height: 1, width: 36, bgcolor: 'rgba(255,255,255,0.1)' }} />
            </Box>

            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Register your interest and we'll match you with the right coach.
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => openModal()}
            sx={{
              position: 'relative', zIndex: 1, flexShrink: 0,
              bgcolor: '#f5c842', color: '#021a4a',
              fontWeight: 800, px: { xs: 4, md: 4.5 }, py: 1.6,
              borderRadius: '14px', fontSize: '0.95rem',
              boxShadow: '0 4px 28px rgba(245,200,66,0.28)',
              '&:hover': { bgcolor: '#e0b030', boxShadow: '0 8px 36px rgba(245,200,66,0.4)' },
            }}
          >
            Book a Session
          </Button>
        </MotionBox>

        {/* Bottom padding */}
        <Box sx={{ height: { xs: 48, md: 72 } }} />

      </Container>

      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} preselected={selectedCoach} />
    </Box>
  )
}
