export function Badge({ verdict }) {
  const map = {
    viable:      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    caution:     'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    'not-viable':'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }
  const labels = { viable: 'Viable', caution: 'Caution', 'not-viable': 'Not Viable' }
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[verdict]}`}>
      {labels[verdict]}
    </span>
  )
}
