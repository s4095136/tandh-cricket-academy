import React, { useState } from 'react'
import {
  Box, Container, Typography, Stack, Button, Chip,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { PROGRAMS, DAY_COLOR } from '../../data/programs'
import { useApplyModal } from '../../context/ApplyModalContext'

export default function ProgramsSection() {
  const [selected, setSelected] = useState(0)
  const { openApplyModal } = useApplyModal()

  const program = PROGRAMS[selected]
  const col = DAY_COLOR[program.day] ?? { bg: 'rgba(255,255,255,0.08)', text: '#fff' }

  return (
    <Box
      id="programs"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
      }}
    >
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ mb: { xs: 5, md: 6 } }}>
<Typography variant="overline" sx={{ display: 'block', mb: 1, color: '#f5c842' }}>
  2026 Season · May – August
</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: '#ffffff' }}>
            Programs
          </Typography>
        </Box>

        {/* Main panel */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: 'rgba(255,255,255,0.03)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
            minHeight: { md: 420 },
          }}
        >
          {/* Left — program list */}
          <Box
            sx={{
              width: { xs: '100%', md: 220 },
              borderRight: { md: '1px solid rgba(255,255,255,0.2)' },
              borderBottom: { xs: '1px solid rgba(255,255,255,0.2)', md: 'none' },
              flexShrink: 0,
            }}
          >
            {PROGRAMS.map((p, i) => (
              <Box
                key={p.label}
                onClick={() => setSelected(i)}
                sx={{
                  px: 3,
                  py: 2.2,
                  cursor: 'pointer',
                  borderLeft: '3px solid',
                  borderLeftColor: selected === i ? '#f5c842' : 'transparent',
                  bgcolor: selected === i ? 'rgba(245,200,66,0.07)' : 'transparent',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: selected === i ? 'rgba(245,200,66,0.07)' : 'rgba(255,255,255,0.04)',
                  },
                  borderBottom: i < PROGRAMS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    letterSpacing: '0.04em',
                    fontSize: '1.1rem',
                    fontWeight: selected === i ? 700 : 500,
                    color: selected === i ? '#f5c842' : 'rgba(255,255,255,0.7)',
                  }}
                >
                  {p.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Right — detail panel */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              {/* Title + day chip */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: { xs: '2.4rem', md: '3.2rem' },
                    color: '#f5c842',
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                  }}
                >
                  {program.label}
                </Typography>
                <Chip
                  label={program.day}
                  sx={{ bgcolor: col.bg, color: col.text, fontWeight: 700, fontSize: '0.78rem', border: `1px solid ${col.text}40` }}
                />
              </Box>

              {/* Squad tags */}
              <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                {program.squads.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.72rem' }}
                  />
                ))}
              </Stack>

              {/* Details */}
              <Stack spacing={2.5}>
                {[
                  { icon: <AccessTimeIcon sx={{ fontSize: 18, color: '#fff' }} />, label: 'Time', value: program.time },
                  { icon: <LocationOnIcon sx={{ fontSize: 18, color: '#fff' }} />, label: 'Location', value: 'Hoppers Crossing Cricket Store' },
                  { icon: <CalendarTodayIcon sx={{ fontSize: 18, color: '#fff' }} />, label: 'Season', value: program.dates },
                  { icon: <PersonIcon sx={{ fontSize: 18, color: '#fff' }} />, label: 'Coaches', value: program.coaches },
                ].map(({ icon, label, value }) => (
                  <Box key={label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.06)',
                        border: '2px solid #ffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', mb: 0.2 }}>
                        {label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                        {value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* CTA */}
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => openApplyModal(selected)}
                sx={{
                  bgcolor: '#f5c842',
                  color: '#021a4a',
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#e0b030' },
                }}
              >
                Apply for {program.label}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}