import React, { useState, useEffect, useRef } from 'react'
import { Box, Container, Typography, Chip, Grid, Button, IconButton } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PublicIcon from '@mui/icons-material/Public'
import { motion, type Variants } from 'framer-motion'
import { TOURS } from '../data/tours'
import { CLOUDINARY_BASE } from '../config/cloudinary'
import { useTourApplyModal } from '../context/TourApplyModalContext'
import { useNavigate, useLocation } from 'react-router-dom'
import TourWorldMap from '../components/TourWorldMap'

const MotionBox = motion(Box)
const MotionTypography = motion(Typography)

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const TOUR_IMAGES: Record<number, string[]> = {
  2: [`${CLOUDINARY_BASE}/sale1.jpg`],
  3: Array.from({ length: 8 }, (_, i) => `${CLOUDINARY_BASE}/mackay${i + 1}.jpg`),
  4: Array.from({ length: 16 }, (_, i) => `${CLOUDINARY_BASE}/london${i + 1}.jpg`),
}


// ── Grid wave background ───────────────────────────────────────────────────
function GridWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let frame: number

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.022
      const W = canvas.width, H = canvas.height
      const COLS = Math.floor(W / 38)
      const ROWS = Math.floor(H / 38)
      const cw = W / COLS, rh = H / ROWS

      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const fx = c / COLS, fy = r / ROWS
          const wave =
            Math.sin(fx * Math.PI * 3 + t) * Math.cos(fy * Math.PI * 2 + t * 0.7) +
            Math.sin(fx * Math.PI * 1.5 + fy * Math.PI * 2.5 + t * 1.1) * 0.5
          const dy = wave * 14
          const x = c * cw
          const y = r * rh + dy
          const dist = Math.sqrt((fx - 0.5) ** 2 + (fy - 0.5) ** 2)
          const pulse = Math.sin(fx * 5 + t * 1.2) * 0.5 + 0.5
          const a = 0.06 + 0.28 * (1 - dist * 1.2) * pulse
          const gold = (Math.sin(c * 0.9 + t) * Math.sin(r * 1.1 + t * 0.8)) > 0.55
          const radius = gold ? 1.8 : 1.3

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = gold
            ? `rgba(245,200,66,${Math.min(a * 2.2, 0.75)})`
            : `rgba(160,195,255,${Math.min(a, 0.45)})`
          ctx.fill()
        }
      }

      frame = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

// ── Destination themes ─────────────────────────────────────────────────────
const DEST_THEME: Record<number, { bg: string; photo?: string }> = {
  5: {
    bg: 'linear-gradient(155deg, #004d3a 0%, #00291e 55%, #001410 100%)',
    photo: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=900&q=80', // Sri Lanka — Colombo city
  },
  6: {
    bg: 'linear-gradient(155deg, #012169 0%, #000e3d 55%, #00071f 100%)',
    photo: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80', // England — Tower Bridge, London
  },
}

// ── Upcoming tour card ─────────────────────────────────────────────────────
function UpcomingTourCard({ tour, onRegister }: { tour: (typeof TOURS)[0]; onRegister: () => void }) {
  const theme = DEST_THEME[tour.id] ?? { bg: 'linear-gradient(155deg, #021a4a, #010d2a)' }
  const destName = tour.location.split(',')[0]

  return (
    <MotionBox
      variants={fadeUp}
      sx={{
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.09)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 28px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(245,200,66,0.12)',
        },
      }}
    >
      {/* Destination visual */}
      <Box sx={{
        height: 220,
        background: theme.photo
          ? `url(${theme.photo}) center/cover no-repeat`
          : theme.bg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {/* Dark gradient overlay for photo cards */}
        {theme.photo && (
          <Box sx={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(2,5,15,0.35) 0%, rgba(2,5,15,0.65) 100%)',
          }} />
        )}
        {/* Subtle diagonal grid (gradient-only cards) */}
        {!theme.photo && (
          <Box sx={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 28px)',
          }} />
        )}
        {/* Ghost destination name */}
        <Typography sx={{
          position: 'absolute', bottom: -6, left: 14,
          fontSize: { xs: '4rem', md: '5.5rem' },
          fontWeight: 900,
          color: 'rgba(255,255,255,0.055)',
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          userSelect: 'none',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>
          {destName}
        </Typography>
        {/* Center icon + badge */}
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* <Typography sx={{ fontSize: '3.2rem', lineHeight: 1, mb: 1.5 }}>✈️</Typography> */}
          <Chip
            label="REGISTRATION OPEN"
            size="small"
            sx={{
              bgcolor: '#f5c842',
              color: '#021a4a',
              fontWeight: 800,
              fontSize: '0.58rem',
              letterSpacing: '0.14em',
              height: 22,
              borderRadius: '4px',
            }}
          />
        </Box>
        {/* Year badge */}
        <Box sx={{
          position: 'absolute', top: 14, right: 14,
          bgcolor: 'rgba(0,0,0,0.38)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: '8px',
          px: 1.5, py: 0.4,
        }}>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.06em' }}>
            {tour.year}
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{
        p: { xs: 2.5, md: 3 },
        bgcolor: 'rgba(255,255,255,0.03)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, mb: 0.5, fontSize: '1.2rem' }}>
          {tour.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
          <PublicIcon sx={{ color: '#f5c842', fontSize: 13 }} />
          <Typography sx={{ color: '#f5c842', fontWeight: 600, fontSize: '0.78rem' }}>
            {tour.location}{tour.dates ? ` · ${tour.dates}` : ''}
          </Typography>
        </Box>
        <Typography sx={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.72, fontSize: '0.875rem', mb: 2, flex: 1 }}>
          {tour.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 2.5 }}>
          {tour.highlights.map(h => (
            <Chip key={h} label={h} size="small" sx={{
              bgcolor: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.62)',
              fontSize: '0.67rem',
              fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.09)',
            }} />
          ))}
        </Box>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={onRegister}
          fullWidth
          sx={{
            bgcolor: 'rgba(245,200,66,0.12)',
            color: '#f5c842',
            fontWeight: 700,
            fontSize: '0.875rem',
            border: '1px solid rgba(245,200,66,0.28)',
            borderRadius: '10px',
            py: 1.3,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#f5c842',
              color: '#021a4a',
              boxShadow: '0 8px 24px rgba(245,200,66,0.28)',
            },
          }}
        >
          Register Now
        </Button>
      </Box>
    </MotionBox>
  )
}

// ── Completed tour card ────────────────────────────────────────────────────
function CompletedTourCard({
  tour, images, containIndices = new Set<number>(), reverse = false,
}: {
  tour: (typeof TOURS)[0]
  images: string[]
  containIndices?: Set<number>
  reverse?: boolean
}) {
  const [idx, setIdx] = useState(0)
  const [tick, setTick] = useState(0)
  const go = (next: number) => { setIdx((next + images.length) % images.length); setTick(t => t + 1) }

  useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), 3200)
    return () => clearInterval(t)
  }, [images.length, tick])

  const destName = tour.location.split(',')[0].toUpperCase()

  return (
    <MotionBox variants={fadeUp} sx={{
      borderRadius: '20px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.07)',
      bgcolor: 'rgba(255,255,255,0.025)',
      transition: 'border-color 0.3s ease',
      '&:hover': { borderColor: 'rgba(255,255,255,0.13)' },
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: reverse ? { xs: 'column', md: 'row-reverse' } : { xs: 'column', md: 'row' },
        minHeight: { md: 360 },
      }}>
        {/* Photo panel */}
        {images.length > 0 && (
          <Box sx={{
            width: { xs: '100%', md: '48%' },
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
            height: { xs: 260, md: 'auto' },
          }}>
            {images.map((src, i) => (
              <Box key={i} component="img" src={src} sx={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: containIndices.has(i) ? 'contain' : 'cover',
                opacity: i === idx ? 1 : 0,
                transition: 'opacity 0.7s ease',
              }} />
            ))}
            {/* Gradient fade toward text side */}
            <Box sx={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: reverse
                ? 'linear-gradient(to right, rgba(2,8,20,0.32), transparent 38%)'
                : 'linear-gradient(to left, rgba(2,8,20,0.32), transparent 38%)',
            }} />
            {images.length > 1 && (
              <>
                <IconButton onClick={() => go(idx - 1)} sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', p: 0.5, backdropFilter: 'blur(6px)', '&:hover': { bgcolor: 'rgba(245,200,66,0.2)', color: '#f5c842' } }}>
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => go(idx + 1)} sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', p: 0.5, backdropFilter: 'blur(6px)', '&:hover': { bgcolor: 'rgba(245,200,66,0.2)', color: '#f5c842' } }}>
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
                {/* Pill progress indicators */}
                <Box sx={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 0.5 }}>
                  {images.map((_, i) => (
                    <Box key={i} onClick={() => go(i)} sx={{
                      height: 4,
                      width: i === idx ? 20 : 4,
                      borderRadius: '2px',
                      bgcolor: i === idx ? '#f5c842' : 'rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }} />
                  ))}
                </Box>
              </>
            )}
          </Box>
        )}

        {/* Text panel */}
        <Box sx={{
          flex: 1,
          p: { xs: 3, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Ghost destination watermark */}
          <Typography sx={{
            position: 'absolute',
            bottom: -20,
            right: -10,
            fontSize: { xs: '5rem', md: '8rem' },
            fontWeight: 900,
            color: 'rgba(255,255,255,0.032)',
            letterSpacing: '-0.04em',
            userSelect: 'none',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}>
            {destName}
          </Typography>

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2.5, flexWrap: 'wrap' }}>
              <Chip label={tour.year} size="small" sx={{ bgcolor: 'rgba(245,200,66,0.1)', color: '#f5c842', border: '1px solid rgba(245,200,66,0.22)', fontWeight: 700, fontSize: '0.7rem' }} />
              <Chip
                label="COMPLETED"
                size="small"
                icon={<CheckCircleIcon sx={{ fontSize: '11px !important', color: 'rgba(80,200,80,0.8) !important' }} />}
                sx={{ bgcolor: 'rgba(80,200,80,0.07)', color: 'rgba(80,200,80,0.8)', border: '1px solid rgba(80,200,80,0.18)', fontWeight: 700, fontSize: '0.65rem' }}
              />
            </Box>
            <Typography sx={{
              color: '#fff',
              fontWeight: 800,
              mb: 0.75,
              fontSize: { xs: '1.5rem', md: '1.9rem' },
              letterSpacing: '-0.015em',
              lineHeight: 1.1,
            }}>
              {tour.name}
            </Typography>
            <Typography sx={{ color: '#f5c842', fontWeight: 600, fontSize: '0.82rem', mb: 2 }}>
              📍 {tour.location}{tour.dates ? ` · ${tour.dates}` : ''}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.75, fontSize: '0.9rem', mb: 2.5, maxWidth: 460 }}>
              {tour.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
              {tour.highlights.map(h => (
                <Chip key={h} label={h} size="small" sx={{
                  bgcolor: 'rgba(255,255,255,0.055)',
                  color: 'rgba(255,255,255,0.58)',
                  fontSize: '0.68rem',
                  border: '1px solid rgba(255,255,255,0.08)',
                }} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </MotionBox>
  )
}

// ── Section divider ────────────────────────────────────────────────────────
function SectionLine({ gold = false }: { gold?: boolean }) {
  return (
    <Box sx={{
      height: 1,
      mx: { xs: 2, md: 6 },
      background: gold
        ? 'linear-gradient(90deg, transparent, rgba(245,200,66,0.22) 40%, rgba(245,200,66,0.22) 60%, transparent)'
        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)',
    }} />
  )
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function ToursPage() {
  const { openTourApplyModal } = useTourApplyModal()
  const navigate = useNavigate()
  const location = useLocation()
  const fromExplore = (location.state as any)?.from === 'explore'

  const upcomingTours = TOURS.filter(t => t.status === 'upcoming')
  const completedTours = TOURS.filter(t => t.status === 'completed')

  return (
    <Box component="main" sx={{
      background: 'linear-gradient(155deg, #010d2a 0%, #021a4a 55%, #010d2a 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Grid wave */}
      <GridWaveCanvas />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 10, md: 14 }, pb: { xs: 6, md: 8 } }}>
        <Box sx={{ mb: { xs: 4, md: 5 } }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => fromExplore ? navigate('/#explore') : navigate('/')}
            sx={{ color: 'rgba(255,255,255,0.45)', '&:hover': { color: '#f5c842' }, pl: 0, fontWeight: 500 }}
          >
            {fromExplore ? 'Back' : 'Home'}
          </Button>
        </Box>

        <MotionBox variants={stagger} initial="hidden" animate="show">
          {/* Eyebrow */}
          <MotionBox variants={fadeUp} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 3, md: 4 } }}>
            <Box sx={{ height: 2, width: 36, bgcolor: '#f5c842', borderRadius: 1, boxShadow: '0 0 10px rgba(245,200,66,0.5)' }} />
            <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
              T&H Cricket Academy · Tours
            </Typography>
          </MotionBox>

          {/* Headline */}
          <MotionBox variants={fadeUp}>
            <MotionTypography sx={{
              fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem', lg: '4.2rem' },
              fontWeight: 900,
              color: '#fff',
              lineHeight: 0.95,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              mb: 0.5,
            }}>
              T&H CRICKET
            </MotionTypography>
            <Typography sx={{
              fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem', lg: '4.2rem' },
              fontWeight: 900,
              background: 'linear-gradient(90deg, #f5c842 0%, #e8a010 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 0.95,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              mb: { xs: 3, md: 4 },
            }}>
              TAKES YOU FURTHER.
            </Typography>
          </MotionBox>

          {/* Subtitle */}
          <MotionBox variants={fadeUp} sx={{ mb: { xs: 5, md: 6 } }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.52)', maxWidth: 480, lineHeight: 1.75, fontSize: '0.975rem' }}>
              From regional Victoria to the other side of the world — our players travel, compete, and grow together on every tour.
            </Typography>
          </MotionBox>
        </MotionBox>
      </Container>

      {/* ── WORLD MAP ─────────────────────────────────────────────────────────── */}
      <Box>
        <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
          <TourWorldMap />
        </Container>
      </Box>

      <SectionLine gold />

      {/* ── UPCOMING TOURS ────────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <MotionBox initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <MotionBox variants={fadeUp} sx={{ mb: { xs: 5, md: 7 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <FlightTakeoffIcon sx={{ color: '#f5c842', fontSize: 17 }} />
              <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.62rem', letterSpacing: '0.24em' }}>
                REGISTER NOW · SPOTS ARE LIMITED
              </Typography>
            </Box>
            <Typography sx={{
              fontSize: { xs: '2.1rem', md: '3rem' },
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
            }}>
              Your Next Adventure
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.42)', mt: 1.5, maxWidth: 420, fontSize: '0.9rem', lineHeight: 1.65 }}>
              Registrations are open. Don't miss your chance to represent T&H on the world stage.
            </Typography>
          </MotionBox>

          <Grid container spacing={3}>
            {upcomingTours.map(tour => (
              <Grid key={tour.id} size={{ xs: 12, md: 6 }}>
                <UpcomingTourCard
                  tour={tour}
                  onRegister={() => openTourApplyModal(upcomingTours.findIndex(t => t.id === tour.id))}
                />
              </Grid>
            ))}
          </Grid>
        </MotionBox>
      </Container>

      <SectionLine />

      {/* ── COMPLETED TOURS ───────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <MotionBox initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger}>
          <MotionBox variants={fadeUp} sx={{ mb: { xs: 5, md: 7 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <CheckCircleIcon sx={{ color: 'rgba(80,200,80,0.85)', fontSize: 17 }} />
              <Typography sx={{ color: 'rgba(80,200,80,0.85)', fontWeight: 800, fontSize: '0.62rem', letterSpacing: '0.24em' }}>
                TOUR HISTORY
              </Typography>
            </Box>
            <Typography sx={{
              fontSize: { xs: '2.1rem', md: '3rem' },
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
            }}>
              The Journey So Far
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.42)', mt: 1.5, maxWidth: 420, fontSize: '0.9rem', lineHeight: 1.65 }}>
              Every tour shapes who we are as a team. Here's where cricket has taken us.
            </Typography>
          </MotionBox>

          <MotionBox variants={stagger} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
            {completedTours.map((tour, i) => (
              <MotionBox key={tour.id} variants={fadeUp}>
                <CompletedTourCard
                  tour={tour}
                  images={TOUR_IMAGES[tour.id] ?? []}
                  containIndices={tour.id === 4 ? new Set([2, 5, 6, 9]) : undefined}
                  reverse={i % 2 === 1}
                />
              </MotionBox>
            ))}
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  )
}
