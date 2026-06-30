import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Avatar,
  IconButton,
  Grid,
} from '@mui/material'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import PeopleIcon from '@mui/icons-material/People'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const API_URL = 'https://tandh-backend-deployment-production.up.railway.app'

import { CLOUDINARY_BASE } from '../../config/cloudinary'

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

const TRUST_STATS = [
  { icon: <SportsCricketIcon />, value: '250+', label: 'Players developed' },
  { icon: <WorkspacePremiumIcon />, value: 'BBL', label: 'Professional experience' },
  { icon: <PeopleIcon />, value: '8yrs', label: 'Coaching together' },
]

function CoachCard({ coach }: { coach: Coach }) {
  const [hovered, setHovered] = useState(false)
  return (
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          borderRadius: 5,
          transition: 'all 0.3s ease',

          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
          },
        }}
      >      
        <Box
        sx={{
          background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
          px: 3,
          py: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2.5,
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: coach.accent_color,
            border: '2px solid rgba(255,255,255,0.2)',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.5rem',
            letterSpacing: '0.05em',
            color: '#fff',
          }}
        >
          {coach.initials}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ color: '#fff', fontSize: '1.2rem', mb: 0.3 }}>
            {coach.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>
            {coach.role}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Stack spacing={0.8} sx={{ mb: 2.5, flexShrink: 0 }}>
          {coach.credentials.map((cred) => (
            <Box key={cred} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: 'primary.main', fontWeight: 600, fontSize: '0.82rem' }}
              >
                {cred}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.75 }}
          >
            {coach.bio}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2.5 }}>
          {coach.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                bgcolor: 'rgba(29,110,74,0.08)',
                color: 'primary.main',
                fontSize: '0.7rem',
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default function CoachesSection() {
  const [coaches, setCoaches] = useState<Coach[]>([])

  useEffect(() => {
    fetch(`${API_URL}/api/coaches`)
      .then((res) => res.json())
      .then((data) => setCoaches(data))
      .catch((err) => console.error('FETCH ERROR:', err))
  }, [])

const sortedAsc = [...coaches].sort((a, b) => a.id - b.id)
const founders = sortedAsc.slice(0, 2)
const rest = sortedAsc.slice(2)
const assistantCoaches = rest
const initialSlide = 0

return (
    <Box
      id="coaches"
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default', overflow: 'hidden' }}
    >

      {/* ── MEET THE FOUNDERS ── */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1.5 }}>
            The founders
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: 'secondary.main' }}
          >
            Meet the founders
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 500, mx: 'auto', mt: 2 }}
          >
            A unique blend of professional playing expertise and deep coaching experience.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: { xs: 10, md: 14 } }}>
          {founders.map((coach) => (
            <Grid size={{ xs: 12, md: 6 }} key={coach.id}>
              <CoachCard coach={coach} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ── MEET THE COACHES ── */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1.5 }}>
            The coaching team
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: 'secondary.main' }}
          >
            Meet the coaches
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 500, mx: 'auto', mt: 2 }}
          >
            Our team of dedicated coaches bringing specialist skills to every session.
          </Typography>
        </Box>
      </Container>

      {/* Swiper */}
      {assistantCoaches.length > 0 && (
        <Box
          sx={{
            mb: 8,
            position: 'relative',
            overflow: 'visible',
            px: { xs: 2, md: 4 },
            pt: 2, // ADD THIS
          }}
        >
          <IconButton
            className="coach-prev"
            sx={{
              position: 'absolute',
              left: { xs: 8, md: 24 },
              top: '45%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              bgcolor: 'primary.main',
              color: '#fff',
              width: 44,
              height: 44,
              '&:hover': { bgcolor: 'primary.dark' },
              '&.swiper-button-disabled': { opacity: 0.3, pointerEvents: 'none' },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <IconButton
            className="coach-next"
            sx={{
              position: 'absolute',
              right: { xs: 8, md: 24 },
              top: '45%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              bgcolor: 'primary.main',
              color: '#fff',
              width: 44,
              height: 44,
              '&:hover': { bgcolor: 'primary.dark' },
              '&.swiper-button-disabled': { opacity: 0.3, pointerEvents: 'none' },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>

<Swiper
  modules={[Navigation, Pagination, Autoplay]}
  navigation={{
    prevEl: '.coach-prev',
    nextEl: '.coach-next',
  }}
  pagination={{ clickable: true }}
  autoplay={{
    delay: 5000,
    disableOnInteraction: false,
  }}
  loop={assistantCoaches.length > 3}
  spaceBetween={20}
  centeredSlides={false}
  initialSlide={0}
  slidesPerView={1.2}
  breakpoints={{
    600: { slidesPerView: 1.5 },
    900: { slidesPerView: 2.2 },
    1200: { slidesPerView: 2.2 },
  }}
  style={{
    paddingTop: '12px',
    paddingBottom: '50px',
    paddingLeft: '16px',
    paddingRight: '16px',
  }}>
    {assistantCoaches.map((coach) => (
    <SwiperSlide key={coach.id} style={{ height: 'auto' }}>
      <CoachCard coach={coach} />
    </SwiperSlide>
  ))}
</Swiper>

        </Box>
      )}

      {/* ── TRUST STATS ── */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 4, md: 8 },
            flexWrap: 'wrap',
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {TRUST_STATS.map((stat) => (
            <Box key={stat.label} sx={{ textAlign: 'center' }}>
              <Box sx={{ color: 'primary.main', mb: 0.5 }}>{stat.icon}</Box>
              <Typography
                sx={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2rem',
                  color: 'secondary.main',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

    </Box>
  )
}