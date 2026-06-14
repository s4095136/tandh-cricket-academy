import React from 'react'
import { Box, Typography } from '@mui/material'
import CoachRoster from './CoachRoster'

interface Props {
  onCoachClick: (name: string) => void
}

function PanelHeader() {
  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        borderBottom: '1px solid rgba(245,200,66,0.15)',
        background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em' }}>
        COACHING STAFF
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem' }}>
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
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          width: { md: 600, lg: 700 },
          flexDirection: 'column',
          bgcolor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(245,200,66,0.2)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <PanelHeader />
        <Box sx={{ overflowY: 'auto', maxHeight: 560 }}>
          <CoachRoster onCoachClick={onCoachClick} />
        </Box>
      </Box>

      {/* Mobile */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          mt: 6,
          bgcolor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(245,200,66,0.2)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <PanelHeader />
        <CoachRoster onCoachClick={onCoachClick} />
      </Box>
    </>
  )
}