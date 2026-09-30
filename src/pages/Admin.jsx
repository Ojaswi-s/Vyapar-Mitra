import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Card } from '../components/ui/Card'
import { MetricCard } from '../components/ui/MetricCard'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { districtData } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { TrendingUp, Users, Download, MapPin, Search, FileText, ChevronDown } from 'lucide-react'
import { InView } from '../components/ui/in-view'

const DISTRICTS = Object.keys(districtData)

export default function Admin() {
  const navigate = useNavigate()
  const [district, setDistrict] = useState('Amravati')
  const [period, setPeriod] = useState('Last 30 Days')
  const [searchQuery, setSearchQuery] = useState('')

  const data = districtData[district]
  const { kpis, saturation: saturationData, schemeDist, sanctionReady, recentReports } = data

  const filteredReports = recentReports.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.business.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleLogout = () => navigate('/')

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">

      {/* Admin Topbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-brand-navy text-white sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-brand-gold shadow-sm">
            <TrendingUp size={20} strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-bold text-lg block leading-tight">SCA Officer Portal</span>
            <span className="text-xs text-white/60">Vyapar Mitra Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {/* District selector */}
          <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 border border-white/20">
            <MapPin size={14} className="text-brand-gold shrink-0" />
            <select
              value={district}
              onChange={e => { setDistrict(e.target.value); setSearchQuery('') }}
              className="bg-transparent border-none text-white text-sm focus:outline-none cursor-pointer"
            >
              {DISTRICTS.map(d => <option key={d} className="text-black">{d}</option>)}
            </select>
            <ChevronDown size={14} className="text-white/60" />
          </div>

          <select
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className="hidden md:block bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none"
          >
            {['Last 30 Days', 'Last 90 Days', 'This Year'].map(p => (
              <option key={p} className="text-black">{p}</option>
            ))}
          </select>

          <div className="flex items-center gap-3 pl-4 border-l border-white/20">
            <div className="hidden sm:block text-right">
              <p className="font-bold text-sm leading-tight">Ramesh Kumar</p>
              <p className="text-xs text-white/60">District Nodal Officer</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center font-bold text-sm">
              RK
            </div>
          </div>

          <button onClick={handleLogout} className="text-red-300 hover:text-red-400 font-medium text-sm">Logout</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">

        {/* District badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={district}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-navy/10 dark:bg-brand-gold/10 border border-brand-navy/20 dark:border-brand-gold/20 rounded-full text-sm font-medium text-brand-navy dark:text-brand-gold">
              <MapPin size={14} />
              {district} District, Maharashtra
            </div>
            <span className="text-xs text-[var(--text-muted)]">{period}</span>
          </motion.div>
        </AnimatePresence>

        {/* KPIs + Quick Actions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={district + '-kpis'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-4 gap-5"
          >
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard label="Total Reports" value={kpis.totalReports.toLocaleString()} />
              <MetricCard label="Viable Verdicts" value={`${kpis.viablePct}%`} accent />
              <MetricCard label="Caution Flagged" value={`${kpis.cautionPct}%`} />
              <MetricCard label="Sanction Ready" value={kpis.sanctionReady.toLocaleString()} accent />
            </div>
            <Card className="flex flex-col justify-center gap-3 bg-brand-gold/5 border-brand-gold/30">
              <h3 className="font-bold text-xs text-[var(--text-muted)] uppercase tracking-wider">Quick Actions</h3>
              <Button variant="gold" className="w-full justify-start gap-2 text-sm">
                <Download size={15} /> Export District Report
              </Button>
              <Button className="w-full justify-start gap-2 bg-brand-navy hover:bg-brand-navy/90 text-white text-sm">
                <Users size={15} /> Schedule Field Visits
              </Button>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Charts row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={district + '-charts'}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="grid lg:grid-cols-3 gap-5"
          >
            {/* Sector Saturation Chart */}
            <Card className="lg:col-span-2">
              <h3 className="font-bold mb-5">Sector Saturation — {district} (% of max capacity)</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={saturationData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={90} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8 }}
                      formatter={v => [`${v}%`, 'Saturation']}
                    />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
                      {saturationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-5 mt-4 text-xs text-[var(--text-muted)]">
                {[{ c: '#ef4444', l: 'High (>60%)' }, { c: '#f59e0b', l: 'Medium (30–60%)' }, { c: '#10b981', l: 'Low (<30%)' }].map(({ c, l }) => (
                  <div key={l} className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />{l}</div>
                ))}
              </div>
            </Card>

            {/* Sanction Readiness */}
            <Card>
              <h3 className="font-bold mb-4">Sanction Readiness</h3>
              <div className="space-y-3 mb-6">
                {[
                  { key: 'complete',            label: 'Complete Documents',   color: 'green' },
                  { key: 'pendingVerification', label: 'Pending Verification', color: 'amber' },
                  { key: 'flaggedForVisit',     label: 'Flagged for Visit',    color: 'red' },
                ].map(({ key, label, color }) => (
                  <div key={key} className={`flex justify-between items-center p-3 rounded-lg bg-${color}-50 dark:bg-${color}-900/10 border border-${color}-100 dark:border-${color}-900/30`}>
                    <span className={`text-sm font-medium text-${color}-800 dark:text-${color}-300`}>{label}</span>
                    <span className={`font-bold text-${color}-600 dark:text-${color}-400`}>{sanctionReady[key]}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-bold mb-3 text-sm">Scheme Distribution</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Micro Finance', count: schemeDist.microFinance, total: schemeDist.microFinance + schemeDist.termLoan },
                  { label: 'Term Loan', count: schemeDist.termLoan, total: schemeDist.microFinance + schemeDist.termLoan },
                ].map(({ label, count, total }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[var(--text-muted)]">{label}</span>
                      <span className="font-bold">{count}</span>
                    </div>
                    <div className="h-1.5 bg-[var(--bg-page)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.round(count / total * 100)}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full bg-brand-navy dark:bg-brand-gold rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Reports Table */}
        <InView variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="overflow-hidden p-0">
            <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--border)]">
              <h3 className="font-bold text-base">Recent Feasibility Reports — {district}</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search name, village, business..."
                    className="pl-8 pr-4 py-2 text-sm bg-[var(--bg-page)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy w-56"
                  />
                </div>
                <Button variant="ghost" className="text-sm gap-2 border border-[var(--border)]">
                  <FileText size={14} /> Export
                </Button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={district + '-table'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-[var(--text-muted)] uppercase bg-[var(--bg-page)] border-b border-[var(--border)]">
                      <tr>
                        <th className="px-5 py-4 font-medium">Applicant</th>
                        <th className="px-5 py-4 font-medium">Village</th>
                        <th className="px-5 py-4 font-medium">Business</th>
                        <th className="px-5 py-4 font-medium">Margin (₹)</th>
                        <th className="px-5 py-4 font-medium">Scheme</th>
                        <th className="px-5 py-4 font-medium">Verdict</th>
                        <th className="px-5 py-4 font-medium text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-5 py-10 text-center text-[var(--text-muted)]">No matching records found.</td>
                        </tr>
                      ) : filteredReports.map((report, i) => (
                        <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-page)] transition-colors">
                          <td className="px-5 py-4 font-semibold">{report.name}</td>
                          <td className="px-5 py-4 text-[var(--text-muted)]">{report.village}</td>
                          <td className="px-5 py-4">{report.business}</td>
                          <td className="px-5 py-4 font-medium">₹{report.margin.toLocaleString('en-IN')}</td>
                          <td className="px-5 py-4 text-xs text-[var(--text-muted)] font-medium">{report.scheme}</td>
                          <td className="px-5 py-4"><Badge verdict={report.verdict} /></td>
                          <td className="px-5 py-4 text-right">
                            <Button variant="ghost" className="px-3 py-1.5 text-xs text-brand-navy dark:text-brand-gold hover:bg-brand-navy/10 dark:hover:bg-brand-gold/10">
                              Review
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>
        </InView>

      </main>
    </div>
  )
}
