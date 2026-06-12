import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Button, Stack, Chip } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutlined'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { useApplyModal } from '../../context/ApplyModalContext'

const ROTATING_WORDS = [
  'developing skills.',
  'dedicated coaches.',
  'holiday clinics.',
  'building champions.',
  'leading the way.',
]

const STATS = [
  { value: '250+', label: 'Players coached' },
  { value: '8', label: 'Years running' },
  { value: '4', label: 'Programs' },
  { value: '25yrs', label: 'Coaching experience' },
]

interface Coach {
  id: number
  initials: string
  name: string
  role: string
  credentials: string[]
  bio: string
  image: string | null
  accent_color: string
  bg_color: string
  tags: string[]
}

const AVATAR_HOVER_SX = {
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.08)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  },
}

export default function HeroSection() {
  const { openApplyModal } = useApplyModal()
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length)
        setVisible(true)
      }, 400)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetch('http://localhost:4000/api/coaches')
      .then((res) => res.json())
      .then((data) => setCoaches(data))
      .catch((err) => console.error(err))
  }, [])

  const handleAvatarClick = (name: string) => {
    const found = coaches.find((c) => c.name === name) || null
    console.log('clicked:', name, 'found:', found)
    setSelectedCoach(found)
  }

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background texture pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Accent glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,144,217,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 16, md: 0 } }}>
        <Box sx={{ maxWidth: 720 }}>
          {/* Badge */}
          <Chip
            label="Est. 2017 · Melbourne, AUS"
            size="small"
            sx={{
              mb: 3,
              bgcolor: 'rgba(245,200,66,0.15)',
              color: '#f5c842',
              border: '1px solid rgba(245,200,66,0.3)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              fontSize: '0.72rem',
            }}
          />

          {/* Headline */}
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '3.8rem', sm: '5rem', md: '6.5rem' }, color: '#ffffff', mb: 0.5 }}
          >
            T&H Cricket
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3.8rem', sm: '5rem', md: '6.5rem' },
              color: 'secondary.main',
              mb: 3,
              minHeight: { xs: '4.5rem', md: '7rem' },
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(8px)',
            }}
          >
            {ROTATING_WORDS[wordIndex]}
          </Typography>

          {/* Subtext */}
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.62)', maxWidth: 520, mb: 4, fontSize: { xs: '1rem', md: '1.05rem' } }}
          >
            Whether you're a budding cricketer dreaming of international glory or simply looking to improve your
            game, T&H Cricket has something for everyone. Expert coaching from Tom Rogers (BBL Melbourne Stars)
            and Hanni Harb.
          </Typography>

          {/* CTAs */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 8 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => openApplyModal()}
              sx={{ fontSize: '0.95rem', px: 3.5, py: 1.5 }}
            >
              Join a Program
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayCircleOutlineIcon />}
              href="#philosophy"
              sx={{
                fontSize: '0.95rem',
                px: 3.5,
                py: 1.5,
                color: 'rgba(255,255,255,0.85)',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.6)',
                  bgcolor: 'rgba(255,255,255,0.06)',
                },
              }}
            >
              Learn more
            </Button>
          </Stack>

          {/* Stats row */}
          <Box sx={{ width: '500px', height: '1px', bgcolor: 'rgba(255,255,255,0.2)', mb: 4 }} />
          <Box sx={{ display: 'flex', gap: { xs: 3, md: 5 }, flexWrap: 'wrap' }}>
            {STATS.map((stat) => (
              <Box key={stat.label}>
                <Typography
                  sx={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: { xs: '2rem', md: '2.4rem' },
                    color: 'secondary.main',
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', display: 'block', mt: 0.3 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Coaches column */}
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          right: 60,
          top: '48%',
          transform: 'translateY(-50%) scale(0.85)',
          transformOrigin: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 5,
          zIndex: 2,
        }}
      >
        {/* Founders */}
        <Typography sx={{ color: '#f5c842', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          FOUNDERS & HEAD COACHES
        </Typography>
        <Box sx={{ display: 'flex', gap: 5 }}>
          {[
            { name: 'Tom Rogers', image: '/images/coaches/tom-rogers.png' },
            { name: 'Hanni Harb', image: '/images/coaches/hanni-harb.png' },
          ].map((coach) => (
            <Box key={coach.name} sx={{ textAlign: 'center' }}>
              <Avatar
                src={`http://localhost:4000${coach.image}`}
                onClick={() => handleAvatarClick(coach.name)}
                sx={{ width: 150, height: 150, border: '4px solid #f5c842', mb: 1, ...AVATAR_HOVER_SX }}
              />
              <Typography 
               onClick={() => handleAvatarClick(coach.name)}
                sx={{
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#f5c842' },
              }}
              >{coach.name}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Lead Coaches */}
        <Typography sx={{ color: '#f5c842', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          LEAD COACHES
        </Typography>
        <Box sx={{ display: 'flex', gap: 5 }}>
          {[
            { name: 'Aiman Nadeem', image: '/images/coaches/aiman.png' },
            { name: 'Alan Chandwick', image: '/images/coaches/alan.png' },
          ].map((coach) => (
            <Box key={coach.name} sx={{ textAlign: 'center' }}>
              <Avatar
                src={`http://localhost:4000${coach.image}`}
                onClick={() => handleAvatarClick(coach.name)}
                sx={{ width: 150, height: 150, border: '4px solid #f5c842', mb: 1, ...AVATAR_HOVER_SX }}
              />
              <Typography
               onClick={() => handleAvatarClick(coach.name)}
                sx={{
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#f5c842' },
              }}
              >{coach.name}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Assistant Coaches */}
        <Typography sx={{ color: '#f5c842', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          ASSISTANT COACHES
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'flex-start' }}>
          {[
            { name: 'Ali Khan', image: '/images/coaches/ali-khan.png' },
            { name: 'Aayan Nadeem', image: '/images/coaches/aayan.png' },
            { name: 'Ritin Raman', image: '/images/coaches/ritin.png' },
            { name: 'Daksh Kumar', image: '/images/coaches/daksh.png' },
            { name: 'Krish Kumar', image: '/images/coaches/krish.png' },
          ].map((coach) => (
            <Box key={coach.name} sx={{ width: 150, textAlign: 'center' }}>
              <Avatar
                src={`http://localhost:4000${coach.image}`}
                onClick={() => handleAvatarClick(coach.name)}
                sx={{ width: 150, height: 150, border: '3px solid #f5c842', mb: 1, ...AVATAR_HOVER_SX }}
              />
                            <Typography
               onClick={() => handleAvatarClick(coach.name)}
                sx={{
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#f5c842' },
              }}
              >{coach.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bottom gradient fade */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.03))',
          pointerEvents: 'none',
        }}
      />

<Dialog
  open={!!selectedCoach}
  onClose={() => setSelectedCoach(null)}
  maxWidth="md"
  fullWidth
  slotProps={{
    paper: {
      sx: {
        backgroundColor: '#021a4a !important',
        backgroundImage: 'none !important',
        color: '#ffffff',
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      },
    },
  }}
>
  {selectedCoach && (
    <DialogContent
      sx={{
        backgroundColor: '#021a4a',
        color: '#ffffff',
        p: 0,
      }}
    >
      {/* Navy header */}
      <Box
        sx={{
          background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
          px: 4,
          py: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: 3,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Avatar
          src={`http://localhost:4000${selectedCoach.image}`}
          sx={{
            width: 140,
            height: 140,
            flexShrink: 0,
            border: '4px solid #f5c842',
          }}
        />

        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography
            variant="h3"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              mb: 0.5,
            }}
          >
            {selectedCoach.name}
          </Typography>

          <Typography
            sx={{
              color: '#f5c842',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            {selectedCoach.role}
          </Typography>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 3 }}>
          {selectedCoach.credentials?.map((cred: string) => (
            <Typography
              key={cred}
              sx={{
                color: 'rgba(255,255,255,0.85)',
                mb: 0.5,
              }}
            >
              • {cred}
            </Typography>
          ))}
        </Box>

        <Typography
          sx={{
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.8,
            textAlign: 'left',
            maxWidth: 700,
            mx: 'auto',
            mb: 3,
          }}
        >
          {selectedCoach.bio}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {selectedCoach.tags?.map((tag: string) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                bgcolor: 'rgba(245,200,66,0.15)',
                color: '#f5c842',
                border: '1px solid rgba(245,200,66,0.25)',
                fontWeight: 600,
              }}
            />
          ))}
        </Box>
      </Box>
    </DialogContent>
  )}
</Dialog>
    </Box>
  )
}