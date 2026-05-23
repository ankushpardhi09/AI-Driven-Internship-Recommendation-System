import { Link, useParams } from 'react-router-dom'
import { getPostBySlug, getRelatedPosts } from '../api/blogData'

export function BlogArticlePage() {
  const { slug } = useParams()
  const article = getPostBySlug(slug)

  if (!article) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-20">
        <h1 className="text-3xl font-extrabold text-slate-900">Article not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-sm font-bold text-blue-700">
          Back to Blog
        </Link>
      </main>
    )
  }

  const relatedPosts = getRelatedPosts(article.category, article.slug)

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-14 md:pt-20">
      <article className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">{article.category}</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
          5 Skills Every Intern Should Have in 2026
        </h1>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
          {article.author.name} • {article.date} • {article.readTime}
        </p>

        <div className="mt-6 h-56 rounded-3xl bg-gradient-to-r from-blue-500/80 to-cyan-500/80" />

        <div className="mt-8 space-y-5 text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-900">Introduction</h2>
            <p className="mt-2">
              Internship hiring in 2026 rewards candidates who combine technical fundamentals with professional
              adaptability. These five skills consistently improve interview performance and role conversion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Skill 1: Communication</h2>
            <p className="mt-2">Clear communication helps interns collaborate better and execute with fewer misunderstandings.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Skill 2: Problem Solving</h2>
            <p className="mt-2">Hiring teams value candidates who can break down unclear tasks into practical solution paths.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Skill 3: Time Management</h2>
            <p className="mt-2">Prioritizing tasks and meeting deadlines is essential in high-pace internship environments.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Skill 4: Teamwork</h2>
            <p className="mt-2">Interns are expected to work cross-functionally and contribute responsibly in shared workflows.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Skill 5: Adaptability</h2>
            <p className="mt-2">Strong candidates learn quickly, accept feedback, and adapt to changing priorities.</p>
          </section>

          <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-cyan-700">Key takeaways</h3>
            <ul className="mt-2 grid gap-1 text-sm">
              <li>Focus on communication and teamwork in interviews.</li>
              <li>Show examples of problem solving and adaptability.</li>
              <li>Use measurable outcomes when describing past work.</li>
            </ul>
          </section>
        </div>
      </article>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Author bio</h2>
        <div className="mt-3 flex items-start gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-bold text-white">
            JD
          </div>
          <div>
            <p className="font-semibold text-slate-900">{article.author.name}</p>
            <p className="text-sm text-slate-600">{article.author.title}</p>
            <p className="mt-2 text-sm text-slate-700">
              Writes about career growth, internship readiness, and AI-driven hiring trends.
            </p>
            <div className="mt-2 flex gap-3 text-xs font-semibold text-blue-700">
              <span>LinkedIn</span>
              <span>Twitter</span>
              <span>Email</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Related articles</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {relatedPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700">
              {post.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Share</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700">LinkedIn</button>
          <button className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700">Twitter</button>
          <button className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700">Email</button>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Comments (optional)</h2>
        <p className="mt-2 text-sm text-slate-600">Leave a comment and share your internship experience.</p>
        <form className="mt-3 grid gap-2">
          <input
            type="text"
            placeholder="Your name"
            className="h-10 rounded-xl border border-slate-200 px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
          />
          <textarea
            rows="4"
            placeholder="Leave a comment"
            className="rounded-xl border border-slate-200 px-3 py-2 text-slate-800 outline-none ring-blue-300 transition focus:ring"
          />
          <button className="w-fit rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
            Post Comment
          </button>
        </form>
      </section>
    </main>
  )
}
