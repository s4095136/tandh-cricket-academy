import React, { createContext, useContext, useEffect, useState } from 'react'
const API_URL = 'https://tandh-backend-deployment-production.up.railway.app'
  
export interface Review {
  id: number
  initials: string
  name: string
  role: string
  rating: number
  quote: string
}

interface TestimonialsContextType {
  testimonials: Review[]
  loading: boolean
}

const TestimonialsContext = createContext<TestimonialsContextType | undefined>(undefined)

export function TestimonialsProvider({ children }: { children: React.ReactNode }) {
  const [testimonials, setTestimonials] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  // Fetched once when the app mounts, so navigating away from and back to the
  // testimonials section (e.g. Tours -> Home#testimonials) never re-triggers
  // a loading state - the data is already in memory.
  useEffect(() => {
    fetch(`${API_URL}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error('Failed to fetch testimonials:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <TestimonialsContext.Provider value={{ testimonials, loading }}>
      {children}
    </TestimonialsContext.Provider>
  )
}

export function useTestimonials() {
  const ctx = useContext(TestimonialsContext)
  if (!ctx) {
    throw new Error('useTestimonials must be used within a TestimonialsProvider')
  }
  return ctx
}
