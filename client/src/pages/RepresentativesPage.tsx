import React from 'react'
import { Box, Container, Typography, Card, CardContent, Chip, Grid, Avatar } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import PublicIcon from '@mui/icons-material/Public'
import { REPRESENTATIVES, AUSTRALIAN_REPRESENTATIVES } from '../data/representatives'
const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:4000'

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  const first = parts[0]
  if (first.length >= 2) return first.slice(0, 2).toUpperCase()
  return (first[0] + (parts[1]?.[0] ?? '')).toUpperCase()
}

// Splits "U17 Vic Metro Team (2022-23, 2023-24)" into team + year parts
function parseHonour(honour: string): { team: string; years: string } {
  const match = honour.match(/^(.*?)\s*\(([^)]+)\)\s*$/)
  if (!match) return { team: honour, years: '' }
  return { team: match[1].trim(), years: match[2].trim() }
}

export default function RepresentativesPage() {
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

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 10, md: 12 }, pb: { xs: 8, md: 12 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
          <Chip
            label="State representatives"
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
            Representing Victoria
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.62)', maxWidth: 620, mx: 'auto', fontSize: { xs: '1rem', md: '1.05rem' } }}
          >
            We're proud of every T&H Cricket player who has gone on to represent their state. Here are some of
            our players who have been selected for Victorian and national representative squads.
          </Typography>
        </Box>

        {/* Players */}
        <Grid container spacing={3}>
          {REPRESENTATIVES.map((player) => (
            <Grid key={player.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                    <Avatar
                      src={player.image ? `${API_URL}${player.image}` : undefined}
                      sx={{
                        width: 56,
                        height: 56,
                        border: '2px solid #f5c842',
                        bgcolor: 'rgba(245,200,66,0.12)',
                        color: '#f5c842',
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.2rem',
                        letterSpacing: '0.05em',
                        flexShrink: 0,
                      }}
                    >
                      {getInitials(player.name)}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2 }}>
                        {player.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.4 }}>
                        <EmojiEventsIcon sx={{ color: '#f5c842', fontSize: '0.95rem' }} />
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                          {player.honours.length} state representative honour{player.honours.length > 1 ? 's' : ''}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.18)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 2,
                      flexGrow: 1,
                    }}
                  >
                    {player.honours.map((honour, idx) => {
                      const { team, years } = parseHonour(honour)
                      return (
                        <Box
                          key={honour}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2,
                            px: 2,
                            py: 1.1,
                            borderBottom:
                              idx < player.honours.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                          }}
                        >
                          <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', fontWeight: 600 }}>
                            {team}
                          </Typography>
                          {years && (
                            <Typography
                              sx={{
                                color: '#f5c842',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                letterSpacing: '0.02em',
                                flexShrink: 0,
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {years}
                            </Typography>
                          )}
                        </Box>
                      )
                    })}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Australian Representatives */}
        <Box sx={{ textAlign: 'center', mt: { xs: 10, md: 14 }, mb: { xs: 6, md: 8 } }}>
          <Chip
            label="National honours"
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
            sx={{ fontSize: { xs: '2.5rem', sm: '3.2rem', md: '4.2rem' }, color: '#ffffff', mb: 1 }}
          >
            Australian Representatives
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.62)', maxWidth: 620, mx: 'auto', fontSize: { xs: '1rem', md: '1.05rem' } }}
          >
            Players from our program who have gone on to represent Australia on the international stage.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {AUSTRALIAN_REPRESENTATIVES.map((player) => (
            <Box key={player.id} sx={{ width: '100%', maxWidth: 420 }}>
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                    <Avatar
                      src={player.image ? `${API_URL}${player.image}` : undefined}
                      sx={{
                        width: 56,
                        height: 56,
                        border: '2px solid #f5c842',
                        bgcolor: 'rgba(245,200,66,0.12)',
                        color: '#f5c842',
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.2rem',
                        letterSpacing: '0.05em',
                        flexShrink: 0,
                      }}
                    >
                      {getInitials(player.name)}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2 }}>
                        {player.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.4 }}>
                        <PublicIcon sx={{ color: '#f5c842', fontSize: '0.95rem' }} />
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                          {player.tours.length} Australian honour{player.tours.length > 1 ? 's' : ''}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.18)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 2,
                      flexGrow: 1,
                    }}
                  >
                    {player.tours.map((tour, idx) => (
                      <Box
                        key={`${tour.team}-${tour.year}`}
                        sx={{
                          px: 2,
                          py: 1.1,
                          borderBottom:
                            idx < player.tours.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                          <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', fontWeight: 600 }}>
                            {tour.team}
                          </Typography>
                          <Typography
                            sx={{
                              color: '#f5c842',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              letterSpacing: '0.02em',
                              flexShrink: 0,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {tour.year}
                          </Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.74rem', mt: 0.3 }}>
                          {tour.detail}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
