import React from 'react'
import { Box, Container, Typography, Avatar, Chip, Button } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'
import { REPRESENTATIVES, AUSTRALIAN_REPRESENTATIVES } from '../../data/representatives'

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const API_URL = 'https://tandh-backend-deployment-production.up.railway.app'

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  const first = parts[0]
  if (first.length >= 2) return first.slice(0, 2).toUpperCase()
  return (first[0] + (parts[1]?.[0] ?? '')).toUpperCase()
}

// Top 6 state reps by honour count, plus all Australian reps
const topReps = [...REPRESENTATIVES]
  .sort((a, b) => b.honours.length - a.honours.length)
  .slice(0, 6)

export default function RepresentativesPreviewSection() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
        py: { xs: 8, md: 10 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background dots */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Chip
            label="Pride of T&H Cricket"
            size="small"
            sx={{
              mb: 2,
              bgcolor: 'rgba(245,200,66,0.15)',
              color: '#f5c842',
              border: '1px solid rgba(245,200,66,0.3)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              fontSize: '0.72rem',
            }}
          />
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', sm: '2.8rem' }, color: '#fff', mb: 1 }}
          >
            Our Representatives
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.55)', maxWidth: 520, mx: 'auto', fontSize: '0.95rem' }}
          >
            T&H players competing at state and national level.
          </Typography>
        </Box>

        {/* Australian rep highlight */}
        {AUSTRALIAN_REPRESENTATIVES.map((player) => (
          <Box
            key={player.id}
            sx={{
              display: 'flex', alignItems: 'center', gap: 2,
              bgcolor: 'rgba(245,200,66,0.08)',
              border: '1px solid rgba(245,200,66,0.3)',
              borderRadius: 3, p: 2, mb: 3,
            }}
          >
            <Avatar
              src={player.image ? `${API_URL}${player.image}` : undefined}
              sx={{
                width: 52, height: 52,
                border: '2px solid #f5c842',
                bgcolor: 'rgba(245,200,66,0.12)',
                color: '#f5c842',
                fontFamily: '"Bebas Neue", sans-serif',
                flexShrink: 0,
                '& img': { objectFit: 'cover', objectPosition: 'center 5%' },
              }}
            >
              {getInitials(player.name)}
            </Avatar>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                {player.name}
              </Typography>
              <Typography sx={{ color: '#f5c842', fontSize: '0.75rem', fontWeight: 600 }}>
                🇦🇺 Australian Representative
              </Typography>
            </Box>
          </Box>
        ))}

        {/* State reps grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
            gap: 2,
            mb: 4,
          }}
        >
          {topReps.map((player) => (
            <Box
              key={player.id}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                bgcolor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 3, p: 1.5,
              }}
            >
              <Avatar
                src={player.image ? `${API_URL}${player.image}` : undefined}
                sx={{
                  width: 44, height: 44,
                  border: '1.5px solid #f5c842',
                  bgcolor: 'rgba(245,200,66,0.12)',
                  color: '#f5c842',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '0.9rem',
                  flexShrink: 0,
                  '& img': { objectFit: 'cover', objectPosition: 'center 5%' },
                }}
              >
                {getInitials(player.name)}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem', lineHeight: 1.2 }}>
                  {player.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, mt: 0.3 }}>
                  <EmojiEventsIcon sx={{ color: '#f5c842', fontSize: '0.7rem' }} />
                  <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem' }}>
                    {player.honours.length} honour{player.honours.length > 1 ? 's' : ''}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* View all button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/representatives')}
            sx={{
              color: '#f5c842',
              borderColor: 'rgba(245,200,66,0.4)',
              px: 3.5, py: 1.2,
              '&:hover': { borderColor: '#f5c842', bgcolor: 'rgba(245,200,66,0.08)' },
            }}
          >
            View All Representatives
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
