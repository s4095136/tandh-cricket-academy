import React, { useEffect } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import theme from './theme/theme'
import { ApplyModalProvider } from './context/ApplyModalContext'
import { TourApplyModalProvider } from './context/TourApplyModalContext'

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

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      // Wait for the page to render before scrolling to the anchor
      const id = setTimeout(() => {
        const el = document.querySelector(location.hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
      return () => clearTimeout(id)
    }
  }, [location.hash])

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
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tours" element={<ToursPage />} />
            </Routes>
            <Footer />
            <ApplyModal />
            <TourApplyModal />
          </TourApplyModalProvider>
        </ApplyModalProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
