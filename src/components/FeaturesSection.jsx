import { features } from '../api/homepageContent'
import { SectionHeading } from './SectionHeading'

export function FeaturesSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20" id="about">
      <SectionHeading
        eyebrow="Platform value"
        title="Everything you need to discover, evaluate, and secure better internship outcomes."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" id="features">
        {features.map((feature) => (
          <article
            className="group rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
            key={feature.title}
          >
            <div className="mb-4 h-11 w-11 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 transition duration-300 group-hover:rotate-6" aria-hidden="true" />
            <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
            <p className="mt-2 text-slate-600">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
