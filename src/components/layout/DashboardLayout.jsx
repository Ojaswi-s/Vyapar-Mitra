import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'
import { TopBar } from './TopBar'

export function DashboardLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    // Basic mock navigation guard
    if (!localStorage.getItem('vm_user')) navigate('/register')
  }, [navigate])

  return (
    <div className="flex h-screen bg-[var(--bg-page)] overflow-hidden">
      {/* Sidebar — hidden on mobile */}
      <aside className="hidden md:flex flex-col w-60 shrink-0">
        <Sidebar />
      </aside>
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
      {/* Bottom nav — mobile only (4 items: Home, Feasibility, Planner, Chatbot) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-[var(--border)] bg-[var(--bg-card)] z-50">
        <BottomNav />
      </nav>
    </div>
  )
}
