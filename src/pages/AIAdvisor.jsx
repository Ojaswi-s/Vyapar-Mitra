import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles, ChevronRight, TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { InView } from '../components/ui/in-view'
import { demoBusiness } from '../data/mockData'

export default function AIAdvisor() {
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('tips')

  // Try to match to user's registered category on mount
  useEffect(() => {
    const stored = localStorage.getItem('vm_user')
    if (stored) {
      const user = JSON.parse(stored)
      const match = demoBusiness.find(b => b.category === user.category)
      if (match) setSelected(match)
    }
  }, [])

  const handleSelect = (biz) => {
    if (selected?.id === biz.id) return
    setLoading(true)
    setSelected(null)
    setTimeout(() => { setSelected(biz); setLoading(false); setActiveTab('tips') }, 600)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-1">
          <Sparkles className="text-brand-gold" size={24} /> AI Advisor
        </h1>
        <p className="text-[var(--text-muted)] text-sm">Select a business sector to get personalised AI insights, SWOT analysis, and opportunity mapping.</p>
      </div>

      {/* Business selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {demoBusiness.map((biz) => (
          <motion.button
            key={biz.id}
            onClick={() => handleSelect(biz)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`p-3 rounded-xl border text-left text-sm font-medium transition-all duration-200 ${
              selected?.id === biz.id
                ? 'border-brand-navy bg-brand-navy text-white dark:border-brand-gold dark:bg-brand-gold dark:text-brand-navy shadow-lg'
                : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-brand-navy/50 dark:hover:border-brand-gold/50'
            }`}
          >
            <span className="text-2xl block mb-2">{biz.label.split(' ')[0]}</span>
            <span className="text-xs leading-tight block">{biz.label.slice(3)}</span>
          </motion.button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20 gap-3 text-[var(--text-muted)]">
          <Sparkles size={20} className="animate-pulse text-brand-gold" />
          <span className="text-sm font-medium">Generating AI insights...</span>
        </div>
      )}

      {/* No selection state */}
      {!loading && !selected && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4">
            <Sparkles className="text-brand-gold" size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Select a business above</h3>
          <p className="text-sm text-[var(--text-muted)] max-w-xs">Choose any sector to get AI-powered tips, SWOT analysis, and local opportunities.</p>
        </div>
      )}

      {/* Selected sector content */}
      <AnimatePresence mode="wait">
        {selected && !loading && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="space-y-5"
          >
            {/* Verdict banner */}
            <div className={`rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              selected.verdict === 'viable'
                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300 dark:border-emerald-700'
                : 'bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700'
            }`}>
              <div className="flex items-center gap-3">
                {selected.verdict === 'viable'
                  ? <CheckCircle className="text-emerald-600 dark:text-emerald-400" size={28} />
                  : <AlertTriangle className="text-amber-600 dark:text-amber-400" size={28} />
                }
                <div>
                  <p className={`font-bold text-lg uppercase tracking-wide ${selected.verdict === 'viable' ? 'text-emerald-800 dark:text-emerald-300' : 'text-amber-800 dark:text-amber-300'}`}>
                    {selected.verdict === 'viable' ? 'Viable Sector' : 'Proceed with Caution'}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">{selected.label} · {selected.district} district · {selected.saturation}% market saturation</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--text-primary)]">₹{selected.monthlyRevenue.toLocaleString('en-IN')}</p>
                <p className="text-xs text-[var(--text-muted)]">Est. monthly revenue</p>
              </div>
            </div>

            {/* Tab nav */}
            <div className="flex gap-1 bg-[var(--bg-page)] border border-[var(--border)] rounded-xl p-1">
              {[
                { id: 'tips', label: '💡 AI Tips' },
                { id: 'swot', label: '📊 SWOT' },
                { id: 'opps', label: '🎯 Opportunities' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-brand-navy text-white dark:bg-brand-gold dark:text-brand-navy shadow-sm'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === 'tips' && (
                <motion.div key="tips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  {selected.tips.map((tip, i) => (
                    <InView key={i} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} transition={{ delay: i * 0.08 }}>
                      <Card className="flex gap-4 hover:border-brand-navy/30 dark:hover:border-brand-gold/30 transition-colors">
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-navy dark:bg-brand-gold text-white dark:text-brand-navy flex items-center justify-center font-bold text-sm">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-bold text-sm mb-1">{tip.title}</p>
                          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{tip.body}</p>
                        </div>
                      </Card>
                    </InView>
                  ))}
                </motion.div>
              )}

              {activeTab === 'swot' && (
                <motion.div key="swot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: 'strengths',     label: 'Strengths',     color: 'border-l-emerald-500', textColor: 'text-emerald-700 dark:text-emerald-400', emoji: '💪' },
                    { key: 'weaknesses',    label: 'Weaknesses',    color: 'border-l-amber-500',   textColor: 'text-amber-700 dark:text-amber-400',   emoji: '⚠️' },
                    { key: 'opportunities', label: 'Opportunities',  color: 'border-l-blue-500',    textColor: 'text-blue-700 dark:text-blue-400',    emoji: '🚀' },
                    { key: 'threats',       label: 'Threats',       color: 'border-l-red-500',     textColor: 'text-red-700 dark:text-red-400',     emoji: '🛡️' },
                  ].map(({ key, label, color, textColor, emoji }) => (
                    <Card key={key} className={`border-l-4 ${color}`}>
                      <h3 className={`font-bold text-sm uppercase tracking-wider mb-3 ${textColor}`}>{emoji} {label}</h3>
                      <ul className="space-y-1.5">
                        {selected.swot[key].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                            <ChevronRight size={14} className={`${textColor} mt-0.5 shrink-0`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </motion.div>
              )}

              {activeTab === 'opps' && (
                <motion.div key="opps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <Card>
                    <div className="flex items-center gap-2 mb-5">
                      <Target size={18} className="text-brand-gold" />
                      <h3 className="font-bold">Adjacent opportunities in your area</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selected.opportunities.map((opp, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="p-4 bg-brand-navy dark:bg-brand-gold text-white dark:text-brand-navy rounded-xl text-center cursor-default"
                        >
                          <span className="text-sm font-semibold">{opp}</span>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                  <Card>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp size={18} className="text-brand-gold" />
                      <h3 className="font-bold">Market saturation gauge</h3>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[var(--text-muted)]">Current saturation level</span>
                        <span className={`font-bold ${selected.saturation > 60 ? 'text-red-500' : selected.saturation > 35 ? 'text-amber-500' : 'text-emerald-500'}`}>
                          {selected.saturation}%
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-[var(--bg-page)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selected.saturation}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`h-full rounded-full ${selected.saturation > 60 ? 'bg-red-500' : selected.saturation > 35 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1.5">
                        <span>Low competition</span>
                        <span>Highly saturated</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
