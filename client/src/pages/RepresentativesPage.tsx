import React, { useState, useEffect, useRef } from 'react'
import {
  Box, Container, Typography, Card, CardContent, Chip, Grid, Avatar,
  Dialog, DialogContent, IconButton, Button,
} from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import PublicIcon from '@mui/icons-material/Public'
import CloseIcon from '@mui/icons-material/Close'
import { REPRESENTATIVES, AUSTRALIAN_REPRESENTATIVES } from '../data/representatives'
import type { Representative, AustralianRepresentative } from '../data/representatives'
import { useNavigate, useLocation } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { CLOUDINARY_BASE } from '../config/cloudinary'
const CLOUDINARY = CLOUDINARY_BASE

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  const first = parts[0]
  if (first.length >= 2) return first.slice(0, 2).toUpperCase()
  return (first[0] + (parts[1]?.[0] ?? '')).toUpperCase()
}

function parseHonour(honour: string): { team: string; years: string } {
  const match = honour.match(/^(.*?)\s*\(([^)]+)\)\s*$/)
  if (!match) return { team: honour, years: '' }
  return { team: match[1].trim(), years: match[2].trim() }
}

// ── Dialogs ──────────────────────────────────────────────────────────────────

function StateDialog({ player, onClose }: { player: Representative | null; onClose: () => void }) {
  const bg = player?.image ? `${CLOUDINARY}/${ACTION_SHOTS[player.image] ?? player.image}` : undefined
  return (
    <Dialog
      open={!!player}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      disableScrollLock
      slotProps={{
        paper: {
          sx: {
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden',
            ...(bg ? {
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 15%',
              '&::before': { content: '""', position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(1,13,42,0.42) 0%, rgba(2,26,74,0.35) 100%)', zIndex: 0 },
            } : { bgcolor: '#021a4a' }),
          },
        },
      }}
    >
      {player && (
        <DialogContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={player.image ? `${CLOUDINARY}/${player.image}` : undefined}
                sx={{
                  width: 80, height: 80,
                  border: '2px solid #f5c842',
                  bgcolor: 'rgba(245,200,66,0.12)',
                  color: '#f5c842',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.5rem',
                  '& img': { objectFit: 'cover', objectPosition: 'center 5%' },
                }}
              >
                {getInitials(player.name)}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1rem', sm: '1.25rem' }, whiteSpace: 'nowrap' }}>{player.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.4 }}>
                  <EmojiEventsIcon sx={{ color: '#f5c842', fontSize: '0.95rem' }} />
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                    {player.honours.length} honour{player.honours.length > 1 ? 's' : ''}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <IconButton onClick={onClose} size="small" sx={{ color: 'rgba(255,255,255,0.5)', mt: -0.5 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ bgcolor: 'rgba(0,0,0,0.25)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.06)' }}>
            {(() => {
              const MIN = 3
              const padded = [...player.honours]
              while (padded.length < MIN) padded.push('')
              return padded.map((honour, idx) => {
                const isEmpty = !honour
                const { team, years } = honour ? parseHonour(honour) : { team: '', years: '' }
                const nextIsReal = !isEmpty && !!padded[idx + 1]
                return (
                  <Box
                    key={honour || `pad-${idx}`}
                    sx={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2,
                      px: 2, py: 1.2,
                      borderBottom: nextIsReal ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      minHeight: 40,
                    }}
                  >
                    {!isEmpty && <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 600 }}>{team}</Typography>}
                    {!isEmpty && years && (
                      <Typography sx={{ color: '#f5c842', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}>
                        {years}
                      </Typography>
                    )}
                  </Box>
                )
              })
            })()}
          </Box>
        </DialogContent>
      )}
    </Dialog>
  )
}

const vishwaState = REPRESENTATIVES.find(r => r.name === 'Vishwa Ramkumar')

function AusDialog({ player, onClose }: { player: AustralianRepresentative | null; onClose: () => void }) {
  return (
    <Dialog
      open={!!player}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      disableScrollLock
      slotProps={{
        paper: {
          sx: {
            border: '1px solid rgba(245,200,66,0.3)', borderRadius: 4, overflow: 'hidden',
            backgroundImage: `url(${CLOUDINARY}/vish-aus.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: '70% 20%',
            '&::before': { content: '""', position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(1,13,42,0.42) 0%, rgba(2,26,74,0.35) 100%)', zIndex: 0 },
          },
        },
      }}
    >
      {player && (
        <DialogContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={player.image ? `${CLOUDINARY}/${player.image}` : undefined}
                sx={{
                  width: 80, height: 80,
                  border: '2px solid #f5c842',
                  bgcolor: 'rgba(245,200,66,0.12)',
                  color: '#f5c842',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.5rem',
                  '& img': { objectFit: 'cover', objectPosition: 'center 5%' },
                }}
              >
                {getInitials(player.name)}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>{player.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.4 }}>
                  <PublicIcon sx={{ color: '#f5c842', fontSize: '0.95rem' }} />
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                    {player.tours.length} Australian honour{player.tours.length > 1 ? 's' : ''}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <IconButton onClick={onClose} size="small" sx={{ color: 'rgba(255,255,255,0.5)', mt: -0.5 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Australian Duties */}
          <Typography sx={{ color: '#f5c842', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', mb: 1 }}>
            🇦🇺 AUSTRALIAN DUTIES
          </Typography>
          <Box sx={{ bgcolor: 'rgba(0,0,0,0.25)', borderRadius: 2, border: '1px solid rgba(245,200,66,0.15)', mb: vishwaState ? 2.5 : 0 }}>
            {player.tours.map((tour, idx) => (
              <Box
                key={`${tour.team}-${tour.year}`}
                sx={{
                  px: 2, py: 1.2,
                  borderBottom: idx < player.tours.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 600 }}>
                    {tour.team}
                  </Typography>
                  <Typography sx={{ color: '#f5c842', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}>
                    {tour.year}
                  </Typography>
                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.74rem', mt: 0.3 }}>
                  {tour.detail}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* State Honours (Vishwa only) */}
          {vishwaState && (
            <>
              <Typography sx={{ color: 'rgba(126,184,245,0.9)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', mb: 1 }}>
                🏏 STATE HONOURS
              </Typography>
              <Box sx={{ bgcolor: 'rgba(0,0,0,0.25)', borderRadius: 2, border: '1px solid rgba(126,184,245,0.15)' }}>
                {vishwaState.honours.map((honour, idx) => {
                  const { team, years } = parseHonour(honour)
                  return (
                    <Box
                      key={honour}
                      sx={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2,
                        px: 2, py: 1.2,
                        borderBottom: idx < vishwaState.honours.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      }}
                    >
                      <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 600 }}>{team}</Typography>
                      {years && (
                        <Typography sx={{ color: 'rgba(126,184,245,0.9)', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}>
                          {years}
                        </Typography>
                      )}
                    </Box>
                  )
                })}
              </Box>
            </>
          )}
        </DialogContent>
      )}
    </Dialog>
  )
}

// ── Shooting stars background ─────────────────────────────────────────────────

interface Star {
  x: number; y: number; len: number; speed: number
  alpha: number; fade: number; active: boolean; gold: boolean; trail: number
}

function makeStar(w: number, h: number, active = false): Star {
  return {
    x: Math.random() * (w + 200) - 100,
    y: Math.random() * h * 0.6,
    len: 80 + Math.random() * 180,
    speed: 6 + Math.random() * 10,
    alpha: active ? 0 : -Math.random(),
    fade: 0.012 + Math.random() * 0.01,
    active,
    gold: Math.random() < 0.3,
    trail: 0.3 + Math.random() * 0.5,
  }
}

function ShootingStarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let frame: number
    let stars: Star[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      // static background dots
      stars = [
        ...Array.from({ length: 60 }, () => makeStar(canvas.width, canvas.height, false)),
        ...Array.from({ length: 6 },  () => makeStar(canvas.width, canvas.height, true)),
      ]
    }
    resize()
    window.addEventListener('resize', resize)

    // static twinkle stars
    const staticStars = Array.from({ length: 120 }, () => ({
      x: Math.random() * 99999,
      y: Math.random() * 99999,
      r: Math.random() * 1.2,
      alpha: 0.1 + Math.random() * 0.4,
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.03,
    }))

    let t = 0
    const draw = () => {
      t += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width, h = canvas.height

      // twinkle dots
      staticStars.forEach(s => {
        const a = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed + s.twinkle))
        ctx.beginPath()
        ctx.arc(s.x % w, s.y % h, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${a})`
        ctx.fill()
      })

      // shooting stars
      stars.forEach(s => {
        s.alpha += s.fade
        if (s.alpha <= 0) return

        if (s.alpha > 1) {
          // fade out
          s.alpha -= s.fade * 3
          if (s.alpha <= 0) {
            Object.assign(s, makeStar(w, h, true))
            return
          }
        }

        s.x += s.speed
        s.y += s.speed * 0.45

        const alpha = Math.min(s.alpha, 1)
        const color = s.gold ? `rgba(245,200,66,${alpha})` : `rgba(255,255,255,${alpha})`
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.len * s.trail, s.y - s.len * s.trail * 0.45)
        grad.addColorStop(0, color)
        grad.addColorStop(1, 'rgba(255,255,255,0)')

        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - s.len * s.trail, s.y - s.len * s.trail * 0.45)
        ctx.strokeStyle = grad
        ctx.lineWidth = s.gold ? 1.5 : 1
        ctx.stroke()

        // head glow
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.gold ? 1.8 : 1.2, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()

        if (s.x > w + 200 || s.y > h + 100) Object.assign(s, makeStar(w, h, true))
      })

      frame = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const cardHoverSx = {
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
  },
}

// Per-card action photo overrides — players with known action shots
const ACTION_SHOTS: Record<string, string> = {
  'aiman-nadeem.png': 'aiman-vic1.jpg',
  'reyaan-farooq.png': 'reyaan-vic.jpg',
  'noura-abdulqadeer.png': 'noura-vic.jpg',
  'ali-khan.png': 'ali-vic.jpg',
  'ritin-raman.png': 'ritin-vic.jpg',
  'shaurya-mahadik.png': 'shaurya-vic.jpg',
  'abhik-nomula.png': 'abhik-vic.jpg',
  'sarim-tamoor.png': 'sarim-vic.jpg',
  'aayan-nadeem.png' : 'aayan-vic.jpg',
  'jujhar-singh-tamber.png': 'jujhar-vic.jpg',

}

// Background position per player — tweak xs (mobile) and md (desktop) independently
const BG_POSITIONS: Record<string, { xs: string; md: string }> = {
  'vishwa-ramkumar1.png': { xs: '90% 20%', md: '90% 50%' }, // Australian card
  'aiman-nadeem.png':     { xs: '40% 15%', md: 'center 15%' },
  'reyaan-farooq.png':    { xs: 'center 15%', md: 'center 15%' },
  'noura-abdulqadeer.png':{ xs: 'center 15%', md: 'center 15%' },
  'ali-khan.png':         { xs: 'center 15%', md: 'center 15%' },
  'ritin-raman.png':      { xs: 'center 15%', md: 'center 15%' },
  'aayan-nadeem.png':     { xs: 'center 10%', md: 'center 10%' },
  'santosh-remireddy.png':{ xs: 'center 10%', md: 'center 10%' },
  'abhik-nomula.png':     { xs: 'center 10%', md: 'center 10%' },
  'sarim-tamoor.png':     { xs: 'center 10%', md: 'center 10%' },
  'jujhar-singh-tamber.png':{ xs: 'center 10%', md: 'center 10%' },
  'shaurya-mahadik.png':  { xs: 'center 10%', md: 'center 10%' },
  'jujhar-vic.jpg': { xs: 'center 30%', md: 'center 30%' },

}

function cardBgSrc(image: string | null): string {
  if (!image) return ''
  return ACTION_SHOTS[image] ?? image
}

function cardBgPos(image: string | null): { xs: string; md: string } {
  if (!image) return { xs: 'center 10%', md: 'center 10%' }
  return BG_POSITIONS[image] ?? { xs: 'center 10%', md: 'center 10%' }
}

export default function RepresentativesPage() {
  const [selectedState, setSelectedState] = useState<Representative | null>(null)
  const [selectedAus, setSelectedAus] = useState<AustralianRepresentative | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const fromExplore = (location.state as any)?.from === 'explore'

  // Filter Vishwa out of state grid — he's merged into the Australian card
  const stateReps = [...REPRESENTATIVES]
    .filter(r => r.name !== 'Vishwa Ramkumar')
    .sort((a, b) => b.honours.length - a.honours.length)

  return (
    <Box
      component="main"
      sx={{
        background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <ShootingStarsCanvas />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 10, md: 12 }, pb: { xs: 8, md: 12 } }}>
        {/* Back button */}
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => fromExplore ? navigate('/#explore') : navigate('/')}
            sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#f5c842' }, pl: 0 }}
          >
            {fromExplore ? 'Back' : 'Home'}
          </Button>
        </Box>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Chip
            label="National & State Competitions"
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
          <Typography variant="h1" sx={{ fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' }, color: '#ffffff', mb: 1 }}>
            National Competitions
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.62)', maxWidth: 620, mx: 'auto', fontSize: { xs: '1rem', md: '1.05rem' } }}
          >
            We're proud of every T&H Cricket player who has gone on to compete at state and national level. Here
            are our players who have been selected for Australian and Victorian representative squads.
          </Typography>
        </Box>

        {/* Australian Representatives */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <PublicIcon sx={{ color: '#f5c842' }} />
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, color: '#f5c842' }}>
              Australian Representatives
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 480, width: '100%' }}>
            {AUSTRALIAN_REPRESENTATIVES.map((player) => (
              <Grid key={player.id} size={{ xs: 12 }}>
                <Card
                  onClick={() => setSelectedAus(player)}
                  sx={{
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                    border: '1px solid rgba(245,200,66,0.35)',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundImage: `url(${CLOUDINARY}/vish-aus.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: { ...cardBgPos(player.image) },
                    '&::before': {
                      content: '""', position: 'absolute', inset: 0,
                      background: 'linear-gradient(160deg, rgba(1,13,42,0.42) 0%, rgba(2,26,74,0.35) 100%)',
                    },
                    ...cardHoverSx,
                  }}
                >
                  <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                      <Avatar
                        src={player.image ? `${CLOUDINARY}/${player.image}` : undefined}
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
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2 }}>
                          {player.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.4 }}>
                          <PublicIcon sx={{ color: '#f5c842', fontSize: '0.9rem' }} />
                          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                            {player.tours.length} Australian honour{player.tours.length > 1 ? 's' : ''}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Australian duties label */}
                    <Typography sx={{ color: '#f5c842', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.14em', mb: 0.75 }}>
                      🇦🇺 AUSTRALIAN DUTIES
                    </Typography>
                    <Box sx={{ bgcolor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(245,200,66,0.12)', borderRadius: 2, mb: vishwaState ? 1.5 : 0 }}>
                      {player.tours.map((tour, idx) => (
                        <Box
                          key={`${tour.team}-${tour.year}`}
                          sx={{ px: 2, py: 1.1, borderBottom: idx < player.tours.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                            <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', fontWeight: 600 }}>{tour.team}</Typography>
                            <Typography sx={{ color: '#f5c842', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}>{tour.year}</Typography>
                          </Box>
                          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.74rem', mt: 0.3 }}>{tour.detail}</Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* State honours merged */}
                    {vishwaState && (
                      <>
                        <Typography sx={{ color: 'rgba(126,184,245,0.9)', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.14em', mb: 0.75 }}>
                          🏏 STATE HONOURS
                        </Typography>
                        <Box sx={{ bgcolor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(126,184,245,0.15)', borderRadius: 2 }}>
                          {vishwaState.honours.map((honour, idx) => {
                            const { team, years } = parseHonour(honour)
                            return (
                              <Box
                                key={honour}
                                sx={{
                                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2,
                                  px: 2, py: 1.1,
                                  borderBottom: idx < vishwaState.honours.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                }}
                              >
                                <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', fontWeight: 600 }}>{team}</Typography>
                                {years && (
                                  <Typography sx={{ color: 'rgba(126,184,245,0.9)', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}>
                                    {years}
                                  </Typography>
                                )}
                              </Box>
                            )
                          })}
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          </Box>
        </Box>

        {/* State Representatives */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <EmojiEventsIcon sx={{ color: '#f5c842' }} />
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, color: '#ffffff' }}>
              State Representatives
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {stateReps.map((player) => {
              const bgSrc = cardBgSrc(player.image)
              const bgPos = cardBgPos(player.image)
              return (
                <Grid key={player.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    onClick={() => setSelectedState(player)}
                    sx={{
                      height: '100%', display: 'flex', flexDirection: 'column',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 4,
                      overflow: 'hidden',
                      position: 'relative',
                      ...(bgSrc ? {
                        backgroundImage: `url(${CLOUDINARY}/${bgSrc})`,
                        backgroundSize: 'cover',
                        backgroundPosition: { ...bgPos },
                        '&::before': {
                          content: '""', position: 'absolute', inset: 0,
                          background: 'linear-gradient(160deg, rgba(1,13,42,0.42) 0%, rgba(2,26,74,0.35) 100%)',
                        },
                      } : {
                        bgcolor: 'rgba(255,255,255,0.05)',
                      }),
                      ...cardHoverSx,
                    }}
                  >
                    <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative', zIndex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                        <Avatar
                          src={player.image ? `${CLOUDINARY}/${player.image}` : undefined}
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
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2 }}>
                            {player.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.4 }}>
                            <EmojiEventsIcon sx={{ color: '#f5c842', fontSize: '0.9rem' }} />
                            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                              {player.honours.length} representative honour{player.honours.length > 1 ? 's' : ''}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ bgcolor: 'rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 2, flexGrow: 1 }}>
                        {(() => {
                          const MIN = 3
                          const padded = [...player.honours]
                          while (padded.length < MIN) padded.push('')
                          return padded.map((honour, idx) => {
                            const isEmpty = !honour
                            const { team, years } = honour ? parseHonour(honour) : { team: '', years: '' }
                            const nextIsReal = !isEmpty && !!padded[idx + 1]
                            return (
                              <Box
                                key={honour || `pad-${idx}`}
                                sx={{
                                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2,
                                  px: 2, py: 1.1,
                                  borderBottom: nextIsReal ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                  minHeight: 38,
                                }}
                              >
                                {!isEmpty && <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', fontWeight: 600 }}>{team}</Typography>}
                                {!isEmpty && years && (
                                  <Typography sx={{ color: '#f5c842', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}>
                                    {years}
                                  </Typography>
                                )}
                              </Box>
                            )
                          })
                        })()}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Container>

      <StateDialog player={selectedState} onClose={() => setSelectedState(null)} />
      <AusDialog player={selectedAus} onClose={() => setSelectedAus(null)} />
    </Box>
  )
}
