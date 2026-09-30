import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <button onClick={toggle} aria-label="Toggle theme"
      className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-card)] transition">
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
