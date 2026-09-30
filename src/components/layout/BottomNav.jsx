import { NavLink } from 'react-router-dom'
import { Home, BarChart2, Calculator, MessageSquare } from 'lucide-react'
import { useLang } from '../../context/LangContext'

export function BottomNav() {
  const { t } = useLang()
  
  const links = [
    { to: '/dashboard',             icon: Home,          label: t('home'), end: true },
    { to: '/dashboard/feasibility', icon: BarChart2,     label: t('feasibility') },
    { to: '/dashboard/planner',     icon: Calculator,    label: t('planner') },
    { to: '/dashboard/chatbot',     icon: MessageSquare, label: t('chatbot') },
  ]

  return (
    <div className="flex items-center justify-around py-2">
      {links.map(link => (
        <NavLink 
          key={link.to} 
          to={link.to} 
          end={link.end}
          className={({ isActive }) => `
            flex flex-col items-center gap-1 p-2 rounded-lg text-[10px] font-medium transition-colors
            ${isActive 
              ? 'text-brand-navy dark:text-brand-gold' 
              : 'text-[var(--text-muted)]'}
          `}
        >
          <link.icon size={20} />
          {link.label}
        </NavLink>
      ))}
    </div>
  )
}
