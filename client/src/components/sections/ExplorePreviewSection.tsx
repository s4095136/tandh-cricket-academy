import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, Avatar, Chip, Button } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import PublicIcon from '@mui/icons-material/Public'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'
import { REPRESENTATIVES, AUSTRALIAN_REPRESENTATIVES } from '../../data/representatives'
import { TOURS } from '../../data/tours'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  const first = parts[0]
  if (first.length >= 2) return first.slice(0, 2).toUpperCase()
  return (first[0] + (parts[1]?.[0] ?? '')).toUpperCase()
}

// Top reps by honour count
const topReps = [...REPRESENTATIVES]
  .sort((a, b) => b.honours.length - a.honours.length)
  .slice(0, 6)

// Upcoming tours first, then completed
const sortedTours = [...TOURS].sort((a, b) =>
  a.status === 'upcoming' && b.status !== 'upcoming' ? -1 :
  b.status === 'upcoming' && a.status !== 'upcoming' ? 1 : 0
).slice(0, 5)

// ── Representatives panel ────────────────────────────────────────────────────

interface RepsPanelProps {
  coachImages: Record<string, string>
}

function RepsPanel({ coachImages }: RepsPanelProps) {
  const navigate = useNavigate()

  function getImage(name: string, fallback: string | null): string | undefined {
    const db = coachImages[name.toLowerCase()]
    if (db) return `${API_URL}${db}`
    if (fallback) return `${API_URL}${fallback}`
    return undefined
  }

  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 4,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box sx={{ px: 3, pt: 3, pb: 1.5, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <EmojiEventsIcon sx={{ color: '#f5c842', fontSize: '1.1rem' }} />
          <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.12em' }}>
            REPRESENTATIVES
          </Typography>
        </Box>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.15rem' }}>
          Our Players on the Big Stage
        </Typography>
      </Box>

      {/* Scrollable content with fade */}
      <Box sx={{ position: 'relative', height: { xs: 340, md: 380 }, overflow: 'hidden' }}>
        <Box sx={{ px: 3, pt: 2, pb: 1 }}>

          {/* Australian rep — gold highlight */}
          {AUSTRALIAN_REPRESENTATIVES.slice(0, 1).map((player) => (
            <Box
              key={player.id}
              sx={{
                display: 'flex', alignItems: 'center', gap: 2,
                bgcolor: 'rgba(245,200,66,0.07)',
                border: '1px solid rgba(245,200,66,0.25)',
                borderRadius: 3, p: 1.5, mb: 2,
              }}
            >
              <Avatar
                src={getImage(player.name, player.image)}
                sx={{
                  width: 56, height: 56,
                  border: '2px solid #f5c842',
                  bgcolor: 'rgba(245,200,66,0.12)',
                  color: '#f5c842',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.1rem',
                  flexShrink: 0,
                  '& img': { objectFit: 'cover', objectPosition: 'center 5%' },
                }}
              >
                {getInitials(player.name)}
              </Avatar>
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.92rem' }}>
                  {player.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
                  <PublicIcon sx={{ color: '#f5c842', fontSize: '0.78rem' }} />
                  <Typography sx={{ color: '#f5c842', fontSize: '0.73rem', fontWeight: 600 }}>
                    Australian Representative
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}

          {/* State reps */}
          {topReps.map((player) => (
            <Box
              key={player.id}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                py: 1,
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <Avatar
                src={getImage(player.name, player.image)}
                sx={{
                  width: 46, height: 46,
                  border: '1.5px solid rgba(245,200,66,0.5)',
                  bgcolor: 'rgba(245,200,66,0.1)',
                  color: '#f5c842',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '0.85rem',
                  flexShrink: 0,
                  '& img': { objectFit: 'cover', objectPosition: 'center 5%' },
                }}
              >
                {getInitials(player.name)}
              </Avatar>
              <Typography sx={{ color: 'rgba(255,255,255,0.88)', fontWeight: 600, fontSize: '0.88rem', flexGrow: 1 }}>
                {player.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <EmojiEventsIcon sx={{ color: '#f5c842', fontSize: '0.72rem' }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>
                  {player.honours.length}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Fade out */}
        <Box
          sx={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 110,
            background: 'linear-gradient(to bottom, transparent, rgba(2,10,35,0.98))',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Button */}
      <Box sx={{ px: 3, pb: 3, pt: 2, textAlign: 'center' }}>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/representatives')}
          fullWidth
          sx={{
            color: '#f5c842',
            borderColor: 'rgba(245,200,66,0.35)',
            py: 1.1, fontWeight: 600,
            '&:hover': { borderColor: '#f5c842', bgcolor: 'rgba(245,200,66,0.07)' },
          }}
        >
          Explore Representatives
        </Button>
      </Box>
    </Box>
  )
}

// ── Tours panel ──────────────────────────────────────────────────────────────

function ToursPanel() {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 4,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box sx={{ px: 3, pt: 3, pb: 1.5, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <FlightTakeoffIcon sx={{ color: '#f5c842', fontSize: '1.1rem' }} />
          <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.12em' }}>
            TOURS
          </Typography>
        </Box>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.15rem' }}>
          Cricket Around the World
        </Typography>
      </Box>

      {/* Scrollable content with fade */}
      <Box sx={{ position: 'relative', height: { xs: 340, md: 380 }, overflow: 'hidden' }}>
        <Box sx={{ px: 3, pt: 2, pb: 1 }}>
          {sortedTours.map((tour) => (
            <Box
              key={tour.id}
              sx={{
                py: 1.5,
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mb: 0.4 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.92)', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.3 }}>
                  {tour.name}
                </Typography>
                <Chip
                  label={tour.status === 'upcoming' ? 'Upcoming' : tour.year}
                  size="small"
                  sx={{
                    height: 20, fontSize: '0.65rem', fontWeight: 700, flexShrink: 0,
                    bgcolor: tour.status === 'upcoming' ? 'rgba(245,200,66,0.15)' : 'rgba(255,255,255,0.07)',
                    color: tour.status === 'upcoming' ? '#f5c842' : 'rgba(255,255,255,0.5)',
                    border: tour.status === 'upcoming' ? '1px solid rgba(245,200,66,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  }}
                />
              </Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.76rem' }}>
                {tour.location}
              </Typography>
              {tour.status === 'upcoming' && (
                <Typography sx={{ color: 'rgba(245,200,66,0.7)', fontSize: '0.72rem', mt: 0.3 }}>
                  {tour.dates}
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        {/* Fade out */}
        <Box
          sx={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 110,
            background: 'linear-gradient(to bottom, transparent, rgba(2,10,35,0.98))',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Button */}
      <Box sx={{ px: 3, pb: 3, pt: 2, textAlign: 'center' }}>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/tours')}
          fullWidth
          sx={{
            color: '#f5c842',
            borderColor: 'rgba(245,200,66,0.35)',
            py: 1.1, fontWeight: 600,
            '&:hover': { borderColor: '#f5c842', bgcolor: 'rgba(245,200,66,0.07)' },
          }}
        >
          Explore Tours
        </Button>
      </Box>
    </Box>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────

export default function ExplorePreviewSection() {
  const [coachImages, setCoachImages] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch(`${API_URL}/api/coaches`)
      .then(r => r.json())
      .then((coaches: { name: string; image: string | null }[]) => {
        const map: Record<string, string> = {}
        coaches.forEach(c => { if (c.image) map[c.name.toLowerCase()] = c.image })
        setCoachImages(map)
      })
      .catch(() => {})
  }, [])

  return (
    <Box
      id="explore"
      sx={{
        background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.9rem', sm: '2.6rem' }, color: '#fff', mb: 1 }}>
            Explore More
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
            Discover our representatives and tours around the world.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'stretch' }}>
          <RepsPanel coachImages={coachImages} />
          <ToursPanel />
        </Box>
      </Container>
    </Box>
  )
}
