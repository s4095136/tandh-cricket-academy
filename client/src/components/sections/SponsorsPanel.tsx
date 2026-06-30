import React from 'react'
import { Box, Typography } from '@mui/material'
import { SPONSOR_GROUPS } from './HeroData'

// const API_URL =
//   'https://tandh-backend-deployment-production.up.railway.app'

import { CLOUDINARY_BASE } from '../../config/cloudinary'
const CLOUDINARY = CLOUDINARY_BASE

export default function SponsorsPanel() {
  return (
    <>
      {/* Desktop — vertical column pinned to the left */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          left: 20,
          top: '160px',
          width: 130,
          zIndex: 2,
        }}
      >
        <Box sx={{ pb: 1.5, textAlign: 'center' }}>
          <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.68rem', letterSpacing: '0.12em' }}>
            PROUDLY AFFILIATED WITH
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, pt: 1 }}>
          {SPONSOR_GROUPS.flatMap((g) => g.sponsors).map((sponsor) => (
            <Box
              key={sponsor.name}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.75,
                opacity: 0.85,
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 1 },
              }}
            >
              <Box
                component="img"
                src={`${CLOUDINARY}/${sponsor.image}`}
                alt={sponsor.name}
                sx={{ height: 40, width: 'auto', maxWidth: 90, objectFit: 'contain' }}
              />
              <Typography
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.68rem',
                  textAlign: 'center',
                  lineHeight: 1.2,
                }}
              >
                {sponsor.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Mobile */}
      <Box sx={{ display: { xs: 'block', lg: 'none' }, mt: 4 }}>
        <Box sx={{ px: 1, pb: 1.5, textAlign: 'center' }}>
          <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em' }}>
            Proudly Affiliated With
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
      {SPONSOR_GROUPS.map(({ sponsors }) => (
        <Box key={sponsors[0]?.name} sx={{ mb: 2.5 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2.5 }}>
            {sponsors.map((sponsor) => (
              <Box
                key={sponsor.name}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75, width: 88 }}
              >
                <Box
                  sx={{
                    width: 90, height: 70, bgcolor: 'transparent', borderRadius: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={`${CLOUDINARY}/${sponsor.image}`}
                    alt={sponsor.name}
                    sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </Box>
                <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.2, textAlign: 'center' }}>
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
