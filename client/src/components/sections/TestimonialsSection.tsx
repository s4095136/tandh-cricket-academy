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
        bgcolor: '#021a4a',
        border: '1px solid rgba(2,26,74,0.3)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        borderRadius: 4,
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 32px rgba(2,26,74,0.4)',
        },
      }}
    >
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <FormatQuoteIcon sx={{ color: '#f5c842', fontSize: 28, mb: 1.5, opacity: 0.9 }} />
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
              bgcolor: '#f5c842',
              color: '#021a4a',
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
            sx={{ ml: 'auto', '& .MuiRating-iconFilled': { color: '#f5c842' } }}
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
        bgcolor: '#f5c842',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background dots */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(2,26,74,0.06) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Top accent line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #021a4a, #032053)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              display: 'inline-block',
              bgcolor: 'rgba(2,26,74,0.1)',
              border: '1px solid rgba(2,26,74,0.2)',
              borderRadius: 10,
              px: 2,
              py: 0.5,
              mb: 2,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: '#021a4a', fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.72rem' }}
            >
              What families say
            </Typography>
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.8rem', md: '3.8rem' },
              color: '#021a4a',
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            Trusted by Melbourne families
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 4,
              bgcolor: '#021a4a',
              borderRadius: 2,
              mx: 'auto',
              mt: 3,
            }}
          />
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
                bgcolor: '#021a4a',
                color: '#f5c842',
                width: 44,
                height: 44,
                '&:hover': { bgcolor: '#032053' },
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
                bgcolor: '#021a4a',
                color: '#f5c842',
                width: 44,
                height: 44,
                '&:hover': { bgcolor: '#032053' },
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