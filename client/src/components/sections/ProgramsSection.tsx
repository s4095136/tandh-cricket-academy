import React, { useState } from 'react'
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Chip, Stack, Button,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import GroupsIcon from '@mui/icons-material/Groups'
import StarIcon from '@mui/icons-material/Star'
import WbSunnyIcon from '@mui/icons-material/WbSunny'

const PROGRAMS = [
  {
    icon: <GroupsIcon sx={{ fontSize: 28 }} />,
    tag: 'Ages 6–12',
    title: 'Beginner Programs',
    description:
      'Fun, structured sessions for young newcomers. We build confidence, fundamental technique and a genuine love for cricket in a supportive group setting.',
    highlights: ['Safe, encouraging environment', 'Bat, bowl & field basics', 'Small group sizes', 'No experience needed'],
    accent: false,
  },
  {
    icon: <StarIcon sx={{ fontSize: 28 }} />,
    tag: 'Ages 13–17',
    title: 'Advanced Training',
    description:
      'Competitive preparation for club-level players looking to take their game seriously. Focus on technique refinement, match strategy and physical conditioning.',
    highlights: ['Club & representative prep', 'Video analysis available', 'Strength & conditioning', 'Mental game coaching'],
    accent: true,
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 28 }} />,
    tag: 'Ages 15+',
    title: 'Elite / Representative',
    description:
      'State-level pathway coaching designed for players with serious ambitions. Tom Rogers brings professional BBL and Shield experience to every session.',
    highlights: ['BBL-level coaching insight', 'Pathway to state selection', 'Individual programs', 'Professional technique'],
    accent: false,
  },
  {
    icon: <WbSunnyIcon sx={{ fontSize: 28 }} />,
    tag: 'All ages',
    title: 'Holiday Clinics',
    description:
      'Full-day school holiday programs run across Greater Melbourne. The perfect way to keep kids active, develop skills and make new cricket friends.',
    highlights: ['Full-day sessions', 'Multiple Melbourne venues', 'All skill levels welcome', 'Morning & afternoon programs'],
    accent: false,
  },
]

export default function ProgramsSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <Box
      id="programs"
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1.5 }}>
            What we offer
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: 'secondary.main' }}>
            Programs for every level
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 520, mx: 'auto', mt: 2 }}
          >
            From first-time players to elite representatives — we have a pathway designed for your goals.
          </Typography>
        </Box>

        {/* Cards */}
        <Grid container spacing={3}>
          {PROGRAMS.map((program, i) => (
            <Grid key={program.title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid',
                  borderColor: program.accent ? 'primary.main' : 'divider',
                  bgcolor: program.accent ? 'primary.dark' : 'background.default',
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  transform: hovered === i ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: hovered === i
                    ? '0 12px 40px rgba(0,0,0,0.14)'
                    : program.accent
                    ? '0 4px 20px rgba(29,110,74,0.25)'
                    : '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                {program.accent && (
                  <Chip
                    label="Most popular"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bgcolor: 'secondary.main',
                      color: 'primary.dark',
                      fontWeight: 700,
                      fontSize: '0.68rem',
                    }}
                  />
                )}
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 2.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: program.accent ? 'rgba(77,214,138,0.15)' : 'rgba(29,110,74,0.08)',
                      color: program.accent ? 'primary.light' : 'primary.main',
                      mb: 2.5,
                    }}
                  >
                    {program.icon}
                  </Box>

                  {/* Age tag */}
                  <Chip
                    label={program.tag}
                    size="small"
                    sx={{
                      mb: 1.5,
                      bgcolor: program.accent ? 'rgba(77,214,138,0.1)' : 'rgba(29,110,74,0.07)',
                      color: program.accent ? 'primary.light' : 'primary.main',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                    }}
                  />

                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: '1.1rem',
                      mb: 1.5,
                      color: program.accent ? '#fff' : 'text.primary',
                    }}
                  >
                    {program.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: program.accent ? 'rgba(255,255,255,0.65)' : 'text.secondary',
                      mb: 2.5,
                      lineHeight: 1.7,
                    }}
                  >
                    {program.description}
                  </Typography>

                  {/* Highlights */}
                  <Stack spacing={0.8}>
                    {program.highlights.map((h) => (
                      <Box key={h} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 5,
                            height: 5,
                            borderRadius: '50%',
                            bgcolor: program.accent ? 'primary.light' : 'primary.main',
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: program.accent ? 'rgba(255,255,255,0.6)' : 'text.secondary',
                            fontSize: '0.78rem',
                          }}
                        >
                          {h}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            href="#contact"
          >
            Enquire about a program
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
