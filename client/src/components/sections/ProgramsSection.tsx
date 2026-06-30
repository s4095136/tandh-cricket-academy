import React, { useState } from 'react'
import {
  Box, Container, Typography, Stack, Button,
  Dialog, DialogContent, IconButton, Chip, Fade,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CloseIcon from '@mui/icons-material/Close'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import type { Program } from '../../data/programs'
import { PROGRAMS, DAY_COLOR } from '../../data/programs'
import { useApplyModal } from '../../context/ApplyModalContext'

import { CLOUDINARY_BASE } from '../../config/cloudinary'


const PROGRAM_IMAGES = [
  `${CLOUDINARY_BASE}/open.png`,
  `${CLOUDINARY_BASE}/16s.png`,
  `${CLOUDINARY_BASE}/14s.png`,
  `${CLOUDINARY_BASE}/12s.png`,
  `${CLOUDINARY_BASE}/10s.png`,
]
function ProgramDialog({
  program,
  index,
  onClose,
}: {
  program: Program | null
  index: number
  onClose: () => void
}) {
  const { openApplyModal } = useApplyModal()
  if (!program) return null
  const col = DAY_COLOR[program.day] ?? { bg: 'rgba(255,255,255,0.08)', text: '#fff' }
  const image = PROGRAM_IMAGES[index]
const imagePositions = [
  'center 65%',  // Open (index 0)
  'center 35%',  // 16s  (index 1)
  'center 10%',  // 14s  (index 2)
  'center 50%',  // 12s  (index 3)
  'center 20%',  // 10s  (index 4)
]
  return (
    <Dialog
      open={!!program}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={{ enter: 220, exit: 150 }}
      slotProps={{ paper: { sx: { bgcolor: '#021a4a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, color: '#fff', overflow: 'hidden' } } }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Hero image banner */}
        <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
          <Box
            component="img"
            src={image}
            alt={program.label}
            sx={{
              width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: imagePositions[index],              
            filter: 'brightness(0.8)',
            }}
            onError={(e: any) => { e.target.style.display = 'none' }}
          />
          <Box
            sx={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(2,26,74,0.98) 0%, rgba(2,26,74,0.6) 10%, transparent 20%)',
            }}
          />
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              position: 'absolute', top: 12, right: 12,
              bgcolor: 'rgba(0,0,0,0.45)', color: '#fff',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Box sx={{ position: 'absolute', bottom: 16, left: 20, right: 20 }}>
            <Typography sx={{ color: '#f5c842', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', mb: 0.4 }}>
              {program.title.toUpperCase()}
            </Typography>
            <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '2rem', lineHeight: 1, mb: 1 }}>
              {program.label}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
              <Chip
                label={program.day}
                size="small"
                sx={{ bgcolor: col.bg, color: col.text, fontWeight: 700, fontSize: '0.68rem', border: `1px solid ${col.text}40` }}
              />
              {program.squads.map(s => (
                <Chip key={s} label={s} size="small"
                  sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', fontSize: '0.68rem', fontWeight: 600 }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Body */}
        <Box sx={{ px: 3.5, py: 3 }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontSize: '0.92rem', mb: 3 }}>
            {program.description}
          </Typography>

          <Stack spacing={2} sx={{ mb: 3.5 }}>
            {[
              { icon: <AccessTimeIcon sx={{ fontSize: 17 }} />, label: 'Time', value: program.time },
              { icon: <CalendarTodayIcon sx={{ fontSize: 17 }} />, label: 'Season', value: program.dates },
              { icon: <PersonIcon sx={{ fontSize: 17 }} />, label: 'Coaches', value: program.coaches },
            ].map(({ icon, label, value }) => (
              <Box key={label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 32, height: 32, borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, color: '#f5c842',
                  }}
                >
                  {icon}
                </Box>
                <Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', mb: 0.2 }}>{label}</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.88)', fontWeight: 600, fontSize: '0.85rem' }}>{value}</Typography>
                </Box>
              </Box>
            ))}
          </Stack>

          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            fullWidth
            onClick={() => { onClose(); openApplyModal(index) }}
            sx={{ bgcolor: '#f5c842', color: '#021a4a', fontWeight: 700, py: 1.2, '&:hover': { bgcolor: '#e0b030' } }}
          >
            Register for {program.label}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default function ProgramsSection() {
  const { openApplyModal } = useApplyModal()
  const [dialogProgram, setDialogProgram] = useState<{ program: Program; index: number } | null>(null)

  // Preload all dialog images on mount so they're cached before a tap opens the dialog
  React.useEffect(() => {
    PROGRAM_IMAGES.forEach(src => { const img = new Image(); img.src = src })
  }, [])

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
        <Box sx={{ mb: { xs: 5, md: 8 } }}>
          <Typography variant="overline" sx={{ display: 'block', mb: 1, color: '#f5c842' }}>
            2026 Season · May – August
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: '#ffffff', mb: 2 }}
          >
            Development Today.
            <br />
            <Box component="span" sx={{ color: '#f5c842' }}>Excellence Tomorrow.</Box>
          </Typography>
          <Box sx={{ width: 48, height: 3, bgcolor: '#f5c842', borderRadius: 2, mb: 2 }} />
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 480, lineHeight: 1.8 }}>
            Programs tailored to meet players where they are — and take them where they want to go.
          </Typography>
        </Box>

        {/* Programs grid — layout 3 style */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(5, 1fr)',
            },
            gap: 2,
          }}
        >
          {PROGRAMS.map((program, i) => (
            <Box
              key={program.label}
              onClick={() => setDialogProgram({ program, index: i })}
              sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                minHeight: { xs: 280, md: 380 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                cursor: 'pointer',
                transition: 'transform 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                },
                '&:hover .overlay': {
                  bgcolor: 'rgba(1,13,42,0.5)',
                },
                '&:hover .register-btn': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              }}
            >
{/* Background image */}
<Box
  component="img"
  src={PROGRAM_IMAGES[i]}
  alt={program.label}
  sx={{
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
    opacity: 0.65, // Increase/decrease visibility
    filter: 'brightness(1.15) contrast(1.05)',
  }}
  onError={(e: any) => {
    e.target.style.display = 'none'
  }}
/>

              {/* Fallback bg if no image
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(2,26,74,0.9)',
                  zIndex: 0,
                }}
              /> */}

              {/* Gradient overlay */}
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(1,13,42,0.97) 0%, rgba(1,13,42,0.4) 60%, transparent 100%)',
                  zIndex: 1,
                  transition: 'background 0.25s ease',
                }}
              />

              {/* Content */}
              <Box sx={{ position: 'relative', zIndex: 2, p: 2.5 }}>
                <Typography
                  variant="overline"
                  sx={{ color: '#f5c842', fontSize: '0.65rem', letterSpacing: '0.12em', display: 'block', mb: 0.5 }}
                >
                  Our Programs
                </Typography>

                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    lineHeight: 1.1,
                    mb: 1,
                  }}
                >
                  {program.label}
                </Typography>

                <Box sx={{ width: 32, height: 2, bgcolor: '#f5c842', borderRadius: 1, mb: 1.5 }} />

                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', mb: 0.5 }}>
                  {program.day}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', mb: 0.5 }}>
                  {program.time}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', mb: 2 }}>
                  {program.dates}
                </Typography>

                <Button
                  className="register-btn"
                  size="small"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: '0.8rem !important' }} />}
                  onClick={(e) => { e.stopPropagation(); openApplyModal(i) }}
                  sx={{
                    bgcolor: '#f5c842',
                    color: '#021a4a',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    px: 2,
                    py: 0.8,
                    borderRadius: 2,
                    opacity: { xs: 1, md: 0 },
                    transform: { xs: 'none', md: 'translateY(8px)' },
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                    '&:hover': { bgcolor: '#e0b030' },
                  }}
                >
                  Register
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

      </Container>

      <ProgramDialog
        program={dialogProgram?.program ?? null}
        index={dialogProgram?.index ?? 0}
        onClose={() => setDialogProgram(null)}
      />
    </Box>
  )
}
