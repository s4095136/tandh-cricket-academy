import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme/theme'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Sections
import HeroSection from './components/sections/HeroSection'
import PhilosophySection from './components/sections/PhilosophySection'
import ProgramsSection from './components/sections/ProgramsSection'
import CoachesSection from './components/sections/CoachesSection'
import ScheduleSection from './components/sections/ScheduleSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import ContactSection from './components/sections/ContactSection'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <main>
        <HeroSection />
        <PhilosophySection />
        <ProgramsSection />
        {/* <CoachesSection /> */}
        <ScheduleSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </ThemeProvider>
  )
}
