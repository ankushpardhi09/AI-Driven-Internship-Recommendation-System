import { stats } from '../api/homepageContent'

const socialProof = ['Partner Universities', 'Career Centers', 'Placement Cells', 'Hiring Teams', 'Startup Networks', 'Enterprise Recruiters']

export function StatsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article
            className="rounded-3xl bg-gradient-to-br from-slate-900 to-blue-700 p-6 text-center text-white shadow-xl shadow-blue-900/15 transition hover:-translate-y-1"
            key={stat.label}
          >
            <strong className="block text-4xl font-extrabold md:text-5xl">{stat.value}</strong>
            <span className="mt-1 block text-sm font-medium text-slate-200">{stat.label}</span>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white/80 p-5">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Trust and credibility across the ecosystem</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {socialProof.map((company) => (
            <span
              key={company}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
