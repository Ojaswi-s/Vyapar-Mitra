import { mockFeasibility } from '../data/mockData'
import { Card } from '../components/ui/Card'
import { MetricCard } from '../components/ui/MetricCard'
import { Tabs } from '../components/ui/Tabs'
import { Button } from '../components/ui/Button'
import { ScenarioTab } from '../components/feasibility/ScenarioTab'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Download } from 'lucide-react'

export default function Feasibility() {
  const { verdict, reason, market, competitors, swot, opportunities, commodity, dataSources } = mockFeasibility

  const verdictStyles = {
    viable: 'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-200 dark:border-emerald-700',
    caution: 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-900/20 dark:text-amber-200 dark:border-amber-700',
    'not-viable': 'bg-red-50 text-red-900 border-red-300 dark:bg-red-900/20 dark:text-red-200 dark:border-red-700',
  }

  const verdictIcon = {
    viable: '✅',
    caution: '⚠️',
    'not-viable': '❌',
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header & Verdict */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold">Feasibility Report</h1>
          <p className="text-sm text-[var(--text-muted)]">Generated for Amravati District, Maharashtra</p>
        </div>
        <Button variant="ghost" onClick={handlePrint} className="flex items-center gap-2">
          <Download size={16} /> Download PDF
        </Button>
      </div>

      <div className={`p-4 rounded-xl border-2 ${verdictStyles[verdict]} flex items-start gap-3`}>
        <span className="text-xl mt-0.5">{verdictIcon[verdict]}</span>
        <div>
          <h3 className="font-bold uppercase tracking-wider text-sm mb-1">{verdict.replace('-', ' ')}</h3>
          <p className="text-sm">{reason}</p>
        </div>
      </div>

      <Tabs tabs={['Market Analysis', 'SWOT', 'Opportunities', 'Scenarios', 'Summary']}>
        
        {/* Tab 1: Market Analysis */}
        <div className="space-y-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard label="Est. Consumers (5km)" value={market.consumers.toLocaleString()} />
            <MetricCard label="Households" value={market.households.toLocaleString()} />
            <MetricCard label="Avg. Monthly Income" value={`₹${market.avgIncome.toLocaleString()}`} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-sm font-bold mb-4">Competitor Density (District Level)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={competitors} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="sector" type="category" width={90} axisLine={false} tickLine={false} fontSize={12} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="pct" radius={[0, 4, 4, 0]} barSize={20}>
                      {competitors.map((entry, index) => {
                        let fill = '#10b981'; // low
                        if (entry.level === 'medium') fill = '#f59e0b';
                        if (entry.level === 'high') fill = '#ef4444';
                        return <Cell key={`cell-${index}`} fill={fill} />
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="flex flex-col">
              <h3 className="text-sm font-bold mb-4">Current Commodity Prices</h3>
              <div className="flex-1 flex flex-col justify-center items-center p-6 bg-brand-navy/5 dark:bg-brand-gold/5 rounded-lg border border-brand-navy/10 dark:border-brand-gold/10">
                <p className="text-[var(--text-muted)] text-sm">{commodity.name}</p>
                <p className="text-4xl font-bold text-brand-navy dark:text-brand-gold my-2">
                  ₹{commodity.price} <span className="text-lg text-[var(--text-muted)] font-normal">/ {commodity.unit}</span>
                </p>
                <p className="text-xs text-[var(--text-muted)]">Source: {commodity.source}</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Tab 2: SWOT */}
        <div className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <h3 className="font-bold text-green-700 dark:text-green-400 mb-3 uppercase text-sm tracking-wider">Strengths</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {swot.strengths.map((s,i) => <li key={i}>{s}</li>)}
              </ul>
            </Card>
            <Card className="border-l-4 border-l-amber-500">
              <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-3 uppercase text-sm tracking-wider">Weaknesses</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {swot.weaknesses.map((w,i) => <li key={i}>{w}</li>)}
              </ul>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-3 uppercase text-sm tracking-wider">Opportunities</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {swot.opportunities.map((o,i) => <li key={i}>{o}</li>)}
              </ul>
            </Card>
            <Card className="border-l-4 border-l-red-500">
              <h3 className="font-bold text-red-700 dark:text-red-400 mb-3 uppercase text-sm tracking-wider">Threats</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {swot.threats.map((t,i) => <li key={i}>{t}</li>)}
              </ul>
            </Card>
          </div>
        </div>

        {/* Tab 3: Opportunities */}
        <div className="pt-2 space-y-6">
          <Card>
            <h3 className="font-semibold mb-5 text-base">Underserved Local Opportunities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {opportunities.map((opp, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-4 bg-brand-navy text-white dark:bg-brand-gold dark:text-brand-navy rounded-xl gap-2 shadow-sm hover:scale-105 transition-transform cursor-default">
                  <span className="text-2xl">{['🐐','🌱','🧀','🍄'][i] || '🔹'}</span>
                  <span className="text-sm font-semibold text-center">{opp}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4 text-base">Why these opportunities?</h3>
            <ul className="space-y-3">
              {[
                { title: 'Low competition', desc: 'These sectors have under 25% saturation in your district.' },
                { title: 'Government support', desc: 'Multiple schemes available for these categories.' },
                { title: 'Market demand', desc: 'Growing local demand identified from census data.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-navy/10 dark:bg-brand-gold/20 text-brand-navy dark:text-brand-gold flex items-center justify-center flex-shrink-0 font-bold text-sm mt-0.5">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Tab 4: Scenarios */}
        <div className="pt-2">
          <ScenarioTab />
        </div>

        {/* Tab 5: Summary */}
        <div className="pt-2 space-y-6">
          <Card className="bg-brand-navy text-white border-none">
            <h3 className="font-bold text-lg mb-2">Final Recommendation</h3>
            <p className="text-white/80">{reason}</p>
          </Card>
          
          <Card>
            <h3 className="font-bold mb-3 text-sm">Data Sources Utilized</h3>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              {dataSources.map((ds, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                  {ds}
                </li>
              ))}
            </ul>
          </Card>
        </div>

      </Tabs>
    </div>
  )
}
