import React, { useState } from 'react'
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Chip, Stack, Button, Tab, Tabs,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

interface Squad {
  title: string
  day: 'Friday' | 'Saturday' | 'Sunday'
  time: string
  coaches: string
  dates: string
  location: string
}

const LOCATION = 'Hoppers Crossing Cricket Store'

const SQUADS: Squad[] = [
  { title: 'Open Team White',  day: 'Saturday', time: '6:45pm – 9:00pm', coaches: 'Hanni, Alan, Tom & Simon',              dates: '2 May – 30 Aug 2026', location: LOCATION },
  { title: 'Open Team Navy',   day: 'Saturday', time: '4:45pm – 7:00pm', coaches: 'Hanni, Alan, Simon, Ali & Aiman',       dates: '2 May – 30 Aug 2026', location: LOCATION },
  { title: '16&U White',       day: 'Saturday', time: '2:45pm – 5:00pm', coaches: 'Hanni, Alan, Aiman & Hashim',           dates: '2 May – 30 Aug 2026', location: LOCATION },
  { title: '16&U Navy',        day: 'Sunday',   time: '5:45pm – 8:00pm', coaches: 'Hanni, Daksh, Ritin & Krish',           dates: '3 May – 31 Aug 2026', location: LOCATION },
  { title: '14&U Navy',        day: 'Sunday',   time: '3:45pm – 6:00pm', coaches: 'Hanni, Aiman & Ritwik',                 dates: '3 May – 31 Aug 2026', location: LOCATION },
  { title: '14&U',             day: 'Sunday',   time: '1:45pm – 4:00pm', coaches: 'Hanni, Aiman & Ritwik',                 dates: '3 May – 31 Aug 2026', location: LOCATION },
  { title: 'Special Group',    day: 'Friday',   time: '6:15pm – 8:30pm', coaches: 'Hanni, Aiman, Ali Khan & Ceriac',       dates: '1 May – 29 Aug 2026', location: LOCATION },
  { title: '10&U',             day: 'Friday',   time: '4:45pm – 6:30pm', coaches: 'Hanni, Richard, Ritwik, Rehit & Humza', dates: '1 May – 29 Aug 2026', location: LOCATION },
]

const DAYS = ['All', 'Friday', 'Saturday', 'Sunday'] as const

const DAY_COLOR: Record<string, { bg: string; text: string }> = {
  Friday:   { bg: '#ede7f6', text: '#5c35a0' },
  Saturday: { bg: '#e3f0fb', text: '#032053' },
  Sunday:   { bg: '#e8f5e9', text: '#1a6e3c' },
}

function SquadCard({ squad }: { squad: Squad }) {
  const col = DAY_COLOR[squad.day]
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.35rem',
              letterSpacing: '0.04em',
              color: 'text.primary',
              lineHeight: 1.2,
              flex: 1,
              pr: 1,
            }}
          >
            {squad.title}
          </Typography>
          <Chip
            label={squad.day}
            size="small"
            sx={{ bgcolor: col.bg, color: col.text, fontWeight: 700, fontSize: '0.68rem', flexShrink: 0 }}
          />
        </Box>

        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{squad.time}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{squad.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <PersonIcon sx={{ fontSize: 15, color: 'text.secondary', mt: '1px' }} />
            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
              {squad.coaches}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <Box
        sx={{
          px: 3, py: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="caption" color="text.secondary">{squad.dates}</Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          href="#contact"
          sx={{ fontSize: '0.75rem', px: 2, py: 0.7 }}
        >
          Enquire
        </Button>
      </Box>
    </Card>
  )
}

export default function ScheduleSection() {
  const [activeTab, setActiveTab] = useState(0)

  const filtered = activeTab === 0
    ? SQUADS
    : SQUADS.filter((s) => s.day === DAYS[activeTab])

  return (
    <Box
      id="schedule"
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 5, md: 6 } }}>
          <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1.5 }}>
            2026 Season · May – August
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: 'secondary.main' }}>
              Weekly schedule
            </Typography>
            <Button
              variant="text"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              href="#contact"
              sx={{ fontWeight: 600 }}
            >
              Get in touch
            </Button>
          </Box>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            mb: 4,
            '& .MuiTabs-indicator': { bgcolor: 'primary.main' },
            '& .Mui-selected': { color: 'primary.main !important', fontWeight: 600 },
            '& .MuiTab-root': { textTransform: 'none', fontSize: '0.875rem', minWidth: 'auto', px: 2 },
          }}
        >
          {DAYS.map((d) => <Tab key={d} label={d} />)}
        </Tabs>

        <Grid container spacing={3}>
          {filtered.map((squad) => (
            <Grid key={squad.title} size={{ xs: 12, sm: 6, lg: 4 }}>
              <SquadCard squad={squad} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}