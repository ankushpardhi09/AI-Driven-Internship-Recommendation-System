import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const pageHints = {
  '/': 'Preparing your personalized internship dashboard... ',
  '/ai-copilot': 'Loading AI Copilot guidance tools... ',
  '/employer': 'Opening employer hiring workspace... ',
  '/about': 'Getting the platform story ready... ',
  '/blog': 'Fetching latest internship insights... ',
  '/resources': 'Gathering practical playbooks and templates... ',
  '/login': 'Securing sign-in experience... ',
  '/signup': 'Setting up your welcome kit... ',
}

export function RouteWelcomeLoader() {
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(true)

  const message = useMemo(
    () => pageHints[location.pathname] || 'Loading your experience... ',
    [location.pathname],
  )

  useEffect(() => {
    const storageKey = 'internmatch-welcome-seen'
    const seenAlready = window.localStorage.getItem(storageKey) === 'true'

    if (seenAlready) {
      setMounted(false)
      return
    }

    setMounted(true)
    setVisible(true)
    window.localStorage.setItem(storageKey, 'true')

    const hideTimer = setTimeout(() => {
      setVisible(false)
    }, 2000)

    const unmountTimer = setTimeout(() => {
      setMounted(false)
    }, 2300)

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(unmountTimer)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center p-4 transition-opacity duration-300 ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="absolute inset-0 bg-slate-950/62 backdrop-blur-lg" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-16 h-72 w-72 animate-aurora rounded-full bg-blue-500/35 blur-3xl" />
        <div className="absolute right-[-80px] top-[18%] h-72 w-72 animate-aurora rounded-full bg-cyan-400/30 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/3 h-80 w-80 animate-aurora rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0 px-5 py-6 md:px-12 md:py-10">
        <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-3xl bg-white/10 p-4">
            <div className="h-6 w-1/2 animate-pulse rounded-full bg-white/30" />
            <div className="mt-4 h-20 animate-pulse rounded-2xl bg-white/20" />
            <div className="mt-3 h-20 animate-pulse rounded-2xl bg-white/20" />
          </div>
          <div className="rounded-3xl bg-white/10 p-4">
            <div className="h-6 w-2/3 animate-pulse rounded-full bg-white/30" />
            <div className="mt-4 h-8 animate-pulse rounded-xl bg-white/20" />
            <div className="mt-3 h-8 animate-pulse rounded-xl bg-white/20" />
            <div className="mt-3 h-8 animate-pulse rounded-xl bg-white/20" />
          </div>
          <div className="rounded-3xl bg-white/10 p-4">
            <div className="h-6 w-1/3 animate-pulse rounded-full bg-white/30" />
            <div className="mt-4 h-32 animate-pulse rounded-2xl bg-white/20" />
            <div className="mt-3 h-10 animate-pulse rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/20 bg-white/95 p-6 shadow-2xl shadow-slate-900/30 md:p-7">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-extrabold tracking-[0.18em] text-white animate-pulse">
            AI
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Welcome Kit</p>
            <p className="text-base font-semibold text-slate-900">InternMatch AI</p>
          </div>
        </div>

        <p className="text-sm text-slate-600">{message}</p>

        <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-[78%] animate-[pulse_1100ms_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
        </div>

        <p className="mt-3 text-xs font-medium text-slate-500">Preparing your workspace experience...</p>
      </div>
    </div>
  )
}
