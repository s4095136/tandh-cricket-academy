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

  // Reset to top instantly on every navigation (no flash of old position).
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname, hash])

  // Defer hash scrolling by one frame so the new page has finished layout
  // before we measure element positions — fixes incorrect scroll on mobile
  // where getBoundingClientRect() returns 0 when called synchronously.
  useEffect(() => {
    if (!hash) return
    const id = requestAnimationFrame(() => {
      const el = document.querySelector(hash)
      if (!el) return
      // Use offsetTop chain instead of getBoundingClientRect so CSS transforms
      // (e.g. framer-motion entrance animations) don't skew the target position.
      let targetY = 0
      let node: HTMLElement | null = el as HTMLElement
      while (node) { targetY += node.offsetTop; node = node.offsetParent as HTMLElement | null }
      if (hash === '#philosophy' || hash === '#explore') {
        const navbar = document.querySelector('header.MuiAppBar-root')
        const navH = navbar ? navbar.getBoundingClientRect().height : 0
        targetY = Math.max(0, targetY - navH)
      }
      window.scrollTo({ top: targetY, behavior: 'instant' })
      window.history.replaceState(null, '', pathname)
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, hash])

  return null
}

function SectionReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
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
