import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing     from './pages/Landing'
import Register    from './pages/Register'
import Dashboard   from './pages/Dashboard'
import Feasibility from './pages/Feasibility'
import Planner     from './pages/Planner'
import AIAdvisor   from './pages/AIAdvisor'
import Chatbot     from './pages/Chatbot'
import Admin       from './pages/Admin'
import { DashboardLayout } from './components/layout/DashboardLayout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                      element={<Landing />} />
        <Route path="/register"              element={<Register />} />
        <Route path="/admin"                 element={<Admin />} />
        
        {/* Dashboard Routes wrapped in layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="feasibility" element={<Feasibility />} />
          <Route path="planner"     element={<Planner />} />
          <Route path="advisor"     element={<AIAdvisor />} />
          <Route path="chatbot"     element={<Chatbot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
