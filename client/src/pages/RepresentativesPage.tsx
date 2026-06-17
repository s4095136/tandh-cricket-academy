import React, { useState } from 'react'
import {
  Box, Container, Typography, Card, CardContent, Chip, Grid, Avatar,
  Dialog, DialogContent, IconButton,
} from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import PublicIcon from '@mui/icons-material/Public'
import CloseIcon from '@mui/icons-material/Close'
import { REPRESENTATIVES, AUSTRALIAN_REPRESENTATIVES } from '../data/representatives'
import type { Representative, AustralianRepresentative } from '../data/representatives'

const API_URL = 'https://tandh-backend-deployment-production.up.railway.app'

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
  return (
    <Dialog
      open={!!player}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { bgcolor: '#021a4a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4 } } }}
    >
      {player && (
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={player.image ? `${API_URL}${player.image}` : undefined}
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
            {player.honours.map((honour, idx) => {
              const { team, years } = parseHonour(honour)
              return (
                <Box
                  key={honour}
                  sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2,
                    px: 2, py: 1.2,
                    borderBottom: idx < player.honours.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 600 }}>
                    {team}
                  </Typography>
                  {years && (
                    <Typography sx={{ color: '#f5c842', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}>
                      {years}
                    </Typography>
                  )}
                </Box>
              )
            })}
          </Box>
        </DialogContent>
      )}
    </Dialog>
  )
}

function AusDialog({ player, onClose }: { player: AustralianRepresentative | null; onClose: () => void }) {
  return (
    <Dialog
      open={!!player}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { bgcolor: '#021a4a', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 4 } } }}
    >
      {player && (
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={player.image ? `${API_URL}${player.image}` : undefined}
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

          <Box sx={{ bgcolor: 'rgba(0,0,0,0.25)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.06)' }}>
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
        </DialogContent>
      )}
    </Dialog>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const cardHoverSx = {
  transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    bgcolor: 'rgba(255,255,255,0.08)',
    boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
  },
}

export default function RepresentativesPage() {
  const [selectedState, setSelectedState] = useState<Representative | null>(null)
  const [selectedAus, setSelectedAus] = useState<AustralianRepresentative | null>(null)

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
      <Box
        sx={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 10, md: 12 }, pb: { xs: 8, md: 12 } }}>
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
            <Grid container spacing={3} sx={{ maxWidth: 560 }}>
              {AUSTRALIAN_REPRESENTATIVES.map((player) => (
                <Grid key={player.id} size={{ xs: 12 }}>
                  <Card
                    onClick={() => setSelectedAus(player)}
                    sx={{
                      display: 'flex', flexDirection: 'column',
                      bgcolor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(245,200,66,0.3)',
                      borderRadius: 4,
                      ...cardHoverSx,
                    }}
                  >
                    <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                        <Avatar
                          src={player.image ? `${API_URL}${player.image}` : undefined}
                          sx={{
                            width: 68, height: 68,
                            border: '2px solid #f5c842',
                            bgcolor: 'rgba(245,200,66,0.12)',
                            color: '#f5c842',
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: '1.3rem',
                            letterSpacing: '0.05em',
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
                            <PublicIcon sx={{ color: '#f5c842', fontSize: '0.95rem' }} />
                            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                              {player.tours.length} Australian honour{player.tours.length > 1 ? 's' : ''}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ bgcolor: 'rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, flexGrow: 1 }}>
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

          <Grid container spacing={3}>
            {[...REPRESENTATIVES].sort((a, b) => b.honours.length - a.honours.length).map((player) => (
              <Grid key={player.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  onClick={() => setSelectedState(player)}
                  sx={{
                    height: '100%', display: 'flex', flexDirection: 'column',
                    bgcolor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    ...cardHoverSx,
                  }}
                >
                  <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                      <Avatar
                        src={player.image ? `${API_URL}${player.image}` : undefined}
                        sx={{
                          width: 68, height: 68,
                          border: '2px solid #f5c842',
                          bgcolor: 'rgba(245,200,66,0.12)',
                          color: '#f5c842',
                          fontFamily: '"Bebas Neue", sans-serif',
                          fontSize: '1.3rem',
                          letterSpacing: '0.05em',
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
                          <EmojiEventsIcon sx={{ color: '#f5c842', fontSize: '0.95rem' }} />
                          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                            {player.honours.length} representative honour{player.honours.length > 1 ? 's' : ''}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ bgcolor: 'rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, flexGrow: 1 }}>
                      {player.honours.map((honour, idx) => {
                        const { team, years } = parseHonour(honour)
                        return (
                          <Box
                            key={honour}
                            sx={{
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2,
                              px: 2, py: 1.1,
                              borderBottom: idx < player.honours.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                            }}
                          >
                            <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', fontWeight: 600 }}>{team}</Typography>
                            {years && (
                              <Typography sx={{ color: '#f5c842', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}>
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
        </Box>
      </Container>

      <StateDialog player={selectedState} onClose={() => setSelectedState(null)} />
      <AusDialog player={selectedAus} onClose={() => setSelectedAus(null)} />
    </Box>
  )
}
