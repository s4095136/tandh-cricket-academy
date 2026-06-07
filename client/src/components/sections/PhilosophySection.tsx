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
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}
    >
      <Container maxWidth="lg">
        <Grid container>

          {/* Left: text */}
          <Grid size={{xs: 12, md:6}}>
            <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1.5 }}>
              Our Philosophy
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: 'secondary.main', mb: 3 }}>
              Developing well-rounded cricketers
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              At T&H Cricket, we are passionate about developing well-rounded cricketers both on and off the field. Our comprehensive programs focus on fundamental skills while also emphasising sportsmanship, teamwork, and strategic thinking.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              We believe in creating a positive and supportive learning environment where players can thrive and reach their full potential — from beginners to elite state representatives.
            </Typography>

            {/* Values checklist */}
            <Stack spacing={1.5}>
              {VALUES.map((val) => (
                <Box key={val} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <CheckCircleOutlineIcon
                    sx={{ color: 'primary.main', mt: '2px', fontSize: 20, flexShrink: 0 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {val}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Right: pillar cards */}
          <Grid size={{xs: 12, md:6}}>
            <Grid container spacing={2}>
              {PILLARS.map((pillar, i) => (
                <Grid key={pillar.title} size={{xs: 12, md:6}}>
                  <Box
                    sx={{
                      p: 3,
                      height: '100%',
                      bgcolor: i % 2 === 0 ? 'primary.dark' : 'background.paper',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: i % 2 === 0 ? 'primary.dark' : 'divider',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: i % 2 === 0 ? 'primary.light' : 'primary.main',
                        mb: 1,
                        fontSize: '1rem',
                      }}
                    >
                      {pillar.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.65)' : 'text.secondary' }}
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
