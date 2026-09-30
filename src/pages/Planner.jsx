import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Calculator, CheckCircle, Info, IndianRupee, TrendingUp } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { MetricCard } from '../components/ui/MetricCard'
import { calcScheme } from '../utils/calculator'

const SCHEMES = [
  { id: 'micro', name: 'Micro Finance Scheme', minMargin: 1000,  maxMargin: 14000,  rate: 6.5, years: 3, mora: 3,  maxLoan: 125000,  color: 'from-emerald-500 to-teal-600',   badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' },
  { id: 'term',  name: 'Term Loan Scheme',     minMargin: 14001, maxMargin: 500000, rate: 8.0, years: 7, mora: 6,  maxLoan: 4500000, color: 'from-blue-500 to-brand-navy',    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
]

function generateSchedule(loan, annualRate, tenureYears, moraMonths) {
  const qRate = annualRate / 100 / 4
  const moraQ = moraMonths / 3
  const repayQ = tenureYears * 4 - moraQ

  // Balance after moratorium (interest added)
  let balance = loan
  const rows = []

  // Moratorium quarters
  for (let q = 1; q <= moraQ; q++) {
    const interest = Math.round(balance * qRate)
    const openBal = Math.round(balance)
    balance = balance + interest
    rows.push({ q, status: 'Moratorium', open: openBal, interest, principal: 0, emi: 0, close: Math.round(balance) })
  }

  // Repayment quarters - reducing balance EMI
  const emi = Math.round(balance * qRate * Math.pow(1 + qRate, repayQ) / (Math.pow(1 + qRate, repayQ) - 1))
  for (let q = moraQ + 1; q <= moraQ + Math.min(repayQ, 8); q++) {
    const interest = Math.round(balance * qRate)
    const principal = emi - interest
    const openBal = Math.round(balance)
    balance = Math.max(0, balance - principal)
    rows.push({ q, status: 'Repayment', open: openBal, interest, principal, emi, close: Math.round(balance) })
  }

  return rows
}

export default function Planner() {
  const [margin, setMargin] = useState(14000)
  const [result, setResult] = useState(null)
  const [schedule, setSchedule] = useState([])
  const [eligibleScheme, setEligibleScheme] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('vm_user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      if (parsed.margin) setMargin(Number(parsed.margin))
    }
  }, [])

  useEffect(() => {
    const res = calcScheme(margin)
    if (res && !res.error) {
      setResult(res)
      const rows = generateSchedule(res.loanAmount, res.rate, res.tenure, res.moratorium)
      setSchedule(rows)
      const scheme = SCHEMES.find(s => s.name === res.schemeName)
      setEligibleScheme(scheme || null)
    } else {
      setResult(res || null)
      setSchedule([])
      setEligibleScheme(null)
    }
  }, [margin])

  const projectCost = margin > 0 ? Math.round(margin / 0.10) : 0
  const loanAmt = result?.loanAmount || 0

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-1">
          <Calculator className="text-brand-gold" size={24} /> Financial Planner
        </h1>
        <p className="text-[var(--text-muted)] text-sm">Enter your margin money to calculate scheme eligibility, project cost, loan amount & repayment schedule.</p>
      </div>

      {/* Scheme eligibility visual guide */}
      <div className="grid sm:grid-cols-2 gap-4">
        {SCHEMES.map(s => {
          const isActive = eligibleScheme?.id === s.id
          return (
            <motion.div
              key={s.id}
              animate={{ scale: isActive ? 1 : 0.98, opacity: isActive ? 1 : 0.55 }}
              transition={{ duration: 0.3 }}
              className={`relative rounded-2xl overflow-hidden p-5 border-2 transition-all ${
                isActive ? 'border-brand-navy dark:border-brand-gold shadow-xl' : 'border-[var(--border)]'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-5`} />
              {isActive && (
                <div className="absolute top-3 right-3">
                  <CheckCircle size={20} className="text-brand-navy dark:text-brand-gold" />
                </div>
              )}
              <div className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold mb-3 ${s.badge}`}>
                {isActive ? '✓ YOUR SCHEME' : 'NOT ELIGIBLE'}
              </div>
              <h3 className="font-bold text-base mb-3">{s.name}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-[var(--text-muted)] text-xs block">Margin range</span><span className="font-semibold">₹{s.minMargin.toLocaleString()} – ₹{s.maxMargin.toLocaleString()}</span></div>
                <div><span className="text-[var(--text-muted)] text-xs block">Interest rate</span><span className="font-semibold">{s.rate}% p.a.</span></div>
                <div><span className="text-[var(--text-muted)] text-xs block">Tenure</span><span className="font-semibold">{s.years} years</span></div>
                <div><span className="text-[var(--text-muted)] text-xs block">Moratorium</span><span className="font-semibold">{s.mora} months</span></div>
                <div className="col-span-2"><span className="text-[var(--text-muted)] text-xs block">Max loan</span><span className="font-semibold">₹{s.maxLoan.toLocaleString()}</span></div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <label className="block text-sm font-bold mb-1">Margin Money (₹)</label>
            <p className="text-xs text-[var(--text-muted)] mb-3">The 10% you contribute from savings</p>
            <div className="relative">
              <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="number"
                value={margin}
                min={1000}
                max={500000}
                step={1000}
                onChange={e => setMargin(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] focus:outline-none focus:ring-2 focus:ring-brand-navy dark:focus:ring-brand-gold text-lg font-semibold"
              />
            </div>

            {/* Quick presets */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[10000, 14000, 25000, 50000].map(v => (
                <button
                  key={v}
                  onClick={() => setMargin(v)}
                  className={`px-3 py-1 text-xs rounded-lg border font-medium transition-all ${
                    margin === v
                      ? 'bg-brand-navy text-white border-brand-navy dark:bg-brand-gold dark:text-brand-navy dark:border-brand-gold'
                      : 'border-[var(--border)] text-[var(--text-muted)] hover:border-brand-navy dark:hover:border-brand-gold'
                  }`}
                >
                  ₹{v.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Project cost calculation breakdown */}
            <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Your margin (10%)</span>
                <span className="font-semibold">₹{margin.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Project cost (÷10%)</span>
                <span className="font-semibold">₹{projectCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-brand-navy dark:text-brand-gold font-bold">
                <span>Bank loan (90%)</span>
                <span>₹{loanAmt.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {/* Eligible scheme card */}
          {result && !result.error && eligibleScheme && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-5 bg-gradient-to-br ${eligibleScheme.color} text-white shadow-lg`}
            >
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={18} />
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">Eligible Scheme</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{result.schemeName}</h3>
              <div className="space-y-1.5 text-sm text-white/90">
                <div className="flex justify-between"><span>Interest rate</span><span className="font-bold">{result.rate}% p.a.</span></div>
                <div className="flex justify-between"><span>Tenure</span><span className="font-bold">{result.tenure} years</span></div>
                <div className="flex justify-between"><span>Moratorium</span><span className="font-bold">{result.moratorium} months</span></div>
                <div className="flex justify-between border-t border-white/20 pt-2 mt-2"><span>Quarterly EMI</span><span className="font-bold text-base">₹{result.emi.toLocaleString()}</span></div>
              </div>
            </motion.div>
          )}

          {result?.error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 text-sm flex items-start gap-2">
              <Info size={16} className="shrink-0 mt-0.5" />
              {result.error}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-5">
          {result && !result.error && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MetricCard label="Project Cost" value={`₹${result.projectCost.toLocaleString()}`} />
                <MetricCard label="Loan (90%)" value={`₹${result.loanAmount.toLocaleString()}`} accent />
                <MetricCard label="Quarterly EMI" value={`₹${result.emi.toLocaleString()}`} />
                <MetricCard label="Total Interest" value={`₹${result.totalInterest.toLocaleString()}`} />
              </div>

              <Card className="overflow-hidden p-0">
                <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
                  <h3 className="font-bold text-sm">Repayment Schedule (Quarterly)</h3>
                  <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-page)] px-2 py-1 rounded-lg">First {schedule.length} quarters shown</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-[var(--text-muted)] bg-[var(--bg-page)] border-b border-[var(--border)]">
                      <tr>
                        <th className="px-4 py-3 font-medium">Qtr</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium text-right">Opening</th>
                        <th className="px-4 py-3 font-medium text-right">Principal</th>
                        <th className="px-4 py-3 font-medium text-right">Interest</th>
                        <th className="px-4 py-3 font-medium text-right">EMI</th>
                        <th className="px-4 py-3 font-medium text-right">Closing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((row, i) => (
                        <tr
                          key={i}
                          className={`border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-page)] transition-colors ${
                            row.status === 'Moratorium' ? 'opacity-60 italic' : ''
                          }`}
                        >
                          <td className="px-4 py-3 font-bold">{row.q}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              row.status === 'Moratorium'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            }`}>{row.status}</span>
                          </td>
                          <td className="px-4 py-3 text-right">₹{row.open.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right font-medium">₹{row.principal.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right text-[var(--text-muted)]">₹{row.interest.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right font-bold text-brand-navy dark:text-brand-gold">
                            {row.emi === 0 ? '—' : `₹${row.emi.toLocaleString()}`}
                          </td>
                          <td className="px-4 py-3 text-right">₹{row.close.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3 bg-[var(--bg-page)] border-t border-[var(--border)]">
                  <p className="text-[10px] text-[var(--text-muted)]">
                    Formula: Project Cost = Margin ÷ 10% · Loan = Project Cost × 90% · EMI = Reducing balance method · Interest capitalised during moratorium
                  </p>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
