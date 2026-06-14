import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { COACH_GROUPS, AVATAR_HOVER_SX } from './HeroData'

export default function CoachRoster({ onCoachClick }: { onCoachClick: (name: string) => void }) {
  return (
    <Box sx={{ px: 1, py: 0.5 }}>
      {COACH_GROUPS.map(({ group, coaches: groupCoaches }) => (
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
            {groupCoaches.map((coach) => (
              <Box
                key={coach.name}
                onClick={() => onCoachClick(coach.name)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.75,
                  width: 88,
                }}
              >
                <Avatar
                  src={`http://localhost:4000${coach.image}`}
                  sx={{ width: 68, height: 68, ...AVATAR_HOVER_SX }}
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
                  {coach.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}