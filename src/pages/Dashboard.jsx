import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { BarChart2, Calculator, Sparkles, MessageSquare, MapPin, Briefcase, ArrowRight, TrendingUp, IndianRupee } from 'lucide-react'
import { InView } from '../components/ui/in-view'
import { Spotlight } from '../components/ui/Spotlight'
import { useLang } from '../context/LangContext'

const CARD_META = [
  { titleKey: 'feasibility', desc: 'Market analysis, SWOT, scenario plans & verdict', icon: BarChart2,    ctaKey: 'viewReport',  path: '/dashboard/feasibility', gradient: 'from-blue-600 to-blue-500',   spotlight: 'bg-blue-500/20' },
  { titleKey: 'planner',     desc: 'Scheme eligibility, EMI schedule & repayment',    icon: Calculator,   ctaKey: 'openPlanner', path: '/dashboard/planner',     gradient: 'from-emerald-600 to-teal-500', spotlight: 'bg-emerald-500/20' },
  { titleKey: 'advisor',     desc: 'AI-powered business guidance in plain language',  icon: Sparkles,     ctaKey: 'askAdvisor',  path: '/dashboard/advisor',     gradient: 'from-amber-500 to-orange-500', spotlight: 'bg-amber-500/20' },
  { titleKey: 'chatbot',     desc: 'Ask anything about your business anytime',        icon: MessageSquare,ctaKey: 'openChat',    path: '/dashboard/chatbot',     gradient: 'from-violet-600 to-purple-500', spotlight: 'bg-violet-500/20' },
]

export default function Dashboard() {
  const { t } = useLang()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('vm_user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Hero welcome banner */}
      <div className="relative rounded-2xl overflow-hidden bg-brand-navy text-white p-8 shadow-2xl">
        {/* animated glow blob */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
          {/* dot grid */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, #F59E0B 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
        </div>
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold mb-2"
            >
              {user ? `Welcome back, ${user.name.split(' ')[0]}! 👋` : 'Welcome to your Dashboard'}
            </motion.h1>
            <p className="text-white/70">
              {user ? 'Your AI-powered business plan is ready. Select a tool to continue.' : 'Select a tool below to build your business plan.'}
            </p>
          </div>

          {user && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3 text-sm bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-2">
                <Briefcase size={15} className="text-brand-gold" />
                <span className="font-semibold">{user.category || 'Business'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-brand-gold" />
                <span>{user.village}, {user.district}</span>
              </div>
              <div className="flex items-center gap-2 border-l border-white/20 pl-3">
                <IndianRupee size={15} className="text-brand-gold" />
                <span className="font-bold text-brand-gold">{(user.margin || 0).toLocaleString('en-IN')}</span>
                <span className="text-white/60 text-xs">margin</span>
              </div>
            </motion.div>
          )}
        </div>

        {user && (
          <div className="relative flex gap-6 mt-6 pt-6 border-t border-white/10 text-sm text-white/60">
            <div className="flex items-center gap-2"><TrendingUp size={14} className="text-brand-gold" /> Plan Status: <span className="text-white font-medium ml-1">Active</span></div>
          </div>
        )}
      </div>

      {/* Tool Cards */}
      <div className="grid sm:grid-cols-2 gap-5">
        {CARD_META.map((c, i) => (
          <InView
            key={i}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
          >
            <motion.div
              onClick={() => navigate(c.path)}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group relative bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 cursor-pointer overflow-hidden hover:border-transparent hover:shadow-xl transition-all duration-300"
            >
              <Spotlight className={c.spotlight} size={180} />
              {/* gradient accent top bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                <c.icon size={22} className="text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)]">{t(c.titleKey)}</h3>
              <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">{c.desc}</p>
              <div className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${c.gradient} bg-clip-text text-transparent`}>
                {t(c.ctaKey)} <ArrowRight size={14} className="text-brand-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </InView>
        ))}
      </div>
    </div>
  )
}
