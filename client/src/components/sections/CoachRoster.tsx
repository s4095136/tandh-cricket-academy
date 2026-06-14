import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { COACH_GROUPS, AVATAR_HOVER_SX } from './HeroData'

export default function CoachRoster({ onCoachClick }: { onCoachClick: (name: string) => void }) {
  return (
    <Box sx={{ px: 2, py: 1 }}>
      {COACH_GROUPS.map(({ group, coaches: groupCoaches }) => (
        <Box key={group} sx={{ mb: 1 }}>
          <Typography
            sx={{
              color: '#f5c842',
              fontWeight: 800,
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              px: 1,
              py: 1,
              opacity: 0.7,
            }}
          >
            {group}
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
            {groupCoaches.map((coach) => (
              <Box
                key={coach.name}
                onClick={() => onCoachClick(coach.name)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 1,
                  py: 1.2,
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                  '&:hover': { bgcolor: 'rgba(245,200,66,0.08)' },
                }}
              >
                <Avatar
                  src={`http://localhost:4000${coach.image}`}
                  sx={{ width: 38, height: 38, border: '2px solid rgba(245,200,66,0.4)', flexShrink: 0, ...AVATAR_HOVER_SX }}
                />
                <Box>
                  <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem', lineHeight: 1.2 }}>
                    {coach.name}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                    {coach.role}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ height: '1px', bgcolor: 'rgba(255,255,255,0.06)', mx: 1, mt: 1 }} />
        </Box>
      ))}
    </Box>
  )
}