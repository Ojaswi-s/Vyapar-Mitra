import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Sparkles, BarChart2, Calculator, ArrowRight, ShieldCheck, Database, Lock, TrendingUp, Globe } from 'lucide-react'
import { InView } from '../components/ui/in-view'
import { TextEffect } from '../components/ui/text-effect'
import { Spotlight } from '../components/ui/Spotlight'
import { Button } from '../components/ui/Button'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { useLang } from '../context/LangContext'
import { langOptions } from '../i18n/lang'

const FEATURES = [
  { Icon: Sparkles,   titleKey: 'feat1Title', descKey: 'feat1Desc' },
  { Icon: BarChart2,  titleKey: 'feat2Title', descKey: 'feat2Desc' },
  { Icon: Calculator, titleKey: 'feat3Title', descKey: 'feat3Desc' },
  { Icon: Database,   titleKey: 'feat4Title', descKey: 'feat4Desc' },
  { Icon: ShieldCheck,titleKey: 'feat5Title', descKey: 'feat5Desc' },
  { Icon: Globe,      titleKey: 'feat6Title', descKey: 'feat6Desc' },
]

const TRUST_ICONS = [Calculator, Database, ShieldCheck, Lock]

export default function Landing() {
  const navigate = useNavigate()
  const { t, lang, changeLang } = useLang()

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">

      {/* ── Sticky Navbar ── */}
      <nav className="flex items-center justify-between px-6 py-4 bg-brand-navy text-white sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-brand-gold font-bold shadow-sm">
            <TrendingUp size={20} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl tracking-tight">Vyapar Mitra AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          <a href="#how-it-works" className="hover:text-brand-gold transition">{t('howItWorks')}</a>
          <a href="#features" className="hover:text-brand-gold transition">{t('features')}</a>
          <button onClick={() => navigate('/admin')} className="hover:text-brand-gold transition">{t('officerLogin')}</button>
        </div>
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1 border border-white/20">
            {langOptions.map(opt => (
              <button
                key={opt.code}
                onClick={() => changeLang(opt.code)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  lang === opt.code
                    ? 'bg-brand-gold text-brand-navy font-bold shadow'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <ThemeToggle />
          <Button onClick={() => navigate('/register')} variant="gold" className="hidden sm:block text-sm px-4 py-2">
            {t('startPlan')}
          </Button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 text-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-10 left-10 w-48 h-48 bg-brand-navy/10 dark:bg-brand-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-400/10 dark:bg-teal-500/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy/10 dark:bg-brand-gold/10 border border-brand-navy/20 dark:border-brand-gold/20 rounded-full text-sm font-medium text-brand-navy dark:text-brand-gold mb-8"
        >
          <Sparkles size={14} />
          AI-Powered Business Planning for Rural India
        </motion.div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
          <TextEffect per="word" preset="blur">
            {t('heroLine1')}
          </TextEffect>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 inline-block">
            <TextEffect per="char" preset="fade" delay={0.8}>
              {t('heroHighlight')}
            </TextEffect>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10"
        >
          {t('heroSubtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-20"
        >
          <Button onClick={() => navigate('/register')} className="px-8 py-3.5 text-base shadow-lg shadow-brand-navy/20">
            {t('heroCta')}
          </Button>
          <Button variant="ghost" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 text-base border border-[var(--border)]">
            {t('heroSeeCta')} <ArrowRight size={16} className="ml-2 inline" />
          </Button>
        </motion.div>

        {/* Stats strip */}
        <InView variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto py-8 border-y border-[var(--border)]">
            {[
              { val: t('stat1Val'), lbl: t('stat1Lbl') },
              { val: t('stat2Val'), lbl: t('stat2Lbl') },
              { val: t('stat3Val'), lbl: t('stat3Lbl') },
              { val: t('stat4Val'), lbl: t('stat4Lbl') },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + i * 0.1, type: 'spring', stiffness: 200 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-brand-navy dark:text-brand-gold">{s.val}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{s.lbl}</div>
              </motion.div>
            ))}
          </div>
        </InView>
      </main>

      {/* ── How It Works ── */}
      <InView variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }}>
        <section id="how-it-works" className="py-24 bg-[var(--bg-card)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('howTitle')}</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-brand-navy to-brand-gold mx-auto rounded-full" />
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { num: 1, titleKey: 'step1Title', descKey: 'step1Desc', color: 'from-blue-500 to-brand-navy' },
                { num: 2, titleKey: 'step2Title', descKey: 'step2Desc', color: 'from-brand-gold to-orange-500' },
                { num: 3, titleKey: 'step3Title', descKey: 'step3Desc', color: 'from-teal-500 to-green-600' },
              ].map(({ num, titleKey, descKey, color }) => (
                <div key={num} className="relative p-8 rounded-2xl bg-[var(--bg-page)] border border-[var(--border)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
                  <Spotlight className={`bg-gradient-to-r ${color} opacity-20`} size={200} />
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    {num}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t(titleKey)}</h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">{t(descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </InView>

      {/* ── Features ── */}
      <InView variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 0.5 }}>
        <section id="features" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('featTitle')}</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-brand-navy to-brand-gold mx-auto rounded-full" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {FEATURES.map(({ Icon, titleKey, descKey }, i) => (
                <InView
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-brand-gold hover:shadow-xl transition-all duration-300 cursor-default h-full">
                    <div className="w-12 h-12 rounded-xl bg-brand-gold/10 dark:bg-brand-gold/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon size={24} className="text-brand-gold" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-brand-navy dark:group-hover:text-brand-gold transition-colors">{t(titleKey)}</h3>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">{t(descKey)}</p>
                  </div>
                </InView>
              ))}
            </div>
          </div>
        </section>
      </InView>

      {/* ── Trust / CTA Banner ── */}
      <InView variants={{ hidden: { opacity: 0, filter: 'blur(8px)' }, visible: { opacity: 1, filter: 'blur(0px)' } }} transition={{ duration: 0.7 }}>
        <section className="relative bg-brand-navy text-white py-20 overflow-hidden">
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #F59E0B 1px, transparent 1px)', backgroundSize: '30px 30px' }}
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">{t('trustTitle')}</h2>
            <div className="grid md:grid-cols-4 gap-8 mb-14">
              {TRUST_ICONS.map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-10 h-10 text-brand-gold mx-auto mb-4" />
                  <h4 className="font-semibold text-base">{t(`trust${i+1}`)}</h4>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={() => navigate('/register')} variant="gold" className="px-10 py-3.5 text-base shadow-lg shadow-brand-gold/30">
                {t('heroCta')}
              </Button>
              <Button onClick={() => navigate('/admin')} className="px-10 py-3.5 text-base bg-white/10 hover:bg-white/20 text-white border border-white/20">
                {t('officerDash')} <ArrowRight className="inline ml-2" size={16} />
              </Button>
            </div>
            <p className="text-xs text-white/50 mt-10 max-w-lg mx-auto">{t('disclaimer')}</p>
          </div>
        </section>
      </InView>

      {/* ── Footer ── */}
      <footer className="bg-[var(--bg-card)] border-t border-[var(--border)] py-14">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-navy dark:bg-brand-gold flex items-center justify-center text-white dark:text-brand-navy">
                <TrendingUp size={16} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg text-[var(--text-primary)]">Vyapar Mitra</span>
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed">{t('footerTagline')}</p>
          </div>
          <div>
            <h4 className="font-bold mb-5 text-[var(--text-primary)]">{t('footerModules')}</h4>
            <ul className="space-y-3 text-[var(--text-muted)]">
              {['feasibility','planner','advisor'].map(k => (
                <li key={k} className="hover:text-brand-navy dark:hover:text-brand-gold cursor-pointer transition-colors">{t(k)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-5 text-[var(--text-primary)]">{t('footerOfficer')}</h4>
            <ul className="space-y-3 text-[var(--text-muted)]">
              <li><button onClick={() => navigate('/admin')} className="hover:text-brand-navy dark:hover:text-brand-gold transition-colors">{t('officerDash')}</button></li>
              <li className="hover:text-brand-navy dark:hover:text-brand-gold cursor-pointer transition-colors">Sector Saturation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-5 text-[var(--text-primary)]">{t('footerLinks')}</h4>
            <ul className="space-y-3 text-[var(--text-muted)]">
              {['MoSJE', 'Jan Samarth', 'Agmarknet', 'MSME India'].map(l => (
                <li key={l} className="hover:text-brand-navy dark:hover:text-brand-gold cursor-pointer transition-colors">{l}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-[var(--border)] text-xs text-[var(--text-muted)] flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2025 Vyapar Mitra AI. Built for rural India.</span>
          <span className="text-brand-gold">PS-26091 | MSME Hackathon</span>
        </div>
      </footer>
    </div>
  )
}
