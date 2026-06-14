import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { SPONSOR_GROUPS } from './HeroData'

export default function SponsorsPanel() {
  return (
    <>
      {/* Desktop */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          left: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          width: { md: 240, lg: 260 },
          flexDirection: 'column',
        }}
      >
        <Box sx={{ px: 1, pb: 1.5, textAlign: 'center' }}>
          <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em' }}>
            OUR SPONSORS
          </Typography>
        </Box>
        <SponsorList />
      </Box>

      {/* Mobile */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          mt: 4,
        }}
      >
        <Box sx={{ px: 1, pb: 1.5, textAlign: 'center' }}>
          <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em' }}>
            OUR SPONSORS
          </Typography>
        </Box>
        <SponsorList />
      </Box>
    </>
  )
}

function SponsorList() {
  return (
    <Box sx={{ px: 1, py: 0.5 }}>
      {SPONSOR_GROUPS.map(({ group, sponsors }) => (
        <Box key={group} sx={{ mb: 2.5 }}>
          <Typography
            sx={{
              color: '#f5c842',
              fontWeight: 800,
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textAlign: 'center',
              mb: 1.5,
            }}
          >
            {group}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2.5 }}>
            {sponsors.map((sponsor) => (
              <Box
                key={sponsor.name}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.75,
                  width: 88,
                }}
              >
                <Avatar
                  src={`http://localhost:4000${sponsor.image}`}
                  sx={{
                    width: 68,
                    height: 68,
                    bgcolor: 'rgba(255,255,255,0.06)',
                  }}
                />
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    lineHeight: 1.2,
                    textAlign: 'center',
                  }}
                >
                  {sponsor.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}