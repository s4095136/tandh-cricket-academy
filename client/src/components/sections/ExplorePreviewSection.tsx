import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, Avatar, Chip, Button } from '@mui/material'
import { motion, type Variants } from 'framer-motion'

const MotionBox = motion(Box)
const MotionTypography = motion(Typography)

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import PublicIcon from '@mui/icons-material/Public'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom'
import { REPRESENTATIVES, AUSTRALIAN_REPRESENTATIVES } from '../../data/representatives'
import { TOURS } from '../../data/tours'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
import { CLOUDINARY_BASE } from '../../config/cloudinary'

const CLOUDINARY = CLOUDINARY_BASE

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  const first = parts[0]
  if (first.length >= 2) return first.slice(0, 2).toUpperCase()
  return (first[0] + (parts[1]?.[0] ?? '')).toUpperCase()
}

const ausNames = new Set(AUSTRALIAN_REPRESENTATIVES.map(r => r.name.toLowerCase()))

const sortedDomestic = [...REPRESENTATIVES]
  .filter(r => !ausNames.has(r.name.toLowerCase()))
  .sort((a, b) => b.honours.length - a.honours.length)

const topStateRep = sortedDomestic[0] ?? null
const topReps = sortedDomestic.slice(1, 5)

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

  if (db) return `${CLOUDINARY}/${db}`
  if (fallback) return `${CLOUDINARY}/${fallback}`

  return undefined
}

const ausRep = AUSTRALIAN_REPRESENTATIVES[0]

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        backgroundImage: 'url(https://res.cloudinary.com/dnubhsrlt/image/upload/f_auto,q_auto/vishwa-aus.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, rgba(1,13,42,0.55) 0%, rgba(2,26,74,0.62) 50%, rgba(1,10,30,0.75) 100%)',
          zIndex: 0,
        },
        '& > *': { position: 'relative', zIndex: 1 },
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
            <>
            {/* AUSTRALIAN REPRESENTATIVE label */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
              <Box sx={{ width: 3, height: 12, borderRadius: 1, bgcolor: '#f5c842', flexShrink: 0 }} />
              <Typography sx={{ color: '#f5c842', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.16em' }}>
                AUSTRALIAN REPRESENTATIVE
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 2,
                background: 'linear-gradient(120deg, rgba(245,200,66,0.13) 0%, rgba(245,200,66,0.05) 60%, transparent 100%)',
                border: '1px solid rgba(245,200,66,0.25)',
                borderLeft: '3px solid rgba(245,200,66,0.7)',
                borderRadius: 2.5, p: 1.75, mb: 2.5,
                position: 'relative', overflow: 'hidden',
              }}
            >
              <Avatar
                src={getImage(ausRep.name, ausRep.image)}
                sx={{
                  width: 50, height: 50,
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
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.2 }}>
                  {ausRep.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.4 }}>
                  <PublicIcon sx={{ color: '#f5c842', fontSize: '0.72rem' }} />
                  <Typography sx={{ color: '#f5c842', fontSize: '0.68rem', fontWeight: 700 }}>
                    Australian Representative
                  </Typography>
                </Box>
                {(() => {
                  const stateHonours = REPRESENTATIVES.find(r => r.name === ausRep.name)?.honours.length ?? 0
                  return stateHonours > 0 ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
                      <EmojiEventsIcon sx={{ color: '#7eb8f5', fontSize: '0.68rem' }} />
                      <Typography sx={{ color: '#7eb8f5', fontSize: '0.64rem', fontWeight: 700 }}>
                        {stateHonours} State Honours
                      </Typography>
                    </Box>
                  ) : null
                })()}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                <Chip label="🇦🇺 AUS" size="small" sx={{ bgcolor: 'rgba(245,200,66,0.18)', color: '#f5c842', fontWeight: 800, fontSize: '0.62rem', border: '1px solid rgba(245,200,66,0.35)', height: 20 }} />
                <Chip label="VIC" size="small" sx={{ bgcolor: 'rgba(126,184,245,0.15)', color: '#7eb8f5', fontWeight: 800, fontSize: '0.62rem', border: '1px solid rgba(126,184,245,0.3)', height: 20 }} />
              </Box>
            </Box>
            </>
          )}

          {/* STATE REPRESENTATIVES label + featured card */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
            <Box sx={{ width: 3, height: 12, borderRadius: 1, bgcolor: 'rgba(126,184,245,0.6)', flexShrink: 0 }} />
            <Typography sx={{ color: 'rgba(126,184,245,0.8)', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.16em' }}>
              STATE REPRESENTATIVES
            </Typography>
          </Box>

          {/* Top state rep — blue feature card (smaller than Vishwa's) */}
          {topStateRep && (
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                background: 'linear-gradient(120deg, rgba(126,184,245,0.1) 0%, rgba(126,184,245,0.04) 60%, transparent 100%)',
                border: '1px solid rgba(126,184,245,0.2)',
                borderLeft: '3px solid rgba(126,184,245,0.6)',
                borderRadius: 2, p: 1.25, mb: 1.5,
                position: 'relative', overflow: 'hidden',
              }}
            >
              <Avatar
                src={getImage(topStateRep.name, topStateRep.image)}
                sx={{
                  width: 42, height: 42,
                  border: '2px solid rgba(126,184,245,0.7)',
                  bgcolor: 'rgba(126,184,245,0.12)',
                  color: '#7eb8f5',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '0.85rem',
                  flexShrink: 0,
                  '& img': { objectFit: 'cover', objectPosition: 'center 5%' },
                }}
              >
                {getInitials(topStateRep.name)}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.82rem', lineHeight: 1.2 }}>
                  {topStateRep.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
                  <EmojiEventsIcon sx={{ color: '#7eb8f5', fontSize: '0.68rem' }} />
                  <Typography sx={{ color: '#7eb8f5', fontSize: '0.64rem', fontWeight: 700 }}>
                    {topStateRep.honours.length} State Honours
                  </Typography>
                </Box>
              </Box>
              <Chip label="VIC" size="small" sx={{ bgcolor: 'rgba(126,184,245,0.15)', color: '#7eb8f5', fontWeight: 800, fontSize: '0.6rem', border: '1px solid rgba(126,184,245,0.3)', height: 18 }} />
            </Box>
          )}

          {topReps.map((player, i) => (
            <Box
              key={player.id}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                py: 1,
                px: 1,
                borderRadius: 1.5,
                borderBottom: i < topReps.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <Avatar
                src={getImage(player.name, player.image)}
                sx={{
                  width: 36, height: 36,
                  border: '1.5px solid rgba(245,200,66,0.28)',
                  bgcolor: 'rgba(245,200,66,0.08)',
                  color: '#f5c842',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '0.72rem',
                  flexShrink: 0,
                  '& img': { objectFit: 'cover', objectPosition: 'center 5%' },
                }}
              >
                {getInitials(player.name)}
              </Avatar>
              <Typography sx={{ color: 'rgba(255,255,255,0.82)', fontWeight: 600, fontSize: '0.83rem', flexGrow: 1, lineHeight: 1.2 }}>
                {player.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: 'rgba(245,200,66,0.07)', border: '1px solid rgba(245,200,66,0.15)', borderRadius: 1, px: 0.75, py: 0.25 }}>
                <EmojiEventsIcon sx={{ color: 'rgba(245,200,66,0.7)', fontSize: '0.65rem' }} />
                <Typography sx={{ color: 'rgba(245,200,66,0.8)', fontSize: '0.65rem', fontWeight: 700 }}>
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
          onClick={() => navigate('/representatives', { state: { from: 'explore' } })}
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
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        backgroundImage: 'url(https://res.cloudinary.com/dnubhsrlt/image/upload/f_auto,q_auto/tour.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, rgba(1,13,42,0.55) 0%, rgba(2,26,74,0.62) 50%, rgba(1,10,30,0.75) 100%)',
          zIndex: 0,
        },
        '& > *': { position: 'relative', zIndex: 1 },
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
      <Box sx={{ position: 'relative', flex: 1, minHeight: { xs: 320, md: 360 }, overflow: 'hidden' }}>
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
          onClick={() => navigate('/tours', { state: { from: 'explore' } })}
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

// ── 1-on-1 panel ─────────────────────────────────────────────────────────────

const ONE_ON_ONE_COACHES = [
  { name: 'Aiman Nadeem', image: 'aiman-nadeem.png', role: 'Lead Coach', speciality: 'Batting & Fielding', pos: 'center 5%' },
  { name: 'Aayan Nadeem', image: 'aayan-nadeem.png', role: 'Coach',      speciality: 'Batting & Bowling',  pos: 'center 5%' },
  { name: 'Daksh Kumar',  image: 'daksh-kumar.png',  role: 'Coach',      speciality: 'Bowling & Fitness',  pos: 'center 5%' },
  { name: 'Ali Khan',     image: 'ali-khan.png',     role: 'Lead Coach', speciality: 'Batting & Strategy', pos: 'center 5%' },
]

const BENEFITS = [
  { icon: '🎯', label: 'Tailored to you' },
  { icon: '📈', label: 'Fast progress' },
  { icon: '🏆', label: 'Elite coaches' },
  { icon: '📅', label: 'Flexible booking' },
]

function OneOnOnePanel() {
  const navigate = useNavigate()
  const featured = ONE_ON_ONE_COACHES[0]
  const rest = ONE_ON_ONE_COACHES.slice(1)

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(245,200,66,0.12)',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(160deg, #05091a 0%, #010d2a 60%, #021a4a 100%)',
        '& > *': { position: 'relative', zIndex: 1 },
      }}
    >
      {/* Gold top accent */}
      <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 100, height: 2, background: 'linear-gradient(90deg, transparent, #f5c842, transparent)', zIndex: 2 }} />

      {/* Ambient glow */}
      <Box sx={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(245,200,66,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Panel header */}
      <Box sx={{
        px: 3, pt: 3, pb: 2,
        background: 'linear-gradient(135deg, rgba(245,200,66,0.06) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(245,200,66,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PersonIcon sx={{ color: '#f5c842', fontSize: '1.1rem' }} />
          </Box>
          <Box>
            <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.68rem', letterSpacing: '0.14em' }}>PRIVATE COACHING</Typography>
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>1-on-1 Sessions</Typography>
          </Box>
        </Box>
        <Chip
          label="Accepting Bookings"
          size="small"
          icon={<Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#48c878', ml: '6px !important', flexShrink: 0 }} />}
          sx={{ bgcolor: 'rgba(72,200,120,0.1)', color: '#48c878', fontWeight: 700, fontSize: '0.62rem', border: '1px solid rgba(72,200,120,0.25)', pl: 0.5 }}
        />
      </Box>

      {/* Featured coach card */}
      <Box sx={{ px: 3, pt: 2.5 }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.16em', mb: 1.25 }}>
          FEATURED COACH
        </Typography>
        <Box sx={{
          position: 'relative', borderRadius: '16px', overflow: 'hidden',
          height: 180, mb: 2,
          border: '1px solid rgba(245,200,66,0.18)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          backgroundImage: `url(${CLOUDINARY}/${featured.image})`,
          backgroundSize: '75% auto',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 15%',
          bgcolor: '#01080f',
        }}>
          {/* Gradient overlay */}
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,10,40,0.96) 0%, rgba(2,10,40,0.3) 55%, transparent 100%)' }} />
          {/* Gold top-line */}
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #f5c842 0%, rgba(245,200,66,0.3) 100%)' }} />
          {/* Info overlay */}
          <Box sx={{ position: 'absolute', bottom: 14, left: 16, right: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ color: '#f5c842', fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.12em', mb: 0.25 }}>
                {featured.role.toUpperCase()}
              </Typography>
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1rem', lineHeight: 1.1 }}>
                {featured.name}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', mt: 0.25 }}>
                {featured.speciality}
              </Typography>
            </Box>
            <Chip label="Available" size="small" sx={{ bgcolor: 'rgba(72,200,120,0.15)', color: '#48c878', fontWeight: 700, fontSize: '0.6rem', border: '1px solid rgba(72,200,120,0.3)', height: 20 }} />
          </Box>
        </Box>

        {/* Other coaches row */}
        <Typography sx={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.16em', mb: 1.25 }}>
          MORE COACHES
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5 }}>
          {rest.map((coach) => (
            <Box
              key={coach.name}
              sx={{
                flex: 1, position: 'relative', borderRadius: '12px', overflow: 'hidden',
                height: 100, border: '1px solid rgba(255,255,255,0.08)',
                backgroundImage: `url(${CLOUDINARY}/${coach.image})`,
                backgroundSize: '80% auto',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center 10%',
                bgcolor: '#01080f',
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: 'rgba(245,200,66,0.3)' },
              }}
            >
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(1,8,30,0.92) 0%, transparent 55%)' }} />
              <Box sx={{ position: 'absolute', bottom: 6, left: 7, right: 4 }}>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.62rem', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {coach.name.split(' ')[0]}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Benefits grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 2.5 }}>
          {BENEFITS.map(({ icon, label }) => (
            <Box
              key={label}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1,
                bgcolor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px',
                px: 1.25, py: 0.9,
              }}
            >
              <Typography sx={{ fontSize: '0.85rem', lineHeight: 1 }}>{icon}</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.7rem', fontWeight: 600 }}>{label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* CTA */}
      <Box sx={{ px: 3, pb: 3, mt: 'auto' }}>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/1on1', { state: { from: 'explore' } })}
          fullWidth
          sx={{
            bgcolor: '#f5c842', color: '#021a4a',
            py: 1.1, fontWeight: 800, fontSize: '0.85rem',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(245,200,66,0.25)',
            '&:hover': { bgcolor: '#e0b030', boxShadow: '0 6px 28px rgba(245,200,66,0.35)' },
          }}
        >
          Book a Session
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

      <Container maxWidth="lg" id="explore" sx={{ position: 'relative', zIndex: 1, scrollMarginTop: { xs: '72px', md: '80px' } }}>

        {/* Section heading */}
        <MotionBox
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{ mb: { xs: 5, md: 7 } }}
        >
          <MotionBox variants={fadeUp} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ height: 2, width: 32, bgcolor: '#f5c842', borderRadius: 1 }} />
            <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.16em' }}>
              EXPLORE MORE
            </Typography>
          </MotionBox>
          <MotionTypography
            variants={fadeUp}
            variant="h2"
            sx={{ fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' }, color: '#fff', fontWeight: 900, lineHeight: 1.1, mb: 1.5 }}
          >
            Beyond the{' '}
            <Box component="span" sx={{ color: '#f5c842' }}>Boundary</Box>
          </MotionTypography>
          <MotionTypography variants={fadeUp} sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', maxWidth: 460 }}>
            Our players represent at the highest levels. Our teams travel the world. Explore what T&H Cricket looks like beyond the training ground.
          </MotionTypography>
        </MotionBox>

        {/* Panels */}
        <MotionBox
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'stretch' }}
        >
          <MotionBox variants={fadeUp} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}><RepsPanel coachImages={coachImages} /></MotionBox>
          <MotionBox variants={fadeUp} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}><ToursPanel /></MotionBox>
          <MotionBox variants={fadeUp} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}><OneOnOnePanel /></MotionBox>
        </MotionBox>
      </Container>
    </Box>
  )
}
