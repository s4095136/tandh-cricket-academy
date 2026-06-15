import React, { useState, useEffect } from 'react'
import {
  AppBar, Toolbar, Box, Button, IconButton, Chip,
  Drawer, List, ListItem, ListItemButton, ListItemText, Typography,
  Container, useMediaQuery, useTheme, Divider,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApplyModal } from '../../context/ApplyModalContext'
import { scrollToSection } from '../../utils/scrollToSection'

const NAV_LINKS = [
  { label: 'Philosophy', href: '#philosophy', type: 'anchor' as const },
  { label: 'Programs', href: '#programs', type: 'anchor' as const },
  { label: 'Reviews', href: '#testimonials', type: 'anchor' as const },
  { label: 'Tours', href: '/tours', type: 'route' as const },
  { label: 'State Representatives', href: '/representatives', type: 'route' as const },
]

export default function Navbar() {
  const { openApplyModal } = useApplyModal()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (link: typeof NAV_LINKS[number]) => {
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

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled ? '#012152' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
          transition: 'background 0.35s ease, border 0.35s ease',
          boxShadow: 'none',
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 5 } }}>
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, justifyContent: 'space-between' }}>

            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
              <Chip
                label="Est. 2017 · Melbourne, AUS"
                size="small"
                sx={{
                  display: { xs: 'none', lg: 'inline-flex' },
                  whiteSpace: 'nowrap',
                  bgcolor: 'rgba(245,200,66,0.15)',
                  color: '#f5c842',
                  border: '1px solid rgba(245,200,66,0.3)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  fontSize: '0.72rem',
                }}
              />
              <Box
                onClick={handleLogoClick}
                sx={{ display: 'flex', alignItems: 'center', gap: 0.75, cursor: 'pointer', userSelect: 'none' }}
              >
                <Box
                  component="img"
                  src="/images/logo-transparent.png"
                  alt="T&H Cricket"
                  sx={{ height: { xs: 32, md: 38 }, width: 'auto', display: 'block' }}
                />
                <Box
                  component="span"
                  sx={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: { xs: '1.4rem', md: '1.6rem' },
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                    color: '#ffffff',
                    transition: 'color 0.35s ease',
                    '& em': { color: '#ffffff', fontStyle: 'normal' },
                  }}
                >
                  T<em>&</em>H CRICKET
                </Box>
              </Box>
            </Box>

            {/* Desktop links */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, minWidth: 0 }}>
                {NAV_LINKS.map((link) => (
                  <Button
                    key={link.label}
                    onClick={() => handleNavClick(link)}
                    sx={{
                      color: 'rgba(255,255,255,0.85)',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      px: 1.25,
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: '#f5c842',
                        bgcolor: 'rgba(255,255,255,0.06)',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => openApplyModal()}
                  sx={{ ml: 2, whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                  Join Program
                </Button>
              </Box>
            )}

            {/* Mobile burger */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#fff' }}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 290,
            pt: 2,
            px: 2,
            bgcolor: '#012152',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.7rem',
              letterSpacing: '0.1em',
              color: '#ffffff',
              '& em': { color: '#ffffff', fontStyle: 'normal' },
            }}
          >
            T<em>&</em>H CRICKET
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} size="small" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 1, borderColor: 'rgba(255,255,255,0.1)' }} />

        <List disablePadding>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                onClick={() => { handleNavClick(link); setDrawerOpen(false) }}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
                }}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 500, fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)' }}>
                      {link.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => { openApplyModal(); setDrawerOpen(false) }}
          >
            Join Program
          </Button>
        </Box>
      </Drawer>
    </>
  )
}