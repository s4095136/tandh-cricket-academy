import React from 'react'
import { Box, Container, Typography, Stack } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
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

const BASE = 'https://tandh-backend-deployment-production.up.railway.app'
import { CLOUDINARY_BASE } from '../../config/cloudinary'
const CLOUDINARY = CLOUDINARY_BASE


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

function SectionBlock({
  title,
  items,
  image,
  grid = false,
}: {
  title: string
  items: { title: string; description: string }[]
  image: string
  grid?: boolean
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        mb: 4,
        minHeight: { xs: 'auto', md: 340 },
      }}
    >
      {/* Background image */}
      <Box
        component="img"
        src={image}
        alt=""
sx={{
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',

  // Zoom Tom slightly on mobile
  transform: image.includes('tombbl')
    ? {
        xs: 'scale(1.3)',
        md: 'scale(1)',
      }
    : 'scale(1)',

  // Position each image differently
  objectPosition: image.includes('tombbl')
    ? {
        xs: 'center center', // Tom centred on mobile
        md: 'center 30%',
      }
    : {
        xs: '30% center', // Hanni moved slightly right on mobile
        md: 'center 20%',
      },

  opacity: 1,
  zIndex: 0,
}}
      />

      {/* Dark overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
background:
  'linear-gradient(90deg, rgba(1,13,42,0.9) 0%, rgba(1,13,42,0.75) 35%, rgba(1,13,42,0.45) 70%, rgba(1,13,42,0.3) 100%)',          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          p: { xs: 3, md: 10 },
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
              pt: { xs: 2, md: 6 }, 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
              gap: 3,
            }}
          >
            {items.map((item) => (
<Box key={item.title}>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 1,
      mb: 1,
    }}
  >
    <CheckIcon
      sx={{
        color: '#f5c842',
        fontSize: 20,
        mt: '2px',
        flexShrink: 0,
      }}
    />

    <Typography
      sx={{
        color: '#f5c842',
        fontWeight: 800,
        fontSize: '0.9rem',
        lineHeight: 1.3,
      }}
    >
      {item.title}
    </Typography>
  </Box>

  <Typography
    sx={{
      color: 'rgba(255,255,255,0.75)',
      fontSize: '0.8rem',
      lineHeight: 1.8,
    }}
  >
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
    </Box>
  )
}

export default function PhilosophySection() {
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
      <Container maxWidth="lg" id="philosophy" sx={{ scrollMarginTop: { xs: '72px', md: '80px' } }}>

        {/* Header */}
        <MotionBox
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{ mb: { xs: 6, md: 8 } }}
        >
          <MotionBox variants={fadeUp}>
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
          </MotionBox>

          <MotionTypography
            variants={fadeUp}
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: '#fff', fontWeight: 900, lineHeight: 1.1, mb: 2 }}
          >
            Developing Cricketers
            <Box component="span" sx={{ color: '#f5c842' }}> For Success</Box>
          </MotionTypography>

          <MotionBox variants={fadeUp} sx={{ width: 60, height: 4, bgcolor: '#f5c842', borderRadius: 2, mb: 3 }} />

          <MotionTypography variants={fadeUp} sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, maxWidth: 680, fontSize: '0.95rem' }}>
            At T&H Cricket, we are passionate about developing cricketers for success, both on and off the field.
            Our programs are built on strong technical foundations, combined with a focus on game awareness,
            tactical understanding, and continuous personal development. Whether you're picking up a bat for
            the first time or competing at an elite level, our coaching environment is designed to help every
            player improve, perform, and thrive.
          </MotionTypography>
        </MotionBox>

        <MotionBox variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          <SectionBlock
            title="Player Development"
            items={philosophyValues}
            image={`${CLOUDINARY}/hanni.png`}
            grid
          />
        </MotionBox>

        <MotionBox variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          <SectionBlock
            title="Cricket Excellence"
            items={developmentValues}
            image={`${CLOUDINARY}/tombbl.png`}
          />
        </MotionBox>

      </Container>
    </Box>
  )
}