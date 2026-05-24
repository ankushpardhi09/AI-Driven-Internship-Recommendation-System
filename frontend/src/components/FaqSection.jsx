import { Link } from 'react-router-dom'
import { faqs } from '../api/homepageContent'
import { useAppContext } from '../context/AppContext'
import { cn } from '../utils/cn'
import { SectionHeading } from './SectionHeading'

export function FaqSection() {
  const { activeFaq, setActiveFaq } = useAppContext()

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 md:py-20" id="faq">
      <SectionHeading centered eyebrow="FAQ" title="Frequently asked questions" />
      <div className="grid gap-3">
        {faqs.map((faq, index) => {
          const isOpen = index === activeFaq

          return (
            <article
              className={cn(
                'overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm transition',
                isOpen && 'border-blue-300 shadow-lg shadow-blue-900/5',
              )}
              key={faq.question}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-800"
                onClick={() => setActiveFaq(index)}
              >
                <span>{faq.question}</span>
                <span className="text-slate-500" aria-hidden="true">
                  {isOpen ? '▾' : '▸'}
                </span>
              </button>
              {isOpen && <p className="px-5 pb-4 text-slate-600">{faq.answer}</p>}
            </article>
          )
        })}
      </div>
      <Link
        className="mx-auto mt-5 inline-flex rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
        to="/faq"
      >
        See All FAQs
      </Link>
    </section>
  )
}
