import { useState } from 'react'

export function Tabs({ tabs, children }) {
  const [active, setActive] = useState(0)
  const childArray = Array.isArray(children) ? children : [children]

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 bg-[var(--bg-page)] border border-[var(--border)] rounded-xl p-1 mb-6 overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex-1
              ${active === i
                ? 'bg-brand-navy text-white shadow-sm dark:bg-brand-gold dark:text-brand-navy'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab panel */}
      <div key={active}>
        {childArray[active]}
      </div>
    </div>
  )
}
