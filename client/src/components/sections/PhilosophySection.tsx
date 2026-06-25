import React from 'react'
import { Box, Container, Typography, Stack } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

const philosophyValues = [
  {
    title: 'Positive & Supportive Environment',
    description: 'We create a professional yet encouraging space where players feel comfortable to learn, grow, and build confidence.',
  },
  {
    title: 'Tailored Coaching for Every Player',
    description: 'Our sessions are designed to suit all ages and abilities, ensuring every player feels supported, challenged, and confident.',
  },
  {
    title: 'Clear Player Pathways',
    description: 'A structured pathway giving players and parents clarity on progression from fundamentals through to representative cricket.',
  },
  {
    title: 'Specialist Coaching',
    description: 'Focused coaching across batting, spin bowling, fast bowling, and fielding to build strong, well-rounded skill sets.',
  },
  {
    title: 'Professional Insight',
    description: 'Learn from an active BBL player — giving players unique insight into what it takes to perform at the highest level.',
  },
]

const developmentValues = [
  {
    title: 'Fundamental Skills',
    description: 'Batting, bowling, fielding and wicket-keeping taught with a strong focus on correct technique.',
  },
  {
    title: 'High Performance Training',
    description: 'Advanced skills, decision-making under pressure and elite preparation for representative-level cricketers.',
  },
  {
    title: 'Game Awareness & Match Simulation',
    description: 'Scenario-based training that replicates real match conditions and develops tactical understanding.',
  },
  {
    title: 'Elite Development',
    description: 'Advanced skill development, strength and conditioning, injury prevention and an elite mindset.',
  },
  {
    title: 'Small Group Training',
    description: 'Low coach-to-player ratios to maximise individual attention and results.',
  },
]

const IMAGE_URL = 'https://tandh-backend-deployment-production.up.railway.app/images/coaches/tom-rogers.png'

function SectionBlock({
  title,
  items,
  grid = false,
  imageSide,
}: {
  title: string
  items: { title: string; description: string }[]
  grid?: boolean
  imageSide?: 'right'
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        mb: 4,
        minHeight: { xs: 'auto', md: 320 },
        display: imageSide ? 'flex' : 'block',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Mobile image — top (only when imageSide is set) */}
      {imageSide && (
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            height: 220,
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={IMAGE_URL}
            alt=""
            sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(1,13,42,1) 0%, transparent 60%)',
            }}
          />
        </Box>
      )}

      {/* Background image (full cover — only when no imageSide) */}
      {!imageSide && (
        <>
          <Box
            component="img"
            src={'https://tandh-backend-deployment-production.up.railway.app/images/philosophy/group.png'}
            alt=""
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.45,
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(1,13,42,0.6)',
              zIndex: 1,
            }}
          />
        </>
      )}

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          p: { xs: 3, md: 5 },
          flex: 1,
          bgcolor: imageSide ? 'rgba(255,255,255,0.03)' : 'transparent',
        }}
      >
        <Typography
          sx={{
            color: '#fff',
            fontWeight: 900,
            fontSize: { xs: '1.4rem', md: '2rem' },
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Box sx={{ width: 40, height: 3, bgcolor: '#f5c842', borderRadius: 2, mb: 4 }} />

        {grid ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
              gap: 3,
            }}
          >
            {items.map((item) => (
              <Box key={item.title}>
                <CheckIcon sx={{ color: '#f5c842', fontSize: 24, mb: 1 }} />
                <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.85rem', mb: 0.8, lineHeight: 1.3 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', lineHeight: 1.7 }}>
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Stack spacing={2.5}>
            {items.map((item) => (
              <Box key={item.title} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <CheckIcon sx={{ color: '#f5c842', fontSize: 18, mt: 0.3, flexShrink: 0 }} />
                <Box>
                  <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.88rem', mb: 0.3 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      {/* Desktop image — right side */}
      {imageSide && (
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            width: '40%',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={IMAGE_URL}
            alt=""
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(2,26,74,0.95) 0%, transparent 60%)',
            }}
          />
        </Box>
      )}
    </Box>
  )
}

export default function PhilosophySection() {
  return (
    <Box
      id="philosophy"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              display: 'inline-block',
              bgcolor: 'rgba(245,200,66,0.1)',
              border: '1px solid rgba(245,200,66,0.2)',
              borderRadius: 10,
              px: 2,
              py: 0.5,
              mb: 3,
            }}
          >
            <Typography variant="overline" sx={{ color: '#f5c842', fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.72rem' }}>
              Our Philosophy
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: '#fff', fontWeight: 900, lineHeight: 1.1, mb: 2 }}
          >
            Developing Cricketers
            <Box component="span" sx={{ color: '#f5c842' }}> For Success</Box>
          </Typography>

          <Box sx={{ width: 60, height: 4, bgcolor: '#f5c842', borderRadius: 2, mb: 3 }} />

          <Typography
            sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, maxWidth: 680, fontSize: '0.95rem' }}
          >
            At T&H Cricket, we are passionate about developing cricketers for success, both on and off the field.
            Our programs are built on strong technical foundations, combined with a focus on game awareness,
            tactical understanding, and continuous personal development. Whether you're picking up a bat for
            the first time or competing at an elite level, our coaching environment is designed to help every
            player improve, perform, and thrive.
          </Typography>
        </Box>

{/* Player Development — full background image, grid layout */}
<SectionBlock title="Player Development" items={philosophyValues} grid />

{/* Cricket Excellence — image on right desktop, top mobile */}
<SectionBlock title="Cricket Excellence" items={developmentValues} imageSide="right" />

      </Container>
    </Box>
  )
}