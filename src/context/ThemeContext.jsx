import { createContext, useContext, useEffect, useState } from 'react'
const ThemeCtx = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(
    () => localStorage.getItem('vm-theme') === 'dark'
  )
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('vm-theme', dark ? 'dark' : 'light')
  }, [dark])
  return (
    <ThemeCtx.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeCtx.Provider>
  )
}
export const useTheme = () => useContext(ThemeCtx)
