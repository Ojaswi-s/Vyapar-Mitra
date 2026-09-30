import { mockFeasibility } from '../../data/mockData'

const riskColor = {
  low:    'text-green-600 dark:text-green-400',
  medium: 'text-amber-600 dark:text-amber-400',
  high:   'text-red-600 dark:text-red-400',
}

export function ScenarioTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {mockFeasibility.scenarios.map((s) => (
        <div key={s.label}
          className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
          <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">{s.label}</p>
          <p className="text-lg font-bold text-[var(--text-primary)] mb-1">
            ₹{(s.projectCost/1000).toFixed(0)}K project
          </p>
          <p className="text-sm text-[var(--text-muted)] mb-3">
            Loan: ₹{(s.loan/1000).toFixed(0)}K · {s.scheme}
          </p>
          <div className="flex justify-between text-xs mb-3">
            <span className="text-[var(--text-muted)]">Est. monthly revenue</span>
            <span className="font-semibold">₹{s.monthlyRevenue.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-xs mb-3">
            <span className="text-[var(--text-muted)]">Risk level</span>
            <span className={`font-semibold capitalize ${riskColor[s.risk]}`}>{s.risk}</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] border-t border-[var(--border)] pt-3 mt-1">
            {s.note}
          </p>
        </div>
      ))}
    </div>
  )
}
