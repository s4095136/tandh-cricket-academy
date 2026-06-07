import React from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, Chip, Stack, Avatar } from '@mui/material'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import PeopleIcon from '@mui/icons-material/People'

const COACHES = [
  {
    initials: 'TR',
    name: 'Tom Rogers',
    role: 'Co-Founder & Head Coach',
    credentials: ['BBL Melbourne Stars opener', 'Shield cricketer for Victoria', 'Professional playing career'],
    bio: 'Tom Rogers is one of Australia\'s exciting batting talents, known for his explosive BBL performances with the Melbourne Stars. As a Shield cricketer for Victoria, Tom brings professional-level technical insight and match awareness that you simply cannot find anywhere else. His sessions bridge the gap between amateur coaching and elite professional thinking.',
    accentColor: '#1d6e4a',
    bgColor: '#0b2d1c',
    tags: ['Batting', 'Opening', 'T20 Specialist'],
  },
  {
    initials: 'HH',
    name: 'Hanni Harb',
    role: 'Co-Founder & Senior Coach',
    credentials: ['Level 2 accredited coach', '25+ years of coaching experience', 'Senior & junior specialist'],
    bio: 'Hanni Harb is a Level 2 accredited cricket coach with over 25 years of experience working with cricketers across all ages and abilities. His deep knowledge of technique, player psychology, and long-term development pathways makes him one of Melbourne\'s most trusted coaches. Hanni has helped hundreds of families find the right program for their child.',
    accentColor: '#27915f',
    bgColor: '#133d26',
    tags: ['All-round coaching', 'Junior development', 'Technique'],
  },
]

const TRUST_STATS = [
  { icon: <SportsCricketIcon />, value: '250+', label: 'Players developed' },
  { icon: <WorkspacePremiumIcon />, value: 'BBL', label: 'Professional experience' },
  { icon: <PeopleIcon />, value: '8yrs', label: 'Coaching together' },
]

export default function CoachesSection() {
  return (
    <Box
      id="coaches"
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1.5 }}>
            The coaching team
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: 'secondary.main' }}>
            Meet the coaches
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', mt: 2 }}>
            A unique blend of professional playing expertise and deep coaching experience.
          </Typography>
        </Box>

        {/* Coach cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {COACHES.map((coach) => (
            <Grid key={coach.name} size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  overflow: 'hidden',
                }}
              >
                {/* Card header band */}
                <Box
                  sx={{
                    bgcolor: coach.bgColor,
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
                      bgcolor: coach.accentColor,
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
                    <Typography
                      variant="h5"
                      sx={{ color: '#fff', fontSize: '1.2rem', mb: 0.3 }}
                    >
                      {coach.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}
                    >
                      {coach.role}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  {/* Credentials */}
                  <Stack spacing={0.8} sx={{ mb: 2.5 }}>
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
                        <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, fontSize: '0.82rem' }}>
                          {cred}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 2.5 }}>
                    {coach.bio}
                  </Typography>

                  {/* Skill tags */}
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
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
            </Grid>
          ))}
        </Grid>

        {/* Trust stats */}
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
