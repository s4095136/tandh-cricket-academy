import React from 'react'
import { Box, Container, Typography, Card, CardContent, Chip, Grid, Button } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { TOURS } from '../data/tours'
import { useTourApplyModal } from '../context/TourApplyModalContext'

export default function ToursPage() {
  const { openTourApplyModal } = useTourApplyModal()

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
      {/* Background dots */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 16, md: 20 }, pb: { xs: 8, md: 12 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
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
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, color: '#ffffff' }}
            >
              Completed Tours
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {completedTours.map((tour) => (
              <Grid key={tour.id} size={{ xs: 12, sm: 6, md: 3 }}>
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
                        bgcolor: 'rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.75)',
                        fontWeight: 700,
                      }}
                    />
                    <Typography variant="h6" sx={{ color: '#fff', mb: 0.5 }}>
                      {tour.name}
                    </Typography>
                    <Typography sx={{ color: '#f5c842', fontWeight: 600, fontSize: '0.85rem', mb: 1.5 }}>
                      {tour.location}{tour.dates ? ` · ${tour.dates}` : ''}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                      {tour.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
