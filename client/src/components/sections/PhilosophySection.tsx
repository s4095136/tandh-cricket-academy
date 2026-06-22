import React from 'react'
import { Box, Container, Typography, Grid, Stack } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined'
import CheckIcon from '@mui/icons-material/Check';
// const PILLARS = [
//   {
//     title: 'Fundamental Skills',
//     description: 'Batting, bowling, fielding and wicket-keeping taught with progressive technique drills.',
//   },
//   {
//     title: 'Mental Strength',
//     description: 'Building confidence, focus and strategic thinking for high-pressure match situations.',
//   },
//   {
//     title: 'Teamwork & Sportsmanship',
//     description: 'Developing character both on and off the field. Cricket is a team game at every level.',
//   },
//   {
//     title: 'Match Simulation',
//     description: 'Regular skill camps, holiday clinics, and game-day simulations for real experience.',
//   },
// ]

// const PILLARS = [
//   {
//     title: 'Fundamental Skills',
//     description:
//       'Batting, bowling, fielding, and wicket-keeping are taught with a strong focus on correct technique and skill development. Particular emphasis is placed on developing a dominant top hand, ensuring players build control, balance, and consistency when playing both forward and back.',
//   },
//   {
//     title: 'High Performance Training',
//     description:
//       'Designed for committed and representative-level cricketers, our High Performance Training program focuses on refining advanced skills, improving decision-making under pressure, and preparing players for the demands of elite competition.',
//   },
//   {
//     title: 'Game Awareness & Match Simulation',
//     description:
//       'Scenario-based training replicates real match conditions, helping players develop game awareness, tactical understanding, adaptability, and the ability to execute under pressure.',
//   },
//   {
//     title: 'Elite Development',
//     description:
//       'Combining advanced skill development, strength and conditioning integration, injury prevention, and an elite mindset, players are equipped with the tools required to perform consistently at the highest level.',
//   },
// ]

// const VALUES = [
//   'Positive and supportive learning environment',
//   'Coaching tailored to every age and skill level',
//   'Beginner to elite representative pathways',
//   'Specialized spin and fast bowling coaching',
//   'Professional insight from an active BBL player',
//   'Small group sessions for maximum development',
// ]

// const VALUES = [
//   {
//     title: 'Positive & Supportive Environment',
//     description:
//       'Players learn, grow, and build confidence in a professional and encouraging setting.',
//   },
//   {
//     title: 'Tailored Coaching for Every Player',
//     description:
//       'Sessions are designed to suit all ages and skill levels, from juniors to elite representatives.',
//   },
//   {
//     title: 'Clear Player Pathways',
//     description:
//       'Structured development programs that guide players from beginner to representative cricket.',
//   },
//   {
//     title: 'Specialist Coaching',
//     description:
//       'Dedicated training in spin bowling, fast bowling, and skill-specific development.',
//   },
//   {
//     title: 'Professional Insight',
//     description:
//       'Learn from an active Big Bash League (BBL) player, gaining real-world, high-performance knowledge.',
//   },
//   {
//     title: 'Small Group Training',
//     description:
//       'Low coach-to-player ratios to maximise individual attention and results.',
//   },
// ]

// const VALUES = [
//   {
//     title: 'Positive & Supportive Environment',
//     description:
//       'Players learn, grow, and build confidence in a professional and encouraging setting.',
//   },
//   {
//     title: 'Tailored Coaching for Every Player',
//     description:
//       'Sessions are designed to suit all ages and skill levels—from juniors to elite representatives.',
//   },
//   {
//     title: 'Clear Player Pathways',
//     description:
//       'Structured development programs that guide players from beginner to representative cricket.',
//   },
//   {
//     title: 'Fundamental Skills',
//     description:
//       'Batting, bowling, fielding and wicket-keeping are taught with a strong focus on correct technique and skill development.',
//   },
//   {
//     title: 'High Performance Training',
//     description:
//       'Designed for committed and representative-level cricketers, focusing on advanced skills, decision-making under pressure and elite preparation.',
//   },
//   {
//     title: 'Game Awareness & Match Simulation',
//     description:
//       'Scenario-based training that replicates real match conditions and develops tactical understanding.',
//   },
//   {
//     title: 'Specialist Coaching',
//     description:
//       'Dedicated training in spin bowling, fast bowling and skill-specific development.',
//   },
//   {
//     title: 'Professional Insight',
//     description:
//       'Learn from an active Big Bash League (BBL) player, gaining real-world high-performance knowledge.',
//   },
//   {
//     title: 'Elite Development',
//     description:
//       'Combining advanced skill development, strength and conditioning, injury prevention and an elite mindset.',
//   },
//   {
//     title: 'Small Group Training',
//     description:
//       'Low coach-to-player ratios to maximise individual attention and results.',
//   },
// ]

const philosophyValues = [
  {
    title: 'Positive & Supportive Environment',
    description:
      'Players learn, grow, and build confidence in a professional and encouraging setting.',
  },
  {
    title: 'Tailored Coaching for Every Player',
    description:
      'Sessions are designed to suit all ages and skill levels—from juniors to elite representatives.',
  },
  {
    title: 'Clear Player Pathways',
    description:
      'Structured development programs that guide players from beginner to representative cricket.',
  },
  {
    title: 'Specialist Coaching',
    description:
      'Dedicated training in spin bowling, fast bowling and skill-specific development.',
  },
  {
    title: 'Professional Insight',
    description:
      'Learn from an active Big Bash League (BBL) player, gaining real-world high-performance knowledge.',
  },
]

const developmentValues = [
  {
    title: 'Fundamental Skills',
    description:
      'Batting, bowling, fielding and wicket-keeping are taught with a strong focus on correct technique and skill development.',
  },
  {
    title: 'High Performance Training',
    description:
      'Designed for committed and representative-level cricketers, focusing on advanced skills, decision-making under pressure and elite preparation.',
  },
  {
    title: 'Game Awareness & Match Simulation',
    description:
      'Scenario-based training that replicates real match conditions and develops tactical understanding.',
  },
  {
    title: 'Elite Development',
    description:
      'Combining advanced skill development, strength and conditioning, injury prevention and an elite mindset.',
  },
  {
    title: 'Small Group Training',
    description:
      'Low coach-to-player ratios to maximise individual attention and results.',
  },
]
export default function PhilosophySection() {
  return (
    <Box
      id="philosophy"
      component="section"
      sx={{
        py: { xs: 8, md: 8 },
        minHeight: { md: 'calc(100vh - 72px)' },
        display: { md: 'flex' },
        alignItems: { md: 'center' },
        background: 'linear-gradient(150deg, #010d2a 0%, #021a4a 50%, #032053 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background texture */}
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
        <Grid container spacing={{ xs: 6, md: 10 }}>

          {/* Left: text */}
          {/* <Grid size={{ xs: 12, md: 6 }}> */}
          <Grid size={{ xs: 12 }}>

            <Box
              sx={{
                display: 'inline-block',
                bgcolor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10,
                px: 2,
                py: 0.5,
                mb: 3,
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: '#f5c842', fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.72rem'}}
              >
                Our Philosophy
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.4em', md: '2rem' },
                color: '#ffffff',
                mb: 2,
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Developing Cricketers For Success
            </Typography>

            <Box
              sx={{
                width: 60,
                height: 4,
                bgcolor: '#f5c842',
                borderRadius: 2,
                mb: 2,
              }}
            />

            <Typography
              variant="body1"
              sx={{ mb: 2, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: '0.95rem', fontWeight: 500 }}
            >
              At T&H Cricket, we are passionate about developing cricketers for success, both on and off the field. Our programs are built on strong technical foundations, combined with a focus on game awareness, tactical understanding, and continuous personal development.
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: '0.95rem', fontWeight: 500 }}
            >
              Whether you’re picking up a bat for the first time or competing at an elite level, our coaching environment is designed to help every player improve, perform, and thrive.            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: '0.95rem', fontWeight: 500 }}
            >
At T&H Cricket, we provide a high-quality coaching experience that balances skill development with a positive and supportive environment.
            </Typography>

<Typography
  sx={{
    color: '#fff',
    fontWeight: 800,
    fontSize: '1.4rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    mb: 4,
  }}
>
  Our Approach
</Typography>

{/* Desktop */}
<Box sx={{ display: { xs: 'none', md: 'block' } }}>
  <Grid
    container
    sx={{
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
    }}
  >
    <Box sx={{ width: '42%' }}>
      <Typography
        sx={{
          color: '#f5c842',
          fontWeight: 800,
          mb: 3,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Player Development
      </Typography>

      <Stack spacing={4}>
        {philosophyValues.map((item) => (
          <Box
            key={item.title}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <CheckIcon sx={{ color: '#f5c842', fontSize: 20, mt: 0.2 }} />

            <Box>
              <Typography
                sx={{
                  color: '#f5c842',
                  fontWeight: 800,
                  fontSize: '1rem',
                  mb: 0.5,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.8,
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>

    <Box sx={{ width: '42%' }}>
      <Typography
        sx={{
          color: '#f5c842',
          fontWeight: 800,
          mb: 3,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Cricket Excellence
      </Typography>

      <Stack spacing={4}>
        {developmentValues.map((item) => (
          <Box
            key={item.title}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <CheckIcon sx={{ color: '#f5c842', fontSize: 20, mt: 0.2 }} />

            <Box>
              <Typography
                sx={{
                  color: '#f5c842',
                  fontWeight: 800,
                  fontSize: '1rem',
                  mb: 0.5,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.8,
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  </Grid>
</Box>

{/* Mobile */}
<Box sx={{ display: { xs: 'block', md: 'none' } }}>
  <Typography
    sx={{
      color: '#f5c842',
      fontWeight: 800,
      mb: 3,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontSize: '1rem',
    }}
  >
    Player Development
  </Typography>

  <Stack spacing={3}>
    {philosophyValues.map((item) => (
      <Box
        key={item.title}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        <CheckIcon sx={{ color: '#f5c842', fontSize: 20, mt: 0.2 }} />

        <Box>
          <Typography
            sx={{
              color: '#f5c842',
              fontWeight: 800,
              fontSize: '1rem',
              mb: 0.5,
            }}
          >
            {item.title}
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.8,
            }}
          >
            {item.description}
          </Typography>
        </Box>
      </Box>
    ))}
  </Stack>

  <Typography
    sx={{
      color: '#f5c842',
      fontWeight: 800,
      mt: 5,
      mb: 3,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontSize: '1rem',
    }}
  >
    Cricket Excellence
  </Typography>

  <Stack spacing={3}>
    {developmentValues.map((item) => (
      <Box
        key={item.title}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        <CheckIcon sx={{ color: '#f5c842', fontSize: 20, mt: 0.2 }} />

        <Box>
          <Typography
            sx={{
              color: '#f5c842',
              fontWeight: 800,
              fontSize: '1rem',
              mb: 0.5,
            }}
          >
            {item.title}
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.8,
            }}
          >
            {item.description}
          </Typography>
        </Box>
      </Box>
    ))}
  </Stack>
</Box>{/*
==========================================================
OLD PILLARS SECTION - KEPT FOR FUTURE REFERENCE
==========================================================
*/}

          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}
