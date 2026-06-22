import React from 'react'
import { Box, Container, Typography, Grid, Stack } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined'

const PILLARS = [
  {
    title: 'Fundamental Skills',
    description: 'Batting, bowling, fielding and wicket-keeping taught with progressive technique drills.',
  },
  {
    title: 'Mental Strength',
    description: 'Building confidence, focus and strategic thinking for high-pressure match situations.',
  },
  {
    title: 'Teamwork & Sportsmanship',
    description: 'Developing character both on and off the field. Cricket is a team game at every level.',
  },
  {
    title: 'Match Simulation',
    description: 'Regular skill camps, holiday clinics, and game-day simulations for real experience.',
  },
]

const VALUES = [
  'Positive and supportive learning environment',
  'Coaching tailored to every age and skill level',
  'Beginner to elite representative pathways',
  'Specialized spin and fast bowling coaching',
  'Professional insight from an active BBL player',
  'Small group sessions for maximum development',
]

export default function PhilosophySection() {
  return (
    <Box
      id="philosophy"
      component="section"
      sx={{
        py: { xs: 8, md: 8 },
        minHeight: { md: 'calc(100vh - 72px)' },
        display: { md: 'flex' },
        alignItems: { md: 'center' },
        background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background texture */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 10 }}>

          {/* Left: text */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10,
                px: 2,
                py: 0.5,
                mb: 3,
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: '#f5c842', fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.72rem' }}
              >
                Our Philosophy
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.4em', md: '2rem' },
                color: '#ffffff',
                mb: 2,
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Developing Crickiters For Success
            </Typography>

            <Box
              sx={{
                width: 60,
                height: 4,
                bgcolor: '#f5c842',
                borderRadius: 2,
                mb: 2,
              }}
            />

            <Typography
              variant="body1"
              sx={{ mb: 2, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: '0.95rem', fontWeight: 500 }}
            >
              At T&H Cricket, we are passionate about developing cricketers for success, both on and off the field. Our programs are built on strong technical foundations, combined with a focus on game awareness, tactical understanding, and continuous personal development.
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: '0.95rem', fontWeight: 500 }}
            >
              Whether you’re picking up a bat for the first time or competing at an elite level, our coaching environment is designed to help every player improve, perform, and thrive.            </Typography>

            {/* Values checklist */}
            <Stack spacing={1.3}>
              {VALUES.map((val) => (
                <Box key={val} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: '#f5c842',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircleOutlineIcon sx={{ color: '#032053', fontSize: 13 }} />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    {val}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Right: pillar cards */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid container spacing={2} sx={{ width: '100%' }}>
              {PILLARS.map((pillar, i) => (
                <Grid key={pillar.title} size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  p: 3.5,
                  height: '100%',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    bgcolor: 'rgba(255,255,255,0.08)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
                  },
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f5c842', mb: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ color: '#f5c842', mb: 1.5, fontSize: '1rem', fontWeight: 800, letterSpacing: '0.01em' }}
                >
                  {pillar.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, fontSize: '0.875rem' }}
                >
                  {pillar.description}
                </Typography>
              </Box>
            </Grid>
              ))}
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}
