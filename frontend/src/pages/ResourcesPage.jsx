import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { isUserAuthenticated } from '../utils/authState'

const categories = [
  'For Students',
  'For Employers',
  'Documentation',
  'Templates',
  'Videos',
  'Webinars',
  'Tools',
  'Community',
]

const resourceCards = [
  {
    title: 'Resume Template Pack (3 versions)',
    description: 'Modern, ATS-friendly resume templates tailored for internship roles.',
    type: 'PDF/DOCX',
    category: 'For Students',
  },
  {
    title: 'Cover Letter Template',
    description: 'Customizable structure with examples for different industries.',
    type: 'DOCX',
    category: 'For Students',
  },
  {
    title: 'Interview Preparation Guide',
    description: 'Question frameworks, prep strategies, and sample answer patterns.',
    type: 'PDF',
    category: 'For Students',
  },
  {
    title: 'Salary Negotiation Worksheet',
    description: 'Practical worksheet to evaluate offers and negotiate confidently.',
    type: 'PDF',
    category: 'For Students',
  },
  {
    title: 'Internship Checklist',
    description: 'Track profile readiness, application quality, and interview milestones.',
    type: 'PDF',
    category: 'For Students',
  },
  {
    title: 'Job Description Template',
    description: 'Ready-to-use internship job posting format with clear role criteria.',
    type: 'DOCX',
    category: 'For Employers',
  },
  {
    title: 'Interview Questions Bank',
    description: 'Role-specific and behavioral interview questions for intern hiring.',
    type: 'PDF',
    category: 'For Employers',
  },
  {
    title: 'Candidate Evaluation Form',
    description: 'Standardized scoring framework for consistent candidate assessment.',
    type: 'DOCX',
    category: 'For Employers',
  },
  {
    title: 'Getting Started Guide',
    description: 'Set up your account and start using platform workflows quickly.',
    type: 'Guide',
    category: 'Documentation',
  },
  {
    title: 'Application Process Explained',
    description: 'Step-by-step documentation for student applications and employer review.',
    type: 'Guide',
    category: 'Documentation',
  },
  {
    title: 'Notification Settings Help',
    description: 'Configure alerts for applications, shortlists, and recommendations.',
    type: 'Guide',
    category: 'Documentation',
  },
  {
    title: 'Privacy and Security Information',
    description: 'How data is protected, processed, and shared responsibly.',
    type: 'Guide',
    category: 'Documentation',
  },
  {
    title: 'Skills Assessment Tool',
    description: 'Evaluate your skill profile and get targeted improvement insights.',
    type: 'Interactive',
    category: 'Tools',
  },
  {
    title: 'Career Path Quiz',
    description: 'Identify internship tracks based on strengths and interests.',
    type: 'Interactive',
    category: 'Tools',
  },
  {
    title: 'Internship ROI Calculator',
    description: 'Estimate employer ROI based on screening speed and placement quality.',
    type: 'Interactive',
    category: 'Tools',
  },
]

const docs = ['Getting Started', 'How-to Guides', 'FAQ', 'Troubleshooting', 'API Documentation']

const videos = [
  'Platform Overview (3 min)',
  'Student: Profile Setup (5 min)',
  'Student: Finding Internships (4 min)',
  'Student: Applying for Jobs (3 min)',
  'Employer: Posting a Job (4 min)',
  'Employer: Screening Candidates (5 min)',
  'Employer: Managing Applications (4 min)',
  'AI Copilot How-to (6 min)',
]

const webinars = [
  'Monthly: Career Tips Webinar (1st Tuesday)',
  'Monthly: For Employers Webinar (2nd Thursday)',
  'Quarterly: AI Trends in Hiring',
  'Annual: Platform Roadmap and Features',
  'On-Demand: Previous webinar recordings',
]

const toolCards = [
  'Salary Calculator',
  'Career Path Planner',
  'Skill Gap Analyzer',
  'Internship ROI Calculator',
  'Job Match Score Calculator',
]

const communityItems = [
  'FAQ section (50+ questions)',
  'Discussion forums',
  'Live chat support (business hours)',
  'Email support: support@platform.com',
  'Knowledge base (500+ articles)',
  'Community feedback and feature requests',
]

export function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('For Students')
  const [query, setQuery] = useState('')
  const isAuthenticated = isUserAuthenticated()

  const filteredResources = useMemo(
    () =>
      resourceCards.filter((item) => {
        const inCategory = item.category === activeCategory
        const inQuery =
          query.trim().length === 0 ||
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())

        return inCategory && inQuery
      }),
    [activeCategory, query],
  )

  return (
    <main className="pb-10">
      <section className="mx-auto w-full max-w-6xl px-4 pb-8 pt-14 md:pt-20">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm md:p-8">
          <span className="chip">Resources</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Access Our Complete Resource Library
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Everything you need: templates, guides, tutorials, webinars, tools, and support resources for students and employers.
          </p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search resources, guides, tools, or tutorials..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <SectionHeading eyebrow="Resource categories" title="Choose a category to quickly find what you need" />
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = category === activeCategory

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-glow'
                    : 'border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <SectionHeading
          eyebrow="Resource cards"
          title={`${filteredResources.length} materials in ${activeCategory}`}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="mb-3 h-10 w-10 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100" />
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  {item.type}
                </span>
                <button className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-700">
                  Download
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <SectionHeading eyebrow="Documentation and help" title="Knowledge base and setup documentation" />
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Home / Resources / Documentation
          </p>
          <ul className="mt-3 grid gap-2">
            {docs.map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <SectionHeading eyebrow="Video tutorials" title="Watch and learn platform workflows" />
          <div className="grid gap-2">
            {videos.map((video) => (
              <article key={video} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {video}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <SectionHeading eyebrow="Webinars and events" title="Join live sessions and on-demand recordings" />
          <div className="grid gap-2">
            {webinars.map((item) => (
              <article key={item} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <span className="text-sm text-slate-700">{item}</span>
                <button className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700">
                  Register
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <SectionHeading eyebrow="Tools and calculators" title="Interactive tools for smarter decisions" />
          <div className="grid gap-2 sm:grid-cols-2">
            {toolCards.map((tool) => (
              <article key={tool} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700">
                {tool}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <SectionHeading eyebrow="Community and support" title="Need more help? We are here for you" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Community resources</h3>
            <ul className="mt-3 grid gap-2">
              {communityItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Contact support</h3>
            <p className="mt-2 text-sm text-slate-600">Still need help? Contact our team and we will get back quickly.</p>
            <form className="mt-4 grid gap-3">
              <input
                type="text"
                placeholder="Your name"
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
              />
              <input
                type="email"
                placeholder="Email address"
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
              />
              <textarea
                rows="4"
                placeholder="How can we help?"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none ring-blue-300 transition focus:ring"
              />
              <button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 font-bold text-white shadow-glow transition hover:-translate-y-0.5">
                Send Request
              </button>
            </form>
            <p className="mt-3 text-xs font-medium text-slate-500">Live chat available during business hours.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-10 text-white shadow-2xl md:flex md:items-center md:justify-between md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-100">Explore more</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
              40+ resources and growing for students and employers
            </h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Link to={isAuthenticated ? '/ai-copilot' : '/signup'} className="rounded-full bg-white px-5 py-3 font-bold text-slate-900 transition hover:-translate-y-0.5">
              {isAuthenticated ? 'Explore AI Copilot' : 'Get Started'}
            </Link>
            <Link
              to={isAuthenticated ? '/profile' : '/login'}
              className="rounded-full border border-white/40 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
