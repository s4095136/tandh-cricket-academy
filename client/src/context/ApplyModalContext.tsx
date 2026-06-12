import React, { createContext, useContext, useState } from 'react'

interface ApplyModalContextType {
  open: boolean
  selectedIndex: number
  openApplyModal: (index?: number) => void
  closeApplyModal: () => void
}

const ApplyModalContext = createContext<ApplyModalContextType | undefined>(undefined)

export function ApplyModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const openApplyModal = (index: number = 0) => {
    setSelectedIndex(index)
    setOpen(true)
  }

  const closeApplyModal = () => setOpen(false)

  return (
    <ApplyModalContext.Provider value={{ open, selectedIndex, openApplyModal, closeApplyModal }}>
      {children}
    </ApplyModalContext.Provider>
  )
}

export function useApplyModal() {
  const ctx = useContext(ApplyModalContext)
  if (!ctx) {
    throw new Error('useApplyModal must be used within an ApplyModalProvider')
  }
  return ctx
}
