import React, { useState } from 'react'
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Chip, Stack, Button,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const SQUADS = [
  {
    title: 'Open Team White',
    day: 'Saturday',
    time: '6:45pm – 9:00pm',
    coaches: 'Hanni, Alan, Tom & Simon',
    dates: '2 May – 30 Aug 2026',
    accent: false,
  },
  {
    title: 'Open Team Navy',
    day: 'Saturday',
    time: '4:45pm – 7:00pm',
    coaches: 'Hanni, Alan, Simon, Ali & Aiman',
    dates: '2 May – 30 Aug 2026',
    accent: false,
  },
  {
    title: '16&U White',
    day: 'Saturday',
    time: '2:45pm – 5:00pm',
    coaches: 'Hanni, Alan, Ayman & Hashim',
    dates: '2 May – 30 Aug 2026',
    accent: false,
  },
  {
    title: '16&U Navy',
    day: 'Sunday',
    time: '5:45pm – 8:00pm',
    coaches: 'Hanni, Daksh, Ritin & Krish',
    dates: '3 May – 31 Aug 2026',
    accent: false,
  },
  {
    title: '14&U Navy',
    day: 'Sunday',
    time: '3:45pm – 6:00pm',
    coaches: 'Hanni, Aiman & Ritwik',
    dates: '3 May – 31 Aug 2026',
    accent: true,
  },
  {
    title: '14&U',
    day: 'Sunday',
    time: '1:45pm – 4:00pm',
    coaches: 'Hanni, Aiman & Ritwik',
    dates: '3 May – 31 Aug 2026',
    accent: false,
  },
  {
    title: 'Special Group',
    day: 'Friday',
    time: '6:15pm – 8:30pm',
    coaches: 'Hanni, Aiman, Ali Khan & Ceriac',
    dates: '1 May – 29 Aug 2026',
    accent: false,
  },
  {
    title: '10&U',
    day: 'Friday',
    time: '4:45pm – 6:30pm',
    coaches: 'Hanni, Richard, Ritwik, Rehit & Humza',
    dates: '1 May – 29 Aug 2026',
    accent: false,
  },
]

const DAY_COLOR: Record<string, string> = {
  Friday: '#5c35a0',
  Saturday: '#032053',
  Sunday: '#1a6e3c',
}

export default function ProgramsSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <Box
      id="programs"
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1.5 }}>
            2026 Training Squads
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: 'secondary.main' }}>
            Find your squad
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 520, mx: 'auto', mt: 2 }}
          >
            T&H Cricket runs 8 squads across Friday, Saturday and Sunday — from 10&U through to Open.
            Season runs May to August 2026.
          </Typography>
        </Box>

        {/* Cards */}
        <Grid container spacing={3}>
          {SQUADS.map((squad, i) => (
            <Grid key={squad.title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid',
                  borderColor: squad.accent ? 'primary.main' : 'divider',
                  bgcolor: squad.accent ? 'primary.dark' : 'background.default',
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  transform: hovered === i ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: hovered === i
                    ? '0 12px 40px rgba(0,0,0,0.14)'
                    : squad.accent
                    ? '0 4px 20px rgba(29,110,74,0.25)'
                    : '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  {/* Day badge */}
                  <Chip
                    label={squad.day}
                    size="small"
                    sx={{
                      mb: 2,
                      bgcolor: DAY_COLOR[squad.day],
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                    }}
                  />

                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: '1.15rem',
                      mb: 2.5,
                      color: squad.accent ? '#fff' : 'text.primary',
                      fontFamily: '"Bebas Neue", sans-serif',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {squad.title}
                  </Typography>

                  <Stack spacing={1.2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon sx={{ fontSize: 15, color: squad.accent ? 'rgba(255,255,255,0.5)' : 'text.secondary' }} />
                      <Typography variant="caption" sx={{ color: squad.accent ? 'rgba(255,255,255,0.75)' : 'text.secondary' }}>
                        {squad.time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon sx={{ fontSize: 15, color: squad.accent ? 'rgba(255,255,255,0.5)' : 'text.secondary' }} />
                      <Typography variant="caption" sx={{ color: squad.accent ? 'rgba(255,255,255,0.75)' : 'text.secondary' }}>
                        Hoppers Crossing Cricket Store
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayIcon sx={{ fontSize: 15, color: squad.accent ? 'rgba(255,255,255,0.5)' : 'text.secondary' }} />
                      <Typography variant="caption" sx={{ color: squad.accent ? 'rgba(255,255,255,0.75)' : 'text.secondary' }}>
                        {squad.dates}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <PersonIcon sx={{ fontSize: 15, mt: '1px', color: squad.accent ? 'rgba(255,255,255,0.5)' : 'text.secondary' }} />
                      <Typography variant="caption" sx={{ color: squad.accent ? 'rgba(255,255,255,0.75)' : 'text.secondary', lineHeight: 1.5 }}>
                        {squad.coaches}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            href="#contact"
          >
            Enquire about a squad
          </Button>
        </Box>
      </Container>
    </Box>
  )
}