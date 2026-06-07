import React from 'react'
import { Box, Container, Typography, Stack, IconButton, Divider, Grid } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'

const FOOTER_LINKS = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Programs', href: '#programs' },
  { label: 'Coaches', href: '#coaches' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'secondary.main',
        color: 'rgba(255,255,255,0.85)',
        pt: 6,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <SportsCricketIcon sx={{ color: 'secondary.main' }} />
              <Typography
                sx={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.5rem',
                  letterSpacing: '0.1em',
                  color: '#fff',
                  '& em': { color: 'secondary.main', fontStyle: 'normal' },
                }}
              >
                T<em>&</em>H CRICKET
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, mb: 2, maxWidth: 280 }}>
              Expert cricket coaching from Tom Rogers and Hanni Harb. Developing cricketers of all ages across Melbourne since 2017.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                href="https://www.facebook.com/profile.php?id=61559769562351"
                target="_blank"
                rel="noopener"
                size="small"
                sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: 'secondary.main' } }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener"
                size="small"
                sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: 'secondary.main' } }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          {/* Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', display: 'block', mb: 2 }}>
              Navigation
            </Typography>
            <Stack spacing={1}>
              {FOOTER_LINKS.map((l) => (
                <Typography
                  key={l.label}
                  component="a"
                  href={l.href}
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    '&:hover': { color: 'secondary.main' },
                    transition: 'color 0.2s',
                  }}
                >
                  {l.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', display: 'block', mb: 2 }}>
              Contact
            </Typography>
            <Stack spacing={1}>
              {['Melbourne, Victoria', 'info@tandhcricket.com.au', 'tandhcricket.com.au'].map((item) => (
                <Typography key={item} variant="body2" sx={{ color: 'rgba(255,255,255,0.55)' }}>
                  {item}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Promise */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', display: 'block', mb: 2 }}>
              Our Promise
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
              Join the T&H Cricket family today and experience the difference of expert coaching from a team that truly understands the game.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} T&H Cricket · ABN 85 640 730 829
          </Typography>
          <Typography
            component="a"
            href="/privacy"
            variant="caption"
            sx={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', '&:hover': { color: 'rgba(255,255,255,0.6)' } }}
          >
            Privacy Policy
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
