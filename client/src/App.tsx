import React, { useLayoutEffect } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import theme from './theme/theme'
import { ApplyModalProvider } from './context/ApplyModalContext'
import { TourApplyModalProvider } from './context/TourApplyModalContext'
import { TestimonialsProvider } from './context/TestimonialsContext'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ApplyModal from './components/ApplyModal'
import TourApplyModal from './components/TourApplyModal'

// Sections
import HeroSection from './components/sections/HeroSection'
import PhilosophySection from './components/sections/PhilosophySection'
import ProgramsSection from './components/sections/ProgramsSection'
import CoachesSection from './components/sections/CoachesSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import ContactSection from './components/sections/ContactSection'

// Pages
import ToursPage from './pages/ToursPage'
import RepresentativesPage from './pages/RepresentativesPage'

function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  // useLayoutEffect runs synchronously before paint, so the page is already
  // positioned correctly before the fade/scale transition starts rendering -
  // otherwise the positioning happens mid-animation and looks like a scroll.
  useLayoutEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        // Reset to 0 first so getBoundingClientRect() reflects the element's
        // true offset from the top of the document, regardless of whatever
        // scroll position (or browser scroll-clamping) carried over from the
        // previous page. Direct scrollTop assignment is always instant.
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        let targetY = el.getBoundingClientRect().top
        // The philosophy section is sized to exactly fill the viewport below
        // the fixed navbar, so shift the scroll position up by the navbar's
        // height - this tucks that empty space behind the navbar instead of
        // having the section's own content start underneath it.
        if (hash === '#philosophy') {
          const navbar = document.querySelector('header.MuiAppBar-root')
          const navH = navbar ? navbar.getBoundingClientRect().height : 0
          targetY = Math.max(0, targetY - navH)
        }
        document.documentElement.scrollTop = targetY
        document.body.scrollTop = targetY
      }
      // Clear the hash from the URL so refreshing this page returns to the top
      window.history.replaceState(null, '', pathname)
    } else {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, [pathname, hash])

  return null
}

function HomePage() {
  return (
    <main>
      <HeroSection />
      <PhilosophySection />
      <ProgramsSection />
      {/* <CoachesSection /> */}
      <TestimonialsSection />
      {/* <ContactSection /> */}
    </main>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ApplyModalProvider>
          <TourApplyModalProvider>
            <TestimonialsProvider>
              <ScrollToTop />
              <Navbar />
              <Routes>
                <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                <Route path="/tours" element={<PageTransition><ToursPage /></PageTransition>} />
                <Route path="/representatives" element={<PageTransition><RepresentativesPage /></PageTransition>} />
              </Routes>
              <Footer />
              <ApplyModal />
              <TourApplyModal />
            </TestimonialsProvider>
          </TourApplyModalProvider>
        </ApplyModalProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
