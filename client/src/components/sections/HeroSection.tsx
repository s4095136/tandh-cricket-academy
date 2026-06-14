import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Button, Stack } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutlined'
import { useApplyModal } from '../../context/ApplyModalContext'
import { ROTATING_WORDS, STATS } from './HeroData'
import CoachesPanel from './CoachesPanel'
import SponsorsPanel from './SponsorsPanel'
import CoachDialog from './CoachesDialog'

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
    setSelectedCoach(found)
  }

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', lg: '100vh' },
        display: { xs: 'block', lg: 'flex' },
        alignItems: 'center',
        background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
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

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1,
          pt: { xs: 16, lg: '96px' },
          pb: { xs: 16, lg: 0 },
          ml: { lg: '280px' },
          mr: { lg: '640px' },
        }}
      >
        <Box sx={{ maxWidth: { xs: '100%', md: 520 } }}>
          {/* Headline */}
          <Box sx={{ mb: 2 }}>
            <Box
              component="img"
              src="/images/logo-transparent.png"
              alt="T&H Cricket"
              sx={{ height: { xs: 200, md: 280, lg: 190 }, width: 'auto', display: 'block', mx: 'auto', mb: 1.5 }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '1.3rem', sm: '1.7rem', md: '2.1rem' },
                color: 'secondary.main',
                minHeight: { xs: '2.1rem', md: '3.5rem' },
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              {ROTATING_WORDS[wordIndex]}
            </Typography>
          </Box>

          {/* Subtext */}
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.62)', maxWidth: 460, mb: 3, fontSize: { xs: '1rem', md: '1.05rem' } }}
          >
            Whether you're a budding cricketer dreaming of international glory or simply looking to improve your
            game, T&H Cricket has something for everyone. Expert coaching from Tom Rogers (BBL Melbourne Stars)
            and Hanni Harb.
          </Typography>

          {/* CTAs */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
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

          {/* Stats */}
          <Box sx={{ width: '100%', maxWidth: 460, height: '1px', bgcolor: 'rgba(255,255,255,0.2)', mb: 2 }} />
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

      <SponsorsPanel />
      <CoachesPanel onCoachClick={handleAvatarClick} />

      {/* Bottom gradient */}
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

      <CoachDialog coach={selectedCoach} onClose={() => setSelectedCoach(null)} />
    </Box>
  )
}