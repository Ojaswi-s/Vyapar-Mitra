export function Button({ children, variant = 'primary', onClick, className = '' }) {
  const base = 'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150 focus:outline-none focus:ring-2'
  const variants = {
    primary: 'bg-brand-navy text-white hover:bg-opacity-90 focus:ring-brand-navy',
    gold:    'bg-brand-gold text-white hover:bg-amber-500 focus:ring-brand-gold',
    ghost:   'border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-card)] focus:ring-[var(--border)]',
    danger:  'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  }
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
