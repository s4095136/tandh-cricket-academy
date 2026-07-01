import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Card, CardContent, Chip, Grid, Button, GlobalStyles, IconButton } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { TOURS } from '../data/tours'
import { CLOUDINARY_BASE } from '../config/cloudinary'

const TOUR_IMAGES: Record<number, string[]> = {
  2: [`${CLOUDINARY_BASE}/sale1.jpg`],
  3: Array.from({ length: 8 }, (_, i) => `${CLOUDINARY_BASE}/mackay${i + 1}.jpg`),
  4: Array.from({ length: 16 }, (_, i) => `${CLOUDINARY_BASE}/london${i + 1}.jpg`),
}
import { useTourApplyModal } from '../context/TourApplyModalContext'
import { useNavigate } from 'react-router-dom'


function CompletedTourRow({ tour, images, containIndices = new Set<number>() }: { tour: (typeof TOURS)[0]; images: string[]; containIndices?: Set<number> }) {
  const [idx, setIdx] = useState(0)
  const [tick, setTick] = useState(0)

  const go = (next: number) => { setIdx((next + images.length) % images.length); setTick((t) => t + 1) }

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => setIdx((i) => (i + 1) % images.length), 3000)
    return () => clearInterval(timer)
  }, [images.length, tick])

  return (
    <Card sx={{
      bgcolor: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 4,
      overflow: 'hidden',
      maxWidth: images.length === 0 ? 480 : '100%',
      mx: images.length === 0 ? 'auto' : 0,
    }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: { md: 320 } }}>
        {/* Left: text */}
        <Box sx={{ flex: 1, p: { xs: 2.5, md: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: { md: '1px solid rgba(255,255,255,0.08)' } }}>
          <Chip label={tour.year} size="small" sx={{ mb: 1.5, alignSelf: 'flex-start', bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)', fontWeight: 700 }} />
          <Typography variant="h5" sx={{ color: '#fff', mb: 0.5, fontWeight: 700 }}>{tour.name}</Typography>
          <Typography sx={{ color: '#f5c842', fontWeight: 600, fontSize: '0.85rem', mb: 1.5 }}>
            {tour.location}{tour.dates ? ` · ${tour.dates}` : ''}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontSize: '0.9rem', mb: 2 }}>
            {tour.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {tour.highlights.map((h) => (
              <Chip key={h} label={h} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem' }} />
            ))}
          </Box>
        </Box>

        {/* Right: slideshow */}
        {images.length > 0 && <Box sx={{ width: { xs: '100%', md: '45%' }, flexShrink: 0, position: 'relative', overflow: 'hidden', height: { xs: 220, md: '100%' }, bgcolor: 'rgba(0,0,0,0.2)' }}>
          {true ? (
            <>
              {images.map((src, i) => (
                <Box key={i} component="img" src={src} sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: containIndices.has(i) ? 'contain' : 'cover', opacity: i === idx ? 1 : 0, transition: 'opacity 0.6s ease' }} />
              ))}
              {images.length > 1 && (
                <>
                  <IconButton onClick={() => go(idx - 1)} sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.4)', color: '#fff', p: 0.5, '&:hover': { bgcolor: 'rgba(0,0,0,0.7)', color: '#f5c842' } }}>
                    <ArrowBackIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => go(idx + 1)} sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.4)', color: '#fff', p: 0.5, '&:hover': { bgcolor: 'rgba(0,0,0,0.7)', color: '#f5c842' } }}>
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                  <Box sx={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 0.75 }}>
                    {images.map((_, i) => (
                      <Box key={i} onClick={() => setIdx(i)} sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: i === idx ? '#f5c842' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'background 0.3s' }} />
                    ))}
                  </Box>
                </>
              )}
            </>
          ) : null}
        </Box>}
      </Box>
    </Card>
  )
}

export default function ToursPage() {
  const { openTourApplyModal } = useTourApplyModal()
  const navigate = useNavigate()

  const completedTours = TOURS.filter((t) => t.status === 'completed')
  const upcomingTours = TOURS.filter((t) => t.status === 'upcoming')

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
      {[0, -7].map((delay, pi) => (
        <Box
          key={delay}
          sx={{
            position: 'absolute',
            top: { xs: '3.3%', md: '4.5%' },
            left: 0,
            pointerEvents: 'none',
            animation: `flyH${pi} 14s ${delay}s linear infinite`,
            [`@keyframes flyH${pi}`]: {
              '0%':   { transform: 'translateX(-130vw)' },
              '100%': { transform: 'translateX(280vw)' },
            },
          }}
        >
          <Box sx={{ position: 'relative', display: 'inline-block', fontSize: { xs: 150, md: 240 }, lineHeight: 1 }}>
            {[
              { offset: '-1.1em', opacity: 0.40 },
              { offset: '-2.1em', opacity: 0.25 },
              { offset: '-3.1em', opacity: 0.14 },
              { offset: '-4.1em', opacity: 0.07 },
              { offset: '-5.1em', opacity: 0.03 },
            ].map(({ offset, opacity }, i) => (
              <Box key={i} sx={{ position: 'absolute', left: offset, top: 0, fontSize: 'inherit', lineHeight: 1, color: `rgba(245,200,66,${opacity})` }}>{'✈︎'}</Box>
            ))}
            <Box sx={{ position: 'relative', color: 'rgba(245,200,66,0.65)' }}>{'✈︎'}</Box>
          </Box>
        </Box>
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 9, md: 10 }, pb: { xs: 8, md: 12 } }}>
        {/* Back button */}
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate({ pathname: '/', hash: '#explore' })}
            sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#f5c842' }, pl: 0 }}
          >
            Return to Home
          </Button>
        </Box>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 7 } }}>
          <Chip
            label="On tour"
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
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' }, color: '#ffffff', mb: 1 }}
          >
            Our Tours
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.62)', maxWidth: 620, mx: 'auto', fontSize: { xs: '1rem', md: '1.05rem' } }}
          >
            From regional Victoria to the other side of the world - T&H Cricket players get the chance to
            compete, travel and grow together on tour.
          </Typography>
        </Box>

        {/* Upcoming Tours */}
        <Box sx={{ mb: { xs: 8, md: 10 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <FlightTakeoffIcon sx={{ color: '#f5c842' }} />
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, color: '#f5c842' }}
            >
              Upcoming Tours
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {upcomingTours.map((tour) => (
              <Grid key={tour.id} size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      bgcolor: 'rgba(255,255,255,0.08)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Chip
                      label={tour.year}
                      size="small"
                      sx={{
                        alignSelf: 'flex-start',
                        mb: 2,
                        bgcolor: 'rgba(245,200,66,0.15)',
                        color: '#f5c842',
                        border: '1px solid rgba(245,200,66,0.25)',
                        fontWeight: 700,
                      }}
                    />
                    <Typography variant="h5" sx={{ color: '#fff', mb: 0.5 }}>
                      {tour.name}
                    </Typography>
                    <Typography sx={{ color: '#f5c842', fontWeight: 600, fontSize: '0.9rem', mb: 2 }}>
                      {tour.location}{tour.dates ? ` · ${tour.dates}` : ''}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, mb: 2.5, flexGrow: 1 }}>
                      {tour.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                      {tour.highlights.map((h) => (
                        <Chip
                          key={h}
                          label={h}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.06)',
                            color: 'rgba(255,255,255,0.75)',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        />
                      ))}
                    </Box>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => openTourApplyModal(upcomingTours.findIndex((t) => t.id === tour.id))}
                      sx={{
                        alignSelf: 'flex-start',
                        bgcolor: '#f5c842',
                        color: '#021a4a',
                        fontWeight: 700,
                        '&:hover': {
                          bgcolor: '#e0b030',
                        },
                      }}
                    >
                      Register
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Completed Tours */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <CheckCircleIcon sx={{ color: '#f5c842' }} />
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, color: '#ffffff' }}>
              Completed Tours
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {completedTours.map((tour) => (
              <CompletedTourRow key={tour.id} tour={tour} images={TOUR_IMAGES[tour.id] ?? []} containIndices={tour.id === 4 ? new Set([2, 5, 6, 9]) : undefined} />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
