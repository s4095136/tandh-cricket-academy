import React, { useState } from 'react'
import { Box, Container, Typography, Card, CardContent, Grid, Avatar, Rating, IconButton, TextField, Button, MenuItem, Skeleton, Dialog, DialogContent, GlobalStyles } from '@mui/material'
import { motion, type Variants } from 'framer-motion'

const MotionBox = motion(Box)
const MotionTypography = motion(Typography)

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CloseIcon from '@mui/icons-material/Close'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { PROGRAMS } from '../../data/programs'
import { useTestimonials, type Review } from '../../context/TestimonialsContext'

// const API_URL = 'https://tandh-backend-deployment-production.up.railway.app'

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://tandh-backend-deployment-production.up.railway.app'

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.05)',

    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.15)',
    },

    '&:hover fieldset': {
      borderColor: '#f5c842',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#f5c842',
    },
  },

  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.7)',
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: '#f5c842',
  },

  '& .MuiInputBase-input': {
    color: '#fff',
  },
}

const EMPTY_REVIEW_FORM = {
  name: '',
  relation: '',
  grade: '',
  quote: '',
}

const RELATION_OPTIONS = ['Parent', 'Player']

const GRADE_OPTIONS = [...PROGRAMS.map((p) => p.label), 'Other']

// Roughly how many characters fit in the 5-line clamp below before text gets
// cut off - used to decide whether a card needs a "Read more" affordance.
const QUOTE_TRUNCATE_THRESHOLD = 260

function TestimonialCard({ t }: { t: Review }) {
  const [open, setOpen] = useState(false)
  const isLong = t.quote.length > QUOTE_TRUNCATE_THRESHOLD

  return (
    <>
      <Card
        // onClick={() => isLong && setOpen(true)}
        onClick={() => setOpen(true)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
          borderRadius: 4,
          cursor: isLong ? 'pointer' : 'default',
          '&:hover': {
            transform: 'translateY(-5px)',
            bgcolor: 'rgba(255,255,255,0.08)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
          },
        }}
      >
        <CardContent sx={{ p: 3.5, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <FormatQuoteIcon sx={{ color: '#f5c842', fontSize: 32, mb: 1.5, opacity: 0.9 }} />
          <Box sx={{ flexGrow: 1, mb: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.75,
                fontSize: '0.95rem',
                fontStyle: 'italic',
                display: '-webkit-box',
                WebkitLineClamp: 5,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: '8.75em',
              }}
            >
              "{t.quote}"
            </Typography>
            {isLong && (
              <Typography
                sx={{
                  color: '#f5c842',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  mt: 1,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Read more
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                width: 42,
                height: 42,
                bgcolor: '#f5c842',
                color: '#021a4a',
                fontSize: '0.85rem',
                fontWeight: 700,
              }}
            >
              {t.initials}
            </Avatar>
            <Box>
              <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                {t.name}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>
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

      {/* Full review dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              bgcolor: '#021a4a',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 4,
              backgroundImage: 'none',
            },
          },
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: 'absolute', top: 12, right: 12, color: 'rgba(255,255,255,0.6)' }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: { xs: 3, md: 4 } }}>
          <FormatQuoteIcon sx={{ color: '#f5c842', fontSize: 32, mb: 1.5, opacity: 0.9 }} />
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontStyle: 'italic', mb: 3 }}
          >
            "{t.quote}"
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                width: 42,
                height: 42,
                bgcolor: '#f5c842',
                color: '#021a4a',
                fontSize: '0.85rem',
                fontWeight: 700,
              }}
            >
              {t.initials}
            </Avatar>
            <Box>
              <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                {t.name}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>
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
        </DialogContent>
      </Dialog>
    </>
  )
}

function WriteReviewForm({ onClose }: { onClose?: () => void }) {
  const [form, setForm] = useState(EMPTY_REVIEW_FORM)
  const [rating, setRating] = useState<number | null>(5)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    setError(null)

    if (!form.name.trim() || !form.quote.trim() || !rating || !form.relation || !form.grade) {
      setError('Please add your name, role, grade, a rating and a review.')
      return
    }

    const role = form.relation === 'Parent'
      ? `Parent of ${form.grade} player`
      : `${form.grade} Player`

    setLoading(true)
    try {
        const res = await fetch(`${API_URL}/api/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, quote: form.quote, rating, role }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.message || 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Could not reach the server. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Box sx={{ textAlign: 'center', py: 4, px: 2 }}>
        <Typography variant="h5" sx={{ fontFamily: '"Bebas Neue", sans-serif', color: '#f5c842', mb: 1 }}>
          Thanks for your review!
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
          We really appreciate you taking the time to share your experience. It'll appear on this page once it's been reviewed.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            onClick={() => { setForm(EMPTY_REVIEW_FORM); setRating(5); setError(null); setSubmitted(false) }}
            sx={{ color: '#f5c842', borderColor: 'rgba(245,200,66,0.4)', '&:hover': { borderColor: '#f5c842', bgcolor: 'rgba(245,200,66,0.08)' } }}
          >
            Submit another review
          </Button>
          <Button variant="text" onClick={onClose} sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#fff' } }}>
            Close
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ p: { xs: 3, md: 4 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.04em', color: '#fff', mb: 0.5 }}>
            Write a review
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Let other families know what you think of T&H Cricket.
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#fff' }, mt: -0.5, mr: -1 }}>
          <CloseIcon />
        </IconButton>
      </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Full name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              size="small"
              sx={inputSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              select
              label="I am a..."
              name="relation"
              value={form.relation}
              onChange={handleChange}
              size="small"
              sx={inputSx}
              slotProps={{ select: { MenuProps: { slotProps: { paper: { sx: { bgcolor: '#021a4a', color: '#fff' } } } } } }}
            >
              {RELATION_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              select
              label="Grade"
              name="grade"
              value={form.grade}
              onChange={handleChange}
              size="small"
              sx={inputSx}
              slotProps={{ select: { MenuProps: { slotProps: { paper: { sx: { bgcolor: '#021a4a', color: '#fff' } } } } } }}
            >
              {GRADE_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                Your rating
              </Typography>
              <Rating
                value={rating}
                onChange={(_e, value) => setRating(value)}
                sx={{ '& .MuiRating-iconFilled': { color: '#f5c842' }, '& .MuiRating-iconEmpty': { color: 'rgba(255,255,255,0.25)' } }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your review"
              name="quote"
              value={form.quote}
              onChange={handleChange}
              required
              size="small"
              sx={inputSx}
            />
          </Grid>
          {error && (
            <Grid size={{ xs: 12 }}>
              <Typography color="error" variant="caption">{error}</Typography>
            </Grid>
          )}
          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: '#f5c842',
                color: '#021a4a',
                fontWeight: 700,
                '&:hover': { bgcolor: '#e0b030' },
                '&.Mui-disabled': { bgcolor: 'rgba(245,200,66,0.3)', color: 'rgba(2,26,74,0.5)' },
              }}
            >
              {loading ? 'Submitting...' : 'Submit review'}
            </Button>
          </Grid>
        </Grid>
    </Box>
  )
}

function RatingBreakdown({ testimonials }: { testimonials: Review[] }) {
  if (testimonials.length === 0) return null

  const avg = testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: testimonials.filter((t) => Math.round(t.rating) === star).length,
  }))
  const max = Math.max(...counts.map((c) => c.count), 1)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: { xs: 3, sm: 5 },
        bgcolor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 4,
        px: { xs: 3, md: 5 },
        py: { xs: 3, md: 4 },
        mb: { xs: 6, md: 8 },
      }}
    >
      {/* Big score */}
      <Box sx={{ textAlign: 'center', flexShrink: 0 }}>
        <Typography sx={{ fontSize: { xs: '3.5rem', md: '4.5rem' }, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
          {avg.toFixed(1)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.3, my: 0.75 }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Box key={s} sx={{ color: s <= Math.round(avg) ? '#f5c842' : 'rgba(255,255,255,0.2)', fontSize: '1.1rem' }}>★</Box>
          ))}
        </Box>
        <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>
          {testimonials.length} review{testimonials.length !== 1 ? 's' : ''}
        </Typography>
      </Box>

      {/* Divider */}
      <Box sx={{ width: { xs: '100%', sm: '1px' }, height: { xs: '1px', sm: 80 }, bgcolor: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

      {/* Bar chart */}
      <Box sx={{ flex: 1, width: '100%' }}>
        {counts.map(({ star, count }) => (
          <Box key={star} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.9 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', width: 8, flexShrink: 0 }}>{star}</Typography>
            <Box sx={{ color: '#f5c842', fontSize: '0.7rem', flexShrink: 0 }}>★</Box>
            <Box sx={{ flex: 1, height: 7, bgcolor: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
              <Box sx={{ width: `${(count / max) * 100}%`, height: '100%', bgcolor: '#f5c842', borderRadius: 4, transition: 'width 0.6s ease' }} />
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', width: 16, textAlign: 'right', flexShrink: 0 }}>{count}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default function TestimonialsSection() {
  const { testimonials, loading } = useTestimonials()
  const [reviewOpen, setReviewOpen] = useState(false)

  const useSwiper = testimonials.length > 4

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
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

      <Container maxWidth="lg" id="testimonials" sx={{ position: 'relative', zIndex: 1, scrollMarginTop: { xs: '72px', md: '80px' } }}>
        {/* Header */}
        <MotionBox
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}
        >
          <MotionBox variants={fadeUp}>
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10,
                px: 2,
                py: 0.5,
                mb: 2,
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: '#f5c842', fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.72rem' }}
              >
              Reviews
              </Typography>
            </Box>
          </MotionBox>
          <MotionTypography
            variants={fadeUp}
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3.8rem' },
              color: '#ffffff',
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            What Families Say
          </MotionTypography>
          <MotionBox
            variants={fadeUp}
            sx={{
              width: 60,
              height: 4,
              bgcolor: '#f5c842',
              borderRadius: 2,
              mx: 'auto',
              mt: 3,
            }}
          />
        </MotionBox>

        {!loading && <RatingBreakdown testimonials={testimonials} />}

        {loading ? (
          /* ── LOADING SKELETON (reserves space so the layout doesn't jump) ── */
          <Grid container spacing={3}>
            {[0, 1, 2].map((i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                <Skeleton
                  variant="rounded"
                  height={300}
                  sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 4 }}
                />
              </Grid>
            ))}
          </Grid>
        ) : useSwiper ? (
          /* ── SWIPER (more than 4 reviews) ── */
          <><GlobalStyles styles={{ '.testimonial-swiper.swiper': { overflowX: 'hidden !important', overflowY: 'visible !important' } }} />
          <Box sx={{ position: 'relative', overflow: 'visible' }}>
            <IconButton
              className="testimonial-prev"
              sx={{
                position: 'absolute',
                left: -20,
                top: '45%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                bgcolor: '#f5c842',
                color: '#021a4a',
                width: 44,
                height: 44,
                '&:hover': { bgcolor: '#f8d76a' },
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
                bgcolor: '#f5c842',
                color: '#021a4a',
                width: 44,
                height: 44,
                '&:hover': { bgcolor: '#f8d76a' },
                '&.swiper-button-disabled': { opacity: 0.3, pointerEvents: 'none' },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>

            <Swiper
              className="testimonial-swiper"
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
          </Box></>
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

        {/* Write a review */}
        <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 10 } }}>
          <Button
            variant="outlined"
            onClick={() => setReviewOpen(true)}
            endIcon={<ArrowForwardIcon />}
            sx={{ color: '#f5c842', borderColor: 'rgba(245,200,66,0.4)', fontWeight: 700, px: 3, py: 1.2, '&:hover': { borderColor: '#f5c842', bgcolor: 'rgba(245,200,66,0.08)' } }}
          >
            Write a review
          </Button>
        </Box>
        <Dialog
          open={reviewOpen}
          onClose={() => setReviewOpen(false)}
          maxWidth="sm"
          fullWidth
          disableScrollLock
          slotProps={{ paper: { sx: { bgcolor: '#021a4a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, backgroundImage: 'none' } } }}
        >
          <DialogContent sx={{ p: 0 }}>
            <WriteReviewForm onClose={() => setReviewOpen(false)} />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  )
}