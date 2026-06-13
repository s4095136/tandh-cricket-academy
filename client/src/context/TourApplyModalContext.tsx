import React, { createContext, useContext, useState } from 'react'

interface TourApplyModalContextType {
  open: boolean
  selectedIndex: number
  openTourApplyModal: (index?: number) => void
  closeTourApplyModal: () => void
}

const TourApplyModalContext = createContext<TourApplyModalContextType | undefined>(undefined)

export function TourApplyModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const openTourApplyModal = (index: number = 0) => {
    setSelectedIndex(index)
    setOpen(true)
  }

  const closeTourApplyModal = () => setOpen(false)

  return (
    <TourApplyModalContext.Provider value={{ open, selectedIndex, openTourApplyModal, closeTourApplyModal }}>
      {children}
    </TourApplyModalContext.Provider>
  )
}

export function useTourApplyModal() {
  const ctx = useContext(TourApplyModalContext)
  if (!ctx) {
    throw new Error('useTourApplyModal must be used within a TourApplyModalProvider')
  }
  return ctx
}
