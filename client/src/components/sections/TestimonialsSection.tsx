import React, { useState } from 'react'
import { Box, Container, Typography, Card, CardContent, Grid, Avatar, Rating } from '@mui/material'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

const TESTIMONIALS = [
  {
    name: 'James M.',
    role: 'Parent of U14 player',
    initials: 'JM',
    rating: 5,
    quote:
      'My son has been training with T&H for two seasons now. The improvement in his technique and confidence has been remarkable. Tom has this incredible ability to break down professional-level concepts for young players.',
  },
  {
    name: 'Sarah K.',
    role: 'Parent of U10 player',
    initials: 'SK',
    rating: 5,
    quote:
      'The holiday clinics are absolutely fantastic. My daughter comes home buzzing every single day. Hanni is so patient and encouraging with the younger kids — it never feels overwhelming.',
  },
  {
    name: 'Daniel R.',
    role: 'Representative player, Age 16',
    initials: 'DR',
    rating: 5,
    quote:
      'Training with Tom has genuinely changed my game. Getting insights from an actual BBL player about batting under pressure is something you can\'t get anywhere else. Highly recommend the elite program.',
  },
  {
    name: 'Michelle T.',
    role: 'Parent of two players',
    initials: 'MT',
    rating: 5,
    quote:
      'Both my kids train with T&H — one in beginner, one in advanced. The programs are completely different in depth but equal in quality. They both love going.',
  },
  {
    name: 'Alex P.',
    role: 'Club cricketer, Age 19',
    initials: 'AP',
    rating: 5,
    quote:
      'Joined the advanced training last winter. My club form improved noticeably the following season. The video analysis sessions were a game-changer for spotting technique flaws.',
  },
  {
    name: 'Chris B.',
    role: 'Parent of U12 player',
    initials: 'CB',
    rating: 5,
    quote:
      'Brilliant coaching setup. Small groups mean the kids actually get coached, not just supervised. My son has gone from a shy beginner to genuinely loving his cricket.',
  },
]

export default function TestimonialsSection() {
  return (
    <Box
      id="testimonials"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'primary.dark',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background dots */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', display: 'block', mb: 1.5 }}>
            What families say
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: '#ffffff' }}
          >
            Trusted by Melbourne families
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {TESTIMONIALS.map((t) => (
            <Grid key={t.name} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(4px)',
                  transition: 'transform 0.2s, background 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    bgcolor: 'rgba(255,255,255,0.08)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <FormatQuoteIcon sx={{ color: 'secondary.main', fontSize: 28, mb: 1.5, opacity: 0.8 }} />
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, mb: 3, fontStyle: 'italic' }}
                  >
                    "{t.quote}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 38,
                        height: 38,
                        bgcolor: 'primary.main',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                      }}
                    >
                      {t.initials}
                    </Avatar>
                    <Box>
                      <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>
                        {t.name}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>
                        {t.role}
                      </Typography>
                    </Box>
                    <Rating
                      value={t.rating}
                      readOnly
                      size="small"
                      sx={{ ml: 'auto', '& .MuiRating-iconFilled': { color: 'secondary.main' } }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
