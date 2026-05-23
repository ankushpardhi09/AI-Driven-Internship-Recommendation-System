import { Link } from 'react-router-dom'
import { audiences } from '../api/homepageContent'
import { isUserAuthenticated } from '../utils/authState'

export function AudienceSection() {
  const isAuthenticated = isUserAuthenticated()

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-16 md:grid-cols-2 md:py-20">
      {audiences.map((audience) => (
        <article
          className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm transition duration-300 hover:shadow-xl"
          key={audience.title}
        >
          <span className="chip">{audience.title}</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900">{audience.heading}</h2>
          <ul className="mt-5 space-y-2">
            {audience.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-slate-600">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 font-bold text-white transition hover:-translate-y-0.5"
            to={isAuthenticated ? '/ai-copilot' : audience.title === 'For Students' ? '/signup' : '/login'}
          >
            {isAuthenticated ? 'Explore AI Copilot' : audience.cta}
          </Link>
        </article>
      ))}
    </section>
  )
}
