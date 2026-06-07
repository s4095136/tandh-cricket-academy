import React, { useState } from 'react'
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Chip, Button, Stack, Tab, Tabs,
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PeopleIcon from '@mui/icons-material/People'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

interface Session {
  day: string
  month: string
  title: string
  type: string
  time: string
  venue: string
  ages: string
  spots: number
  totalSpots: number
  price: string
}

const SESSIONS: Session[] = [
  {
    day: '12', month: 'May',
    title: 'Junior Holiday Clinic',
    type: 'Holiday Clinic',
    time: '9:00 AM – 3:00 PM',
    venue: 'Elsternwick Park, Melbourne',
    ages: 'Ages 8–14',
    spots: 8,
    totalSpots: 20,
    price: '$95',
  },
  {
    day: '17', month: 'May',
    title: 'Elite Batting Masterclass',
    type: 'Advanced Training',
    time: '10:00 AM – 1:00 PM',
    venue: 'MSAC, Albert Park',
    ages: 'Ages 15+',
    spots: 4,
    totalSpots: 12,
    price: '$75',
  },
  {
    day: '24', month: 'May',
    title: 'Spin Bowling Clinic',
    type: 'Skills Focus',
    time: '2:00 PM – 5:00 PM',
    venue: 'Caulfield Park',
    ages: 'All ages',
    spots: 0,
    totalSpots: 16,
    price: '$65',
  },
  {
    day: '31', month: 'May',
    title: 'Beginner Cricket Program',
    type: 'Beginner',
    time: '9:00 AM – 11:00 AM',
    venue: 'Elsternwick Park, Melbourne',
    ages: 'Ages 6–12',
    spots: 12,
    totalSpots: 20,
    price: '$45',
  },
  {
    day: '7', month: 'Jun',
    title: 'Representative Squad Camp',
    type: 'Elite / Rep',
    time: '8:00 AM – 4:00 PM',
    venue: 'Junction Oval, Melbourne',
    ages: 'Ages 14+',
    spots: 6,
    totalSpots: 16,
    price: '$120',
  },
  {
    day: '14', month: 'Jun',
    title: 'Fast Bowling Masterclass',
    type: 'Skills Focus',
    time: '10:00 AM – 1:00 PM',
    venue: 'MSAC, Albert Park',
    ages: 'Ages 12+',
    spots: 10,
    totalSpots: 14,
    price: '$75',
  },
]

const ALL_TYPES = ['All', 'Holiday Clinic', 'Advanced Training', 'Skills Focus', 'Beginner', 'Elite / Rep']

function SessionCard({ session }: { session: Session }) {
  const isFull = session.spots === 0
  const isLow = session.spots > 0 && session.spots <= 4

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
        {/* Date + status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 52,
              borderRadius: 2,
              bgcolor: isFull ? 'grey.200' : 'primary.dark',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.4rem',
                color: isFull ? 'text.secondary' : '#fff',
                lineHeight: 1,
              }}
            >
              {session.day}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.65rem',
                color: isFull ? 'text.secondary' : 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {session.month}
            </Typography>
          </Box>

          <Chip
            label={isFull ? 'Full' : isLow ? `${session.spots} left` : 'Open'}
            size="small"
            sx={{
              bgcolor: isFull
                ? 'error.light'
                : isLow
                ? 'warning.light'
                : 'success.light',
              color: isFull ? 'error.dark' : isLow ? 'warning.dark' : 'success.dark',
              fontWeight: 700,
              fontSize: '0.68rem',
            }}
          />
        </Box>

        {/* Type tag */}
        <Chip
          label={session.type}
          size="small"
          sx={{
            mb: 1.5,
            bgcolor: 'rgba(29,110,74,0.07)',
            color: 'primary.main',
            fontSize: '0.68rem',
            fontWeight: 600,
          }}
        />

        <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
          {session.title}
        </Typography>

        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{session.time}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{session.venue}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PeopleIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{session.ages}</Typography>
          </Box>
        </Stack>
      </CardContent>

      {/* Footer */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
          {session.price}
        </Typography>
        <Button
          variant={isFull ? 'outlined' : 'contained'}
          color="primary"
          size="small"
          href="#contact"
          disabled={false}
          sx={{
            fontSize: '0.78rem',
            px: 2,
            py: 0.8,
            ...(isFull && {
              borderColor: 'divider',
              color: 'text.secondary',
            }),
          }}
        >
          {isFull ? 'Waitlist' : 'Book now'}
        </Button>
      </Box>
    </Card>
  )
}

export default function ScheduleSection() {
  const [activeTab, setActiveTab] = useState(0)

  const filteredSessions =
    activeTab === 0
      ? SESSIONS
      : SESSIONS.filter((s) => s.type === ALL_TYPES[activeTab])

  return (
    <Box
      id="schedule"
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: { xs: 5, md: 6 } }}>
          <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1.5 }}>
            Upcoming sessions
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: 'secondary.main' }}>
              Book your spot
            </Typography>
            <Button
              variant="text"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              href="#contact"
              sx={{ fontWeight: 600 }}
            >
              View all sessions
            </Button>
          </Box>
        </Box>

        {/* Filter tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 4,
            '& .MuiTabs-indicator': { bgcolor: 'primary.main' },
            '& .Mui-selected': { color: 'primary.main !important', fontWeight: 600 },
            '& .MuiTab-root': { textTransform: 'none', fontSize: '0.875rem', minWidth: 'auto', px: 2 },
          }}
        >
          {ALL_TYPES.map((type) => (
            <Tab key={type} label={type} />
          ))}
        </Tabs>

        {/* Session grid */}
        <Grid container spacing={3}>
          {filteredSessions.map((session, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
              <SessionCard session={session} />
            </Grid>
          ))}
          {filteredSessions.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography color="text.secondary">No sessions in this category right now.</Typography>
                <Button variant="text" color="primary" href="#contact" sx={{ mt: 1 }}>
                  Contact us to arrange one
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  )
}
