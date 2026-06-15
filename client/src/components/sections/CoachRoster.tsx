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
                  cursor: 'pointer',
                  '&:hover .coach-name': {
                    color: '#f5c842',
                  },
                }}
              >
                <Avatar
                  src={`http://localhost:4000${coach.image}`}
                  sx={{ width: 68, height: 68, '& img': {
      objectFit: 'cover',
      objectPosition:
        coach.name === 'Alan Chandwick'
          ? 'center top'
          : coach.name === 'Fawad Ahmed'
          ? 'center 5%'
          : coach.name === 'Simon Feros'
          ? 'center 5%'
          : coach.name === 'Aiman Nadeem'
          ? 'center 5%'
          : coach.name === 'Daksh Kumar'
          ? 'center 5%'
          : coach.name === 'Ali Khan'
          ? 'center 5%'
          : coach.name === 'Krish Kumar'
          ? 'center 5%'
          : 'center center',
    }, ...AVATAR_HOVER_SX }}
                />
                <Typography
                  className="coach-name"
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    lineHeight: 1.2,
                    textAlign: 'center',
                    transition: 'color 0.2s ease',
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