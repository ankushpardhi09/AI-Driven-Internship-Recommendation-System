import { Link } from 'react-router-dom'
import { cta } from '../api/homepageContent'
import { isUserAuthenticated } from '../utils/authState'

export function CtaSection() {
  const isAuthenticated = isUserAuthenticated()

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:pb-20" id="cta">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-10 text-white shadow-2xl md:flex md:items-center md:justify-between md:px-10">
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="relative z-10">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
            {cta.eyebrow}
          </span>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight md:text-5xl">{cta.title}</h2>
          <p className="mt-3 max-w-xl text-sm font-medium text-cyan-100/90 md:text-base">
            Trusted by students, employers, and placement teams. Start free and scale as you grow.
          </p>
        </div>
        <div className="relative z-10 mt-7 flex flex-wrap gap-3 md:mt-0">
          <Link className="rounded-full bg-white px-5 py-3 font-bold text-slate-900 transition hover:-translate-y-0.5" to={isAuthenticated ? '/ai-copilot' : '/signup'}>
            {isAuthenticated ? 'Explore AI Copilot' : cta.primaryAction}
          </Link>
          <Link
            className="rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            to={isAuthenticated ? '/profile' : '/login'}
          >
            {isAuthenticated ? 'Open Dashboard' : cta.secondaryAction}
          </Link>
        </div>
      </div>
    </section>
  )
}
