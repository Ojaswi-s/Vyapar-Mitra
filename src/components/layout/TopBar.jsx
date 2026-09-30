import { useState, useEffect } from 'react'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useLang } from '../../context/LangContext'
import { langOptions } from '../../i18n/lang'
import { User, Settings } from 'lucide-react'

export function TopBar({ adminMode = false }) {
  const { lang, changeLang } = useLang()
  const [userName, setUserName] = useState('Guest')
  
  useEffect(() => {
    if (adminMode) {
      setUserName('SCA Officer')
    } else {
      const stored = localStorage.getItem('vm_user')
      if (stored) {
        setUserName(JSON.parse(stored).name || 'Entrepreneur')
      }
    }
  }, [adminMode])

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-[var(--bg-card)] border-b border-[var(--border)] shrink-0 z-40">
      <div className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-brand-navy/10 dark:bg-brand-gold/10 text-brand-navy dark:text-brand-gold flex items-center justify-center">
          <User size={16} />
        </div>
        <span className="hidden sm:inline">Welcome, {userName}</span>
      </div>
      <div className="flex items-center gap-3">
        <select 
          value={lang} 
          onChange={e => changeLang(e.target.value)}
          className="bg-[var(--bg-page)] border border-[var(--border)] text-[var(--text-primary)] text-sm rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brand-navy"
        >
          {langOptions.map(opt => (
            <option key={opt.code} value={opt.code}>{opt.label}</option>
          ))}
        </select>
        <ThemeToggle />
        <button className="p-2 text-[var(--text-muted)] hover:bg-[var(--bg-page)] rounded-lg transition-colors">
          <Settings size={20} />
        </button>
      </div>
    </header>
  )
}
