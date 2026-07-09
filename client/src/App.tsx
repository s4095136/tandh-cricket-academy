import React, { useLayoutEffect, useEffect } from 'react'
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
import ExplorePreviewSection from './components/sections/ExplorePreviewSection'

// Pages
import ToursPage from './pages/ToursPage'
import RepresentativesPage from './pages/RepresentativesPage'
import OneOnOnePage from './pages/OneOnOnePage'

function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  // Disable browser scroll restoration once on mount — iOS Safari otherwise
  // asynchronously restores the previous scroll position, overriding our reset.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // Synchronous scroll — fires before first paint so the page appears already
  // at the target position when PageTransition fades it in. This eliminates
  // the "flash" where the hero is briefly visible before scrolling to a section.
  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const el = document.querySelector(hash) as HTMLElement | null
    if (!el) { window.scrollTo(0, 0); return }
    const navH = window.innerWidth < 900 ? 64 : 72
    // getBoundingClientRect().top at scrollY=0 is the element's absolute Y position
    const top = el.getBoundingClientRect().top - navH - 8
    window.scrollTo(0, Math.max(0, top))
  }, [pathname, hash])

  // Async correction — re-measures after 100ms in case image loading shifted
  // the layout (especially on mobile). Keeps desktop-perfect, fixes mobile drift.
  useEffect(() => {
    if (!hash) return
    const timer = setTimeout(() => {
      const el = document.querySelector(hash) as HTMLElement | null
      if (!el) return
      const navH = window.innerWidth < 900 ? 64 : 72
      const top = window.scrollY + el.getBoundingClientRect().top - navH - 8
      window.scrollTo(0, Math.max(0, top))
      window.history.replaceState(null, '', pathname)
    }, 100)
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}

function SectionReveal({ children }: { children: React.ReactNode }) {
  // Opacity-only — no y/scale transforms. Transforms shift the bounding rect
  // that scrollIntoView measures, causing external-page navigation to land
  // at the wrong scroll position. Pure fade avoids that entirely.
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function HomePage() {
  return (
    <main>
      <HeroSection />
      <PhilosophySection />
      <SectionReveal><ProgramsSection /></SectionReveal>
      <SectionReveal><ExplorePreviewSection /></SectionReveal>
      <SectionReveal><TestimonialsSection /></SectionReveal>
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
                <Route path="/1on1" element={<PageTransition><OneOnOnePage /></PageTransition>} />
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
