import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { COACH_GROUPS, AVATAR_HOVER_SX } from './HeroData'

export default function CoachRoster({ onCoachClick }: { onCoachClick: (name: string) => void }) {
  return (
    <Box sx={{ px: 1 }}>
      {COACH_GROUPS.map(({ group, coaches: groupCoaches }) => (
        <Box key={group} sx={{ mb: 2 }}>
          <Typography
            sx={{
              color: '#f5c842',
              fontWeight: 800,
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              px: 1,
              mb: 1.5,
              opacity: 0.7,
            }}
          >
            {group}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, px: 1 }}>
            {groupCoaches.map((coach) => (
              <Box
                key={coach.name}
                onClick={() => onCoachClick(coach.name)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.8,
                  cursor: 'pointer',
                  width: 72,
                }}
              >
                <Avatar
                  src={`http://localhost:4000${coach.image}`}
                  sx={{
                    width: 62,
                    height: 62,
                    border: '2px solid rgba(245,200,66,0.5)',
                    ...AVATAR_HOVER_SX,
                  }}
                />
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.65rem',
                    textAlign: 'center',
                    lineHeight: 1.2,
                    transition: 'color 0.2s ease',
                    '&:hover': { color: '#f5c842' },
                  }}
                >
                  {coach.name}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ height: '1px', bgcolor: 'rgba(255,255,255,0.06)', mx: 1, mt: 1.5 }} />
        </Box>
      ))}
    </Box>
  )
}