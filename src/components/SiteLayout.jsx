import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export function SiteLayout() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-140px] top-[-80px] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl animate-aurora" />
        <div className="absolute right-[-120px] top-[20%] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl animate-aurora" />
        <svg className="absolute bottom-0 left-0 w-full text-slate-200/40" viewBox="0 0 1200 180" fill="none">
          <path d="M0 90C200 10 400 170 600 90C800 10 1000 170 1200 90V180H0V90Z" fill="currentColor" />
        </svg>
      </div>
      <Header />
      <div key={location.pathname} className="motion-safe:animate-fade-up">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
