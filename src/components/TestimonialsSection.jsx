import { testimonials } from '../api/homepageContent'
import { SectionHeading } from './SectionHeading'

export function TestimonialsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
      <SectionHeading
        eyebrow="Social proof"
        title="Real outcomes from students and employers using InternMatch AI."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial) => (
          <article
            className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:border-fuchsia-200"
            key={testimonial.name}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">{testimonial.role}</p>
            <h3 className="mt-2 text-lg font-bold text-slate-900">{testimonial.name}</h3>
            <p className="mt-2 text-slate-600">“{testimonial.quote}”</p>
            <div className="mt-4 text-base tracking-[0.2em] text-amber-500" aria-label="Five star rating">
              ★★★★★
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
