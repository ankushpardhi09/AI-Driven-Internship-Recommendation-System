import { Link } from 'react-router-dom'
import { SectionHeading } from './SectionHeading'
import { isUserAuthenticated } from '../utils/authState'

const journeyLinks = [
  { label: 'Learn more about AI', to: '/ai-copilot' },
  { label: 'For student?', to: '/employer' },
  { label: 'Read articles', to: '/blog' },
  { label: 'Get templates', to: '/resources' },
  { label: 'Learn about platform', to: '/about' },
  { label: 'Ready to join?', to: '/signup', primary: true },
]

export function UserJourneySection() {
  const isAuthenticated = isUserAuthenticated()
  const links = journeyLinks.map((item) => {
    if (item.label !== 'Ready to join?') return item
    if (!isAuthenticated) return item
    return { label: 'Explore AI Copilot', to: '/ai-copilot', primary: true }
  })

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <SectionHeading eyebrow="Typical user journey" title="How a new visitor moves through the platform" />

      <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm md:p-6">
        <div className="grid gap-3 md:grid-cols-[200px_34px_1fr] md:items-start">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-slate-700">
            New Visitor
          </div>

          <div className="hidden items-center justify-center text-slate-400 md:flex">↓</div>

          <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-blue-700">
            Home Page (Hero + Features)
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                item.primary
                  ? 'border-blue-500 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-glow hover:-translate-y-0.5'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700'
              }`}
            >
              <span className="mr-2 text-slate-400">└─→</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
