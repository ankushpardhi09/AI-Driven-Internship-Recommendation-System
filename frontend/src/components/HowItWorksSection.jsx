import { steps } from '../api/homepageContent'
import { SectionHeading } from './SectionHeading'

export function HowItWorksSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20" aria-labelledby="how-it-works-title">
      <SectionHeading
        centered
        eyebrow="How it works"
        title="4 easy steps to your dream internship"
        id="how-it-works-title"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <article
            className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm transition hover:border-cyan-300 hover:shadow-lg"
            key={step.title}
          >
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">{step.label}</span>
            <h3 className="mt-3 text-xl font-extrabold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-slate-600">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
