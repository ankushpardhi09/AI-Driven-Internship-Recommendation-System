import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { isUserAuthenticated } from '../utils/authState'

const employerBenefits = [
  'Save time on screening',
  'AI pre-filtered candidates',
  'Automated matching',
  'Reduce hiring costs',
  'Higher quality placements',
]

const employerSteps = [
  'Post Internship',
  'AI Screens Candidates',
  'Review Top Matches',
  'Make Offers',
]

const employerFeatures = [
  'Job Posting (Easy Form)',
  'Candidate Screening',
  'Skill Filters',
  'Interview Scheduling',
  'Feedback and Rating',
  'Analytics Dashboard',
  'Bulk Applications',
  'Team Collaboration',
  'Email Notifications',
  'ATS Integration',
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '$49/mo',
    desc: 'Great for growing teams starting internship hiring.',
    points: ['5 listings/month', 'AI candidate shortlist', 'Basic analytics'],
  },
  {
    name: 'Pro',
    price: '$149/mo',
    desc: 'Best for active hiring cycles and faster placement.',
    points: ['20 listings/month', 'Priority support', 'Advanced ranking and filters'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For large-scale hiring programs and institutions.',
    points: ['Unlimited listings', 'Dedicated success manager', 'Custom integrations and SLA'],
  },
]

const successStories = [
  {
    company: 'Nova Tech Labs',
    quote: 'Hired 50 interns in 3 months with much stronger role fit than our old process.',
  },
  {
    company: 'BrightEdge Systems',
    quote: 'AI ranking reduced our screening effort and helped us hit a 95% placement success rate.',
  },
  {
    company: 'Apex Digital',
    quote: 'Time-to-hire dropped dramatically and our hiring managers trust the shortlist quality.',
  },
]

const employerFaqs = [
  {
    question: 'How do I post a job?',
    answer: 'Use the internship form builder, define role criteria, and publish in a few minutes.',
  },
  {
    question: 'How are students screened?',
    answer: 'AI evaluates skills, GPA, project history, and relevance to your role requirements.',
  },
  {
    question: 'What is the cost?',
    answer: 'Choose Starter, Pro, or Enterprise plans based on monthly listings and support needs.',
  },
  {
    question: 'Can we manage multiple listings and team members?',
    answer: 'Yes, you can manage multiple openings and give role-based access to hiring team members.',
  },
  {
    question: 'Do you support ATS integration?',
    answer: 'Yes, enterprise plans support integration with Applicant Tracking Systems and workflows.',
  },
  {
    question: 'Can we schedule interviews on the platform?',
    answer: 'Yes, interview scheduling and candidate communication are built directly into the dashboard.',
  },
]

const dashboardFeatures = [
  'Quick stats: applications, placements, and view rate',
  'Post new internship with form builder',
  'View applicants with AI ranking score',
  'Manage multiple listings',
  'Interview scheduler',
  'Send feedback to candidates',
  'Generate reports and analytics',
  'Team management with multi-user access',
]

const screeningFeatures = [
  'AI pre-filtering by skills, GPA, and experience',
  'Skill match percentage',
  'Resume review summary',
  'Automated ranking',
  'One-click decisions: Accept, Reject, or Hold',
]

export function EmployerPage() {
  const [activeFaq, setActiveFaq] = useState(0)
  const isAuthenticated = isUserAuthenticated()

  return (
    <main className="pb-10">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-12 pt-14 md:grid-cols-2 md:pt-20">
        <div>
          <span className="chip">Employer</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Find Your Next Top Talent
          </h1>
          <p className="mt-4 text-lg text-slate-600">Access pre-screened top talent in minutes and scale hiring with AI-powered workflows.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to={isAuthenticated ? '/profile' : '/signup'} className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-bold text-white shadow-glow transition hover:-translate-y-0.5">
              {isAuthenticated ? 'Open Dashboard' : 'Post Your Internship'}
            </Link>
            <Link to="/resources" className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-blue-300 hover:text-blue-700">
              Schedule Demo
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Google', 'Amazon', 'Infosys', 'TCS', 'Startups'].map((logo) => (
              <span key={logo} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                {logo}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6 shadow-xl shadow-slate-900/10">
          <h2 className="text-2xl font-extrabold text-slate-900">Employer Dashboard</h2>
          <ul className="mt-4 grid gap-2">
            {dashboardFeatures.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="Why use our platform?" title="Employer benefits designed for faster and smarter hiring" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {employerBenefits.map((item) => (
            <article key={item} className="rounded-3xl border border-slate-200 bg-white/90 p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-slate-700">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="How it works for employers" title="4-step process to hire internship talent" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {employerSteps.map((step, index) => (
            <article key={step} className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-bold text-white">
                {index + 1}
              </div>
              <p className="mt-3 text-base font-bold text-slate-900">{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="Employer features" title="Everything hiring teams need in one place" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {employerFeatures.map((feature) => (
            <article key={feature} className="group rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg">
              <div className="mb-3 h-9 w-9 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 transition group-hover:rotate-6" />
              <h3 className="text-sm font-bold text-slate-900">{feature}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="Pricing plans" title="Flexible subscriptions for teams of every size" />
        <div className="grid gap-4 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                plan.featured
                  ? 'border-blue-400 bg-gradient-to-b from-blue-50 to-white'
                  : 'border-slate-200 bg-white/90'
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">{plan.name}</p>
              <h3 className="mt-2 text-3xl font-extrabold text-slate-900">{plan.price}</h3>
              <p className="mt-2 text-sm text-slate-600">{plan.desc}</p>
              <ul className="mt-4 grid gap-2">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link to={isAuthenticated ? '/profile' : '/signup'} className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
                {isAuthenticated ? 'Open Dashboard' : `Choose ${plan.name}`}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="Employer success stories" title="How companies are improving internship hiring outcomes" />
        <div className="grid gap-4 md:grid-cols-3">
          {successStories.map((story) => (
            <article key={story.company} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">{story.company}</h3>
              <p className="mt-3 text-slate-600">"{story.quote}"</p>
              <p className="mt-4 text-amber-500">★★★★★</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-12 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <SectionHeading eyebrow="Candidate screening" title="AI-first screening that saves recruiter time" />
          <ul className="grid gap-2">
            {screeningFeatures.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <SectionHeading eyebrow="FAQ for employers" title="Common questions before you get started" />
          <div className="grid gap-3">
            {employerFaqs.map((faq, index) => {
              const isOpen = index === activeFaq

              return (
                <article
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border bg-white transition ${
                    isOpen ? 'border-blue-300 shadow-md shadow-blue-900/5' : 'border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-semibold text-slate-800"
                    onClick={() => setActiveFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span className="text-slate-500" aria-hidden="true">
                      {isOpen ? '▾' : '▸'}
                    </span>
                  </button>
                  {isOpen && <p className="px-4 pb-4 text-sm text-slate-600">{faq.answer}</p>}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-10 text-white shadow-2xl md:flex md:items-center md:justify-between md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-100">CTA</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">Post your first internship and hire faster with AI</h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Link to={isAuthenticated ? '/profile' : '/signup'} className="rounded-full bg-white px-5 py-3 font-bold text-slate-900 transition hover:-translate-y-0.5">
              {isAuthenticated ? 'Open Dashboard' : 'Post Your First Internship'}
            </Link>
            <Link
              to="/resources"
              className="rounded-full border border-white/40 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
