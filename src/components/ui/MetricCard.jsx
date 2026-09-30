export function MetricCard({ label, value, sub, accent }) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-3">
      <p className="text-xs text-[var(--text-muted)] mb-1">{label}</p>
      <p className={`text-xl font-semibold ${accent ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-[var(--text-muted)] mt-1">{sub}</p>}
    </div>
  )
}
