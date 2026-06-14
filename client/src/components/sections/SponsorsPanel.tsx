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
          bgcolor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(245,200,66,0.2)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: '1px solid rgba(245,200,66,0.15)',
            background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 100%)',
          }}
        >
          <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em' }}>
            OUR SPONSORS
          </Typography>
        </Box>

        <Box sx={{ overflowY: 'auto', maxHeight: 560, px: 2, py: 1 }}>
          <SponsorList />
        </Box>
      </Box>

      {/* Mobile */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          mt: 4,
          bgcolor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(245,200,66,0.2)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: '1px solid rgba(245,200,66,0.15)',
            background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 100%)',
          }}
        >
          <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em' }}>
            OUR SPONSORS
          </Typography>
        </Box>
        <Box sx={{ px: 2, py: 1 }}>
          <SponsorList grid />
        </Box>
      </Box>
    </>
  )
}

function SponsorList({ grid }: { grid?: boolean }) {
  return (
    <>
      {SPONSOR_GROUPS.map(({ group, sponsors }) => (
        <Box key={group} sx={{ mb: 1 }}>
          <Typography
            sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.65rem', letterSpacing: '0.12em', px: 1, py: 1, opacity: 0.7 }}
          >
            {group}
          </Typography>

          <Box sx={grid ? { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 } : {}}>
            {sponsors.map((sponsor) => (
              <Box
                key={sponsor.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 1,
                  py: 1.2,
                  borderRadius: 2,
                  transition: 'background 0.15s ease',
                  '&:hover': { bgcolor: 'rgba(245,200,66,0.08)' },
                }}
              >
                <Avatar
                  src={`http://localhost:4000${sponsor.image}`}
                  variant="rounded"
                  sx={{
                    width: 38,
                    height: 38,
                    border: '2px solid rgba(245,200,66,0.4)',
                    flexShrink: 0,
                    bgcolor: 'rgba(255,255,255,0.06)',
                  }}
                />
                <Box>
                  <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem', lineHeight: 1.2 }}>
                    {sponsor.name}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                    {sponsor.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ height: '1px', bgcolor: 'rgba(255,255,255,0.06)', mx: 1, mt: 1 }} />
        </Box>
      ))}
    </>
  )
}