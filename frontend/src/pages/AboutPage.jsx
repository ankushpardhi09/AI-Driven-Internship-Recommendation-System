import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { isUserAuthenticated } from '../utils/authState'

const missionCards = [
  {
    title: 'Mission',
    detail: 'Connect top talent with the right opportunities through transparent AI-guided matching.',
  },
  {
    title: 'Vision',
    detail: 'Make internship placement fair, efficient, and outcome-driven for every student and employer.',
  },
  {
    title: 'Promise',
    detail: 'Deliver measurable improvement in match quality, hiring speed, and career growth outcomes.',
  },
  {
    title: 'Commitment',
    detail: 'Build responsible AI systems with explainability, trust, and student-first design principles.',
  },
]

const coreValues = [
  {
    name: 'Transparency',
    desc: 'Open and honest communication with students, employers, and institutions.',
  },
  {
    name: 'Innovation',
    desc: 'Continuously improving AI models, workflows, and platform capabilities.',
  },
  {
    name: 'Fairness',
    desc: 'Equal opportunity and unbiased recommendations for all learners.',
  },
  {
    name: 'Impact',
    desc: 'Decisions and features are measured against real placement outcomes.',
  },
]

const teamMembers = [
  {
    initials: 'AR',
    name: 'Aarav Rao',
    role: 'Founder & CEO',
    bio: 'Built the company to solve inefficiencies in campus hiring and create fair opportunity pathways.',
  },
  {
    initials: 'NK',
    name: 'Nisha Kapoor',
    role: 'CTO',
    bio: 'Leads AI architecture, matching intelligence, and platform reliability at scale.',
  },
  {
    initials: 'VT',
    name: 'Vikram Taneja',
    role: 'Head of Product',
    bio: 'Designs recruiter and student workflows focused on conversion, clarity, and speed.',
  },
  {
    initials: 'SM',
    name: 'Sara Mehta',
    role: 'Head of Marketing',
    bio: 'Drives brand communication, partnerships, and growth across institutions and employers.',
  },
]

const milestones = [
  '2024 Q1 - Platform launch (100 users)',
  '2024 Q2 - First 50 employers onboarded',
  '2024 Q3 - AI model v2.0 released',
  '2024 Q4 - 10,000 students active',
  '2025 Q1 - Expanded to 3 countries',
  '2026 - Targeting 100,000+ placements',
]

const awards = ['Best EdTech Startup 2025', 'AI Innovation Award', 'ISO Certified', 'Campus Excellence Partner']

const differentiators = [
  'AI-first matching with explainable fit signals',
  'Transparent recommendations instead of black-box ranking',
  'Fast allocation workflows for students and employers',
  'Measurable analytics tied to placement outcomes',
]

const press = ['TechCrunch', 'LinkedIn News', 'YourStory', 'Economic Times', 'Startup India', 'EdTech Review']

export function AboutPage() {
  const isAuthenticated = isUserAuthenticated()

  return (
    <main className="pb-10">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-10 pt-14 md:grid-cols-2 md:pt-20">
        <div>
          <span className="chip">About Us</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Revolutionizing Internship Matching with AI
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Founded in 2024, we started with one goal: fix inefficient internship hiring and make placement
            outcomes faster, fairer, and more transparent.
          </p>
          <p className="mt-3 text-slate-600">
            Today, we help students, employers, and institutions move from manual processes to intelligent,
            trust-first career matching.
          </p>
        </div>

        <div className="glass rounded-3xl p-6 shadow-xl shadow-slate-900/10">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-700">Our mission and vision</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-900">Building a fair and efficient placement ecosystem</h2>
          <p className="mt-3 text-slate-600">
            We combine responsible AI, transparent scoring, and human-centered product design to help every
            stakeholder make better internship decisions.
          </p>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-700">Company snapshot</p>
            <p className="mt-2 text-sm text-slate-600">2024 launch • 10,000+ active students • 500+ employer partners</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="Our story" title="From placement inefficiency to AI-powered opportunity" />
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Why we started</h3>
            <p className="mt-3 text-slate-600">
              Internship recruitment was fragmented, slow, and often biased by incomplete visibility. Students
              struggled to find relevant opportunities while employers spent too much time screening mismatched
              applications.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">What we changed</h3>
            <p className="mt-3 text-slate-600">
              We built an AI-first platform that extracts profile intelligence, predicts fit, and recommends the
              right opportunities with transparent reasoning. The result is better quality placements and faster hiring cycles.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="Mission and values" title="Our principles guide every product and model decision" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {missionCards.map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-blue-700">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((value) => (
            <article key={value.name} className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm">
              <div className="mb-3 h-9 w-9 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100" />
              <h3 className="text-base font-bold text-slate-900">{value.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{value.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="Our team" title="People building the future of internship placement" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <article key={member.name} className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-lg font-bold text-white">
                {member.initials}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
              <p className="mt-1 text-sm font-semibold text-blue-700">{member.role}</p>
              <p className="mt-2 text-sm text-slate-600">{member.bio}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Team structure: Founders (2), Engineering (5), Product and Design (3), Sales and Marketing (2), Support (2).
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="Company milestones" title="Our journey from launch to global placement impact" />
        <div className="grid gap-3">
          {milestones.map((milestone) => (
            <article key={milestone} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-500" />
              <p className="text-sm font-semibold text-slate-700">{milestone}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-12 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <SectionHeading eyebrow="Awards and recognition" title="Recognition for innovation and trust" />
          <div className="grid gap-2 sm:grid-cols-2">
            {awards.map((award) => (
              <span key={award} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                {award}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <SectionHeading eyebrow="Why we are different" title="A competitive edge built on trust and speed" />
          <ul className="grid gap-2">
            {differentiators.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="Media and press" title="Featured by leading tech and startup publications" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {press.map((item) => (
            <article key={item} className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-center text-sm font-bold text-slate-700 shadow-sm">
              {item}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-10 text-white shadow-2xl md:flex md:items-center md:justify-between md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-100">Contact and CTA</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">Join our mission to transform internship placement</h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Link to={isAuthenticated ? '/ai-copilot' : '/signup'} className="rounded-full bg-white px-5 py-3 font-bold text-slate-900 transition hover:-translate-y-0.5">
              {isAuthenticated ? 'Explore AI Copilot' : 'Join Our Mission'}
            </Link>
            <Link
              to="/resources"
              className="rounded-full border border-white/40 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
