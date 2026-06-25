import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, Avatar, Chip, Button } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import PublicIcon from '@mui/icons-material/Public'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
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

const topReps = [...REPRESENTATIVES]
  .sort((a, b) => b.honours.length - a.honours.length)
  .slice(0, 5)

const sortedTours = [...TOURS].sort((a, b) =>
  a.status === 'upcoming' && b.status !== 'upcoming' ? -1 :
  b.status === 'upcoming' && a.status !== 'upcoming' ? 1 : 0
).slice(0, 5)

// ── Representatives panel ─────────────────────────────────────────────────────

interface RepsPanelProps { coachImages: Record<string, string> }

function RepsPanel({ coachImages }: RepsPanelProps) {
  const navigate = useNavigate()

  function getImage(name: string, fallback: string | null): string | undefined {
    const db = coachImages[name.toLowerCase()]
    if (db) return `${API_URL}${db}`
    if (fallback) return `${API_URL}${fallback}`
    return undefined
  }

  const ausRep = AUSTRALIAN_REPRESENTATIVES[0]

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 4,
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Panel header */}
      <Box
        sx={{
          px: 3, pt: 3, pb: 2,
          background: 'linear-gradient(135deg, rgba(245,200,66,0.08) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36, height: 36, borderRadius: 2,
              bgcolor: 'rgba(245,200,66,0.12)',
              border: '1px solid rgba(245,200,66,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <EmojiEventsIcon sx={{ color: '#f5c842', fontSize: '1.1rem' }} />
          </Box>
          <Box>
            <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.68rem', letterSpacing: '0.14em' }}>
              REPRESENTATIVES
            </Typography>
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>
              Our Players on the Big Stage
            </Typography>
          </Box>
        </Box>
        <Chip
          label={`${REPRESENTATIVES.length + AUSTRALIAN_REPRESENTATIVES.length}`}
          size="small"
          sx={{ bgcolor: 'rgba(245,200,66,0.12)', color: '#f5c842', fontWeight: 700, fontSize: '0.72rem', border: '1px solid rgba(245,200,66,0.2)' }}
        />
      </Box>

      {/* Content with fade */}
      <Box sx={{ position: 'relative', flex: 1, height: { xs: 320, md: 360 }, overflow: 'hidden' }}>
        <Box sx={{ px: 3, pt: 2.5, pb: 1 }}>

          {/* Australian rep — gold feature card */}
          {ausRep && (
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 2,
                background: 'linear-gradient(135deg, rgba(245,200,66,0.1) 0%, rgba(245,200,66,0.04) 100%)',
                border: '1px solid rgba(245,200,66,0.2)',
                borderRadius: 3, p: 1.75, mb: 2.5,
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Glow */}
              <Box sx={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', bgcolor: 'rgba(245,200,66,0.08)', filter: 'blur(20px)', pointerEvents: 'none' }} />
              <Avatar
                src={getImage(ausRep.name, ausRep.image)}
                sx={{
                  width: 54, height: 54,
                  border: '2px solid #f5c842',
                  bgcolor: 'rgba(245,200,66,0.15)',
                  color: '#f5c842',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1rem',
                  flexShrink: 0,
                  '& img': { objectFit: 'cover', objectPosition: 'center 5%' },
                }}
              >
                {getInitials(ausRep.name)}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                  {ausRep.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
                  <PublicIcon sx={{ color: '#f5c842', fontSize: '0.75rem' }} />
                  <Typography sx={{ color: '#f5c842', fontSize: '0.7rem', fontWeight: 700 }}>
                    Australian Representative
                  </Typography>
                </Box>
              </Box>
              <Chip label="AUS" size="small" sx={{ bgcolor: 'rgba(245,200,66,0.15)', color: '#f5c842', fontWeight: 800, fontSize: '0.65rem', border: '1px solid rgba(245,200,66,0.3)' }} />
            </Box>
          )}

          {/* State reps list */}
          {topReps.map((player, i) => (
            <Box
              key={player.id}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                py: 0.9,
                borderBottom: i < topReps.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}
            >
              <Avatar
                src={getImage(player.name, player.image)}
                sx={{
                  width: 38, height: 38,
                  border: '1.5px solid rgba(245,200,66,0.3)',
                  bgcolor: 'rgba(245,200,66,0.08)',
                  color: '#f5c842',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '0.78rem',
                  flexShrink: 0,
                  '& img': { objectFit: 'cover', objectPosition: 'center 5%' },
                }}
              >
                {getInitials(player.name)}
              </Avatar>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '0.85rem', flexGrow: 1 }}>
                {player.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <EmojiEventsIcon sx={{ color: 'rgba(245,200,66,0.6)', fontSize: '0.7rem' }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem' }}>
                  {player.honours.length}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Gradient fade */}
        <Box
          sx={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
            background: 'linear-gradient(to bottom, transparent, rgba(1,10,30,0.98))',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* CTA */}
      <Box sx={{ px: 3, pb: 3, pt: 1.5 }}>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/representatives')}
          fullWidth
          sx={{
            color: '#f5c842',
            borderColor: 'rgba(245,200,66,0.3)',
            py: 1, fontWeight: 700, fontSize: '0.82rem',
            borderRadius: 2.5,
            '&:hover': { borderColor: '#f5c842', bgcolor: 'rgba(245,200,66,0.06)' },
          }}
        >
          View All Representatives
        </Button>
      </Box>
    </Box>
  )
}

// ── Tours panel ───────────────────────────────────────────────────────────────

function ToursPanel() {
  const navigate = useNavigate()
  const upcoming = sortedTours.filter(t => t.status === 'upcoming')
  const completed = sortedTours.filter(t => t.status === 'completed')

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 4,
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Panel header */}
      <Box
        sx={{
          px: 3, pt: 3, pb: 2,
          background: 'linear-gradient(135deg, rgba(100,160,255,0.07) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36, height: 36, borderRadius: 2,
              bgcolor: 'rgba(100,160,255,0.1)',
              border: '1px solid rgba(100,160,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <FlightTakeoffIcon sx={{ color: '#7eb8f5', fontSize: '1.1rem' }} />
          </Box>
          <Box>
            <Typography sx={{ color: '#7eb8f5', fontWeight: 800, fontSize: '0.68rem', letterSpacing: '0.14em' }}>
              TOURS
            </Typography>
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>
              Cricket Around the World
            </Typography>
          </Box>
        </Box>
        {upcoming.length > 0 && (
          <Chip
            label={`${upcoming.length} upcoming`}
            size="small"
            sx={{ bgcolor: 'rgba(245,200,66,0.12)', color: '#f5c842', fontWeight: 700, fontSize: '0.68rem', border: '1px solid rgba(245,200,66,0.2)' }}
          />
        )}
      </Box>

      {/* Content */}
      <Box sx={{ position: 'relative', flex: 1, height: { xs: 320, md: 360 }, overflow: 'hidden' }}>
        <Box sx={{ px: 3, pt: 2.5, pb: 1 }}>

          {/* Upcoming tours */}
          {upcoming.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', mb: 1.25 }}>
                UPCOMING
              </Typography>
              {upcoming.map((tour) => (
                <Box
                  key={tour.id}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 2, mb: 1.5,
                    background: 'linear-gradient(135deg, rgba(245,200,66,0.06) 0%, rgba(245,200,66,0.02) 100%)',
                    border: '1px solid rgba(245,200,66,0.15)',
                    borderRadius: 2.5, p: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 36, height: 36, borderRadius: 2,
                      bgcolor: 'rgba(245,200,66,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}
                  >
                    <FlightTakeoffIcon sx={{ color: '#f5c842', fontSize: '1rem' }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.2 }}>
                      {tour.name}
                    </Typography>
                    <Typography sx={{ color: 'rgba(245,200,66,0.75)', fontSize: '0.7rem', mt: 0.2 }}>
                      {tour.dates ?? tour.location}
                    </Typography>
                  </Box>
                  <Chip label="Soon" size="small" sx={{ bgcolor: 'rgba(245,200,66,0.15)', color: '#f5c842', fontWeight: 700, fontSize: '0.62rem', border: '1px solid rgba(245,200,66,0.25)' }} />
                </Box>
              ))}
            </Box>
          )}

          {/* Completed tours */}
          {completed.length > 0 && (
            <Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', mb: 1.25 }}>
                COMPLETED
              </Typography>
              {completed.map((tour, i) => (
                <Box
                  key={tour.id}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 1.5, py: 0.9,
                    borderBottom: i < completed.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                >
                  <CheckCircleIcon sx={{ color: 'rgba(77,214,138,0.5)', fontSize: '0.95rem', flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.84rem' }}>
                      {tour.name}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem' }}>
                      {tour.location} · {tour.year}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Gradient fade */}
        <Box
          sx={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
            background: 'linear-gradient(to bottom, transparent, rgba(1,10,30,0.98))',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* CTA */}
      <Box sx={{ px: 3, pb: 3, pt: 1.5 }}>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/tours')}
          fullWidth
          sx={{
            color: '#7eb8f5',
            borderColor: 'rgba(126,184,245,0.3)',
            py: 1, fontWeight: 700, fontSize: '0.82rem',
            borderRadius: 2.5,
            '&:hover': { borderColor: '#7eb8f5', bgcolor: 'rgba(126,184,245,0.06)' },
          }}
        >
          View All Tours
        </Button>
      </Box>
    </Box>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

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
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #010d2a 0%, #011535 40%, #021a4a 100%)',
      }}
    >
      {/* Background grid */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0)`,
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient glows */}
      <Box sx={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', bgcolor: 'rgba(245,200,66,0.04)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: '10%', right: '5%', width: 360, height: 360, borderRadius: '50%', bgcolor: 'rgba(100,160,255,0.05)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

        {/* Section heading */}
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ height: 2, width: 32, bgcolor: '#f5c842', borderRadius: 1 }} />
            <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.16em' }}>
              EXPLORE MORE
            </Typography>
          </Box>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' }, color: '#fff', fontWeight: 900, lineHeight: 1.1, mb: 1.5 }}
          >
            Beyond the{' '}
            <Box component="span" sx={{ color: '#f5c842' }}>Boundary</Box>
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', maxWidth: 460 }}>
            Our players represent at the highest levels. Our teams travel the world. Explore what T&H Cricket looks like beyond the training ground.
          </Typography>
        </Box>

        {/* Panels */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'stretch' }}>
          <RepsPanel coachImages={coachImages} />
          <ToursPanel />
        </Box>
      </Container>
    </Box>
  )
}
