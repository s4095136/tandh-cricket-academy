import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme/theme'
import { ApplyModalProvider } from './context/ApplyModalContext'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ApplyModal from './components/ApplyModal'

// Sections
import HeroSection from './components/sections/HeroSection'
import PhilosophySection from './components/sections/PhilosophySection'
import ProgramsSection from './components/sections/ProgramsSection'
import CoachesSection from './components/sections/CoachesSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import ContactSection from './components/sections/ContactSection'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApplyModalProvider>
        <Navbar />
        <main>
          <HeroSection />
          <PhilosophySection />
          <ProgramsSection />
          {/* <CoachesSection /> */}
          <TestimonialsSection />
          {/* <ContactSection /> */}
        </main>
        <Footer />
        <ApplyModal />
      </ApplyModalProvider>
    </ThemeProvider>
  )
}
