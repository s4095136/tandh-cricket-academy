import React from 'react'
import { Box, Typography } from '@mui/material'
import CoachRoster from './CoachRoster'

interface Props {
  onCoachClick: (name: string) => void
}

function PanelHeader() {
  return (
    <Box sx={{ px: 1, pb: 1.5, textAlign: 'center' }}>
      <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em' }}>
        COACHING STAFF
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', mt: 0.25 }}>
        Click a coach to learn more
      </Typography>
    </Box>
  )
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
        }}
      >
        <PanelHeader />
        <CoachRoster onCoachClick={onCoachClick} />
      </Box>

      {/* Mobile */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          mt: 6,
        }}
      >
        <PanelHeader />
        <CoachRoster onCoachClick={onCoachClick} />
      </Box>
    </>
  )
}