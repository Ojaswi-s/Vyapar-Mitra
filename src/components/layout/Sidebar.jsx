import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Home, BarChart2, Calculator, Sparkles, MessageSquare, LogOut, TrendingUp, User } from 'lucide-react'
import { useLang } from '../../context/LangContext'

export function Sidebar() {
  const { t } = useLang()
  const navigate = useNavigate()

  const links = [
    { to: '/dashboard',             icon: Home,          labelKey: 'home',        end: true },
    { to: '/dashboard/feasibility', icon: BarChart2,     labelKey: 'feasibility' },
    { to: '/dashboard/planner',     icon: Calculator,    labelKey: 'planner' },
    { to: '/dashboard/advisor',     icon: Sparkles,      labelKey: 'advisor' },
    { to: '/dashboard/chatbot',     icon: MessageSquare, labelKey: 'chatbot' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('vm_user')
    navigate('/')
  }

  return (
    <div className="flex flex-col h-full bg-[var(--bg-card)] border-r border-[var(--border)]">
      {/* Logo */}
      <div className="p-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-navy flex items-center justify-center text-brand-gold shadow-sm">
            <TrendingUp size={18} strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-bold text-base text-brand-navy dark:text-white block leading-tight">Vyapar Mitra</span>
            <span className="text-xs text-[var(--text-muted)]">Business AI</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {links.map((link, i) => (
          <motion.div
            key={link.to}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
          >
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/20 dark:bg-brand-gold dark:text-brand-navy'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-page)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              <link.icon size={18} />
              {t(link.labelKey)}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-[var(--border)] space-y-2">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[var(--bg-page)]">
          <div className="w-8 h-8 rounded-full bg-brand-navy/10 dark:bg-brand-gold/20 flex items-center justify-center">
            <User size={15} className="text-brand-navy dark:text-brand-gold" />
          </div>
          <span className="text-sm font-medium text-[var(--text-primary)] truncate">Entrepreneur</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={18} />
          {t('logout')}
        </button>
      </div>
    </div>
  )
}
