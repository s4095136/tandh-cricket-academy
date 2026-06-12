import React, { useState, useEffect } from 'react'
import {
  AppBar, Toolbar, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText, Typography,
  Container, useMediaQuery, useTheme, Divider,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import { useApplyModal } from '../../context/ApplyModalContext'

const NAV_LINKS = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Programs', href: '#programs' },
  { label: 'Reviews', href: '#testimonials' },
]

function scrollTo(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const { openApplyModal } = useApplyModal()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled ? 'rgba(2,26,74,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
          transition: 'background 0.35s ease, border 0.35s ease',
          boxShadow: 'none',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, justifyContent: 'space-between' }}>

            {/* Logo */}
            <Box
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', userSelect: 'none' }}
            >
              <SportsCricketIcon sx={{ color: 'secondary.main', fontSize: 22 }} />
              <Box
                component="span"
                sx={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: { xs: '1.45rem', md: '1.6rem' },
                  letterSpacing: '0.1em',
                  color: '#ffffff',
                  transition: 'color 0.35s ease',
                  '& em': { color: 'secondary.main', fontStyle: 'normal' },
                }}
              >
                T<em>&</em>H CRICKET
              </Box>
            </Box>

            {/* Desktop links */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {NAV_LINKS.map((link) => (
                  <Button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    sx={{
                      color: 'rgba(255,255,255,0.85)',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      px: 1.5,
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
                  sx={{ ml: 2 }}
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
            bgcolor: '#021a4a',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.4rem',
              letterSpacing: '0.1em',
              color: '#ffffff',
              '& em': { color: 'secondary.main', fontStyle: 'normal' },
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
                onClick={() => { scrollTo(link.href); setDrawerOpen(false) }}
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