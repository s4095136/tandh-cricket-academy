import React from 'react'
import { Dialog, DialogContent, Box, Typography, Avatar, Chip, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { CLOUDINARY_BASE } from '../../config/cloudinary'

// const API_URL = 'https://tandh-backend-deployment-production.up.railway.app'
// const API_URL_LOCAL = 'http://localhost:5000'
const CLOUDINARY = CLOUDINARY_BASE

interface Coach {
  id: number
  initials: string
  name: string
  role: string
  credentials: string[]
  bio: string
  image: string | null
  accent_color: string
  bg_color: string
  tags: string[]
}

interface Props {
  coach: Coach | null
  onClose: () => void
}

export default function CoachDialog({ coach, onClose }: Props) {
  return (
    <Dialog
      open={!!coach}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#021a4a !important',
            backgroundImage: 'none !important',
            color: '#ffffff',
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          },
        },
      }}
    >
      {coach && (
        <DialogContent sx={{ backgroundColor: '#021a4a', color: '#ffffff', p: 0 }}>
          <Box
            sx={{
              background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
              px: 4,
              py: 4,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: 3,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              position: 'relative',
            }}
          >
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                position: 'absolute', top: 12, right: 12,
                color: 'rgba(255,255,255,0.5)',
                '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Avatar
src={`${CLOUDINARY}/${coach.image
  ?.replace('/images/coaches/', '')
  ?.replace('/images/', '')}`}
                sx={{ width: 140, height: 140, flexShrink: 0, border: '4px solid #f5c842', '& img': {
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
            }, }}
            />
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h3" sx={{ color: '#ffffff', fontWeight: 700, mb: 0.5 }}>
                {coach.name}
              </Typography>
              <Typography sx={{ color: '#f5c842', fontWeight: 600, fontSize: '1.1rem' }}>
                {coach.role}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ p: 4 }}>
            <Box sx={{ mb: 3 }}>
              {coach.credentials?.map((cred: string) => (
                <Typography key={cred} sx={{ color: 'rgba(255,255,255,0.85)', mb: 0.5 }}>
                  • {cred}
                </Typography>
              ))}
            </Box>
            <Typography
              sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, textAlign: 'left', maxWidth: 700, mx: 'auto', mb: 3 }}
            >
              {coach.bio}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
              {coach.tags?.map((tag: string) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(245,200,66,0.15)',
                    color: '#f5c842',
                    border: '1px solid rgba(245,200,66,0.25)',
                    fontWeight: 600,
                  }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
      )}
    </Dialog>
  )
}