import { Link, useNavigate } from 'react-router-dom'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Button } from '../ui/Button'
import { TrendingUp } from 'lucide-react'

export function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-brand-navy text-white sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-brand-gold font-bold shadow-sm backdrop-blur-sm">
          <TrendingUp size={20} strokeWidth={2.5} />
        </div>
        <span className="font-bold text-xl tracking-tight text-white">Vyapar Mitra AI</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
        <a href="#how-it-works" className="hover:text-brand-gold transition">How It Works</a>
        <a href="#features" className="hover:text-brand-gold transition">Features</a>
        <Link to="/admin" className="hover:text-brand-gold transition">For Officers</Link>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" onClick={() => navigate('/admin')} className="hidden md:block text-white hover:bg-white/10 hover:text-white">Officer Login</Button>
        <Button onClick={() => navigate('/register')} variant="gold">Start Business Plan</Button>
      </div>
    </nav>
  )
}
