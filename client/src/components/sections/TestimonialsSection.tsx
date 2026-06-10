import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Card, CardContent, Grid, Avatar, Rating, IconButton } from '@mui/material'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Review {
  id: number
  initials: string
  name: string
  role: string
  rating: number
  quote: string
}

function TestimonialCard({ t }: { t: Review }) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(4px)',
        transition: 'transform 0.2s, background 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          bgcolor: 'rgba(255,255,255,0.08)',
        },
      }}
    >
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <FormatQuoteIcon sx={{ color: 'secondary.main', fontSize: 28, mb: 1.5, opacity: 0.8 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, mb: 3, fontStyle: 'italic' }}
          >
            "{t.quote}"
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              width: 38,
              height: 38,
              bgcolor: 'primary.main',
              fontSize: '0.78rem',
              fontWeight: 700,
            }}
          >
            {t.initials}
          </Avatar>
          <Box>
            <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>
              {t.name}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>
              {t.role}
            </Typography>
          </Box>
          <Rating
            value={t.rating}
            readOnly
            size="small"
            sx={{ ml: 'auto', '& .MuiRating-iconFilled': { color: 'secondary.main' } }}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Review[]>([])

  useEffect(() => {
    fetch('http://localhost:4000/api/testimonials')
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error('Failed to fetch testimonials:', err))
  }, [])

  const useSwiper = testimonials.length > 4

  return (
    <Box
      id="testimonials"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'primary.dark',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background dots */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', display: 'block', mb: 1.5 }}>
            What families say
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: '#ffffff' }}
          >
            Trusted by Melbourne families
          </Typography>
        </Box>

        {useSwiper ? (
          /* ── SWIPER (more than 4 reviews) ── */
          <Box sx={{ position: 'relative' }}>
            <IconButton
              className="testimonial-prev"
              sx={{
                position: 'absolute',
                left: -20,
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
              className="testimonial-next"
              sx={{
                position: 'absolute',
                right: -20,
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
                prevEl: '.testimonial-prev',
                nextEl: '.testimonial-next',
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={testimonials.length > 6}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                600: { slidesPerView: 2 },
                900: { slidesPerView: 3 },
              }}
              style={{ paddingBottom: '50px', alignItems: 'stretch' }}
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id} style={{ height: 'auto' }}>
                  <TestimonialCard t={t} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        ) : (
          /* ── GRID (4 or fewer reviews) ── */
          <Grid container spacing={3}>
            {testimonials.map((t) => (
              <Grid key={t.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <TestimonialCard t={t} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}