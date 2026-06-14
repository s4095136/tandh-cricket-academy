import React from 'react'
import { Box, Typography } from '@mui/material'
import CoachRoster from './CoachRoster'

interface Props {
  onCoachClick: (name: string) => void
}

export default function CoachesPanel({ onCoachClick }: Props) {
  return (
    <>
      {/* Desktop */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          right: 20,
          top: '72px',
          bottom: '20px',
          zIndex: 2,
          width: { md: 480, lg: 560 },
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em', mb: 2, px: 1 }}>
          COACHING STAFF
        </Typography>
        <CoachRoster onCoachClick={onCoachClick} />
      </Box>

      {/* Mobile */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 6 }}>
        <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em', mb: 2, px: 1 }}>
          COACHING STAFF
        </Typography>
        <CoachRoster onCoachClick={onCoachClick} />
      </Box>
    </>
  )
}