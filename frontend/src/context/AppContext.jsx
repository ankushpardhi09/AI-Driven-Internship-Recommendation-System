import { createContext, useContext, useMemo, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(0)

  const value = useMemo(
    () => ({
      menuOpen,
      setMenuOpen,
      activeFaq,
      setActiveFaq,
      openMenu: () => setMenuOpen(true),
      closeMenu: () => setMenuOpen(false),
      toggleMenu: () => setMenuOpen((current) => !current),
    }),
    [activeFaq, menuOpen],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }

  return context
}
