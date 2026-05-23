import { Link, NavLink, useNavigate } from 'react-router-dom'
import { brand, navigationLinks } from '../api/homepageContent'
import { useAppContext } from '../context/AppContext'
import { cn } from '../utils/cn'

export function Header() {
  const { menuOpen, toggleMenu, closeMenu } = useAppContext()
  const navigate = useNavigate()

  let currentUser = null
  try {
    const userData = localStorage.getItem('user')
    currentUser = userData ? JSON.parse(userData) : null
  } catch {
    currentUser = null
  }

  const isAuthenticated = Boolean(localStorage.getItem('token') && currentUser)
  const displayName = currentUser?.name || currentUser?.company_name || currentUser?.email
  const visibleLinks = navigationLinks.filter((link) => {
    if (!isAuthenticated) return link.to !== '/profile'
    return link.to !== '/login' && link.to !== '/signup'
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    closeMenu()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 w-full">
      <div className="glass relative flex items-center justify-between gap-4 border-x-0 rounded-none px-4 py-3 shadow-xl shadow-slate-900/5 md:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-extrabold tracking-[0.2em] text-white shadow-glow" aria-hidden="true">
            AI
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 md:text-base">{brand.name}</p>
            <p className="text-xs text-slate-500">{brand.tagline}</p>
          </div>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-blue-300 hover:text-blue-600 md:hidden"
          type="button"
          onClick={toggleMenu}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <span className="sr-only">Toggle navigation</span>
        </button>

        <nav
          className={cn(
            'absolute left-2 right-2 top-[calc(100%+0.45rem)] hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl md:static md:flex md:w-auto md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0 md:shadow-none',
            menuOpen && 'block',
          )}
          aria-label="Primary"
        >
          {visibleLinks.map((link) => {
            if (link.variant === 'primary') {
              return (
                <Link
                  key={link.label}
                  className="mt-2 block rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-center text-sm font-bold text-white shadow-glow transition hover:scale-[1.02] md:mt-0"
                  to={link.to}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              )
            }

            if (link.variant === 'ghost') {
              return (
                <Link
                  key={link.label}
                  className="mt-2 block rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 md:ml-3 md:mt-0"
                  to={link.to}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              )
            }

            return (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  cn(
                    'block rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-blue-50 hover:text-blue-700',
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700',
                  )
                }
              >
                {link.label}
              </NavLink>
            )
          })}

          {isAuthenticated && (
            <div className="mt-2 flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 md:ml-3 md:mt-0">
              <span className="text-sm font-semibold text-slate-700">{displayName}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
