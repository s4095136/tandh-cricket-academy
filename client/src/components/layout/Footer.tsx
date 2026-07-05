import React from 'react'
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Divider,
  Grid,
} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApplyModal } from '../../context/ApplyModalContext'
import { scrollToSection } from '../../utils/scrollToSection'

const FOOTER_LINKS = [
  { label: 'Philosophy', href: '#philosophy', type: 'anchor' as const },
  { label: 'Programs', href: '#programs', type: 'anchor' as const },
  { label: 'Our Representatives', href: '/representatives', type: 'route' as const },
  { label: 'Tours', href: '/tours', type: 'route' as const },
  { label: '1-on-1 Coaching', href: '/1on1', type: 'route' as const },
  // { label: 'Explore More', href: '#explore', type: 'anchor' as const },
  { label: 'Reviews', href: '#testimonials', type: 'anchor' as const },
]

export default function Footer() {
  const { openApplyModal } = useApplyModal()
  const navigate = useNavigate()
  const location = useLocation()

  const handleFooterClick = (link: typeof FOOTER_LINKS[number]) => {
    if (link.type === 'route') {
      navigate(link.href)
      return
    }
    if (location.pathname !== '/') {
      navigate(`/${link.href}`)
    } else {
      scrollToSection(link.href)
    }
  }

  return (
    <Box
      component="footer"
      sx={{
        background: '#012152',
        color: 'rgba(255,255,255,0.85)',
        pt: 8,
        pb: 4,
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ mb: 5 }}>
          {/* Brand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Typography
                sx={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2.4rem',
                  letterSpacing: '0.12em',
                  color: '#fff',
                }}
              >
                T&H CRICKET
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.8,
                mb: 3,
                maxWidth: 320,
              }}
            >
              Expert cricket coaching from Tom Rogers and Hanni Harb.
              Developing cricketers of all ages across Melbourne since 2017.
            </Typography>

            <Stack direction="row" spacing={1}>
              <IconButton
                href="https://www.facebook.com/profile.php?id=61559769562351"
                target="_blank"
                rel="noopener"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  '&:hover': {
                    color: '#f5c842',
                    bgcolor: 'rgba(245,200,66,0.12)',
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>

              <IconButton
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  '&:hover': {
                    color: '#f5c842',
                    bgcolor: 'rgba(245,200,66,0.12)',
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Navigation */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="overline"
              sx={{
                color: '#f5c842',
                display: 'block',
                mb: 2,
                fontWeight: 700,
              }}
            >
              Navigation
            </Typography>

            <Stack spacing={1.2}>
              {FOOTER_LINKS.map((l) => (
                <Typography
                  key={l.label}
                  component="button"
                  onClick={() => handleFooterClick(l)}
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.65)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    background: 'none',
                    border: 'none',
                    p: 0,
                    font: 'inherit',
                    textAlign: 'left',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#f5c842',
                      pl: 0.5,
                    },
                  }}
                >
                  {l.label}
                </Typography>
              ))}
              <Typography
                component="button"
                onClick={() => openApplyModal()}
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  background: 'none',
                  border: 'none',
                  p: 0,
                  font: 'inherit',
                  textAlign: 'left',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#f5c842',
                    pl: 0.5,
                  },
                }}
              >
                Join Program
              </Typography>
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              variant="overline"
              sx={{
                color: '#f5c842',
                display: 'block',
                mb: 2,
                fontWeight: 700,
              }}
            >
              Contact
            </Typography>

            <Stack spacing={1.2}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                Melbourne, Victoria
              </Typography>

              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                coach@tandhcricket.com.au
              </Typography>

              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                tandhcricket.com.au
              </Typography>
            </Stack>
          </Grid>

          {/* Promise */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="overline"
              sx={{
                color: '#f5c842',
                display: 'block',
                mb: 2,
                fontWeight: 700,
              }}
            >
              Our Promise
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.8,
              }}
            >
              Join the T&H Cricket family today and experience the
              difference of expert coaching from a team that truly
              understands the game.
            </Typography>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderColor: 'rgba(255,255,255,0.08)',
            mb: 3,
          }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            © {new Date().getFullYear()} T&H Cricket · ABN 85 640 730 829
          </Typography>

          <Typography
            component="a"
            href="/privacy"
            variant="caption"
            sx={{
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              '&:hover': {
                color: '#f5c842',
              },
            }}
          >
            Privacy Policy
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}