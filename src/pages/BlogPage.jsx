import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BLOG_CATEGORIES, BLOG_POSTS, FEATURED_POSTS } from '../api/blogData'
import { SectionHeading } from '../components/SectionHeading'

export function BlogPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(12)

  const categoriesWithAll = useMemo(
    () => [{ name: 'All', count: BLOG_POSTS.length }, ...BLOG_CATEGORIES],
    [],
  )

  const filteredPosts = useMemo(
    () =>
      BLOG_POSTS.filter((post) => {
        const categoryMatch = activeCategory === 'All' || post.category === activeCategory
        const queryMatch =
          query.trim().length === 0 ||
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase())

        return categoryMatch && queryMatch
      }),
    [activeCategory, query],
  )

  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const popularPosts = BLOG_POSTS.slice(5, 10)

  return (
    <main className="pb-10">
      <section className="mx-auto w-full max-w-6xl px-4 pb-8 pt-14 md:pt-20">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm md:p-8">
          <span className="chip">Blog</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">Career Insights and Tips</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Thought leadership, practical guides, and product updates to help students and employers make better internship decisions.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles by title or topic"
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
            />
            <div className="flex flex-wrap gap-2">
              {categoriesWithAll.slice(0, 4).map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategory(cat.name)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                    activeCategory === cat.name
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                      : 'border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <SectionHeading eyebrow="Featured articles" title="Top reads this week" />
        <div className="grid gap-4 md:grid-cols-2">
          {FEATURED_POSTS.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm">
              <div className="h-40 bg-gradient-to-r from-blue-600/80 via-indigo-500/75 to-cyan-500/80 p-4 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.15em]">{post.category}</p>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight">{post.title}</h2>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-600">{post.excerpt}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {post.author.name} • {post.date} • {post.readTime}
                </p>
                <Link to={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-bold text-blue-700">
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm lg:sticky lg:top-24 lg:h-fit">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Categories</h3>
          <div className="mt-3 grid gap-2">
            {categoriesWithAll.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.name)
                  setVisibleCount(12)
                }}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  activeCategory === cat.name
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-xs text-slate-500">{cat.count}</span>
              </button>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Popular posts</h3>
          <div className="mt-3 grid gap-2">
            {popularPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                {post.title}
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">About the author team</p>
            <p className="mt-2 text-sm text-slate-600">
              Career advisors, AI researchers, and employer success experts writing practical internship insights.
            </p>
          </div>
        </aside>

        <div>
          <SectionHeading eyebrow="Blog posts" title={`${filteredPosts.length} articles found`} />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visiblePosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div className="mb-3 h-24 rounded-2xl bg-gradient-to-r from-blue-100 to-cyan-100 p-3">
                  <span className="rounded-full border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-600">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {post.author.name} • {post.date} • {post.readTime}
                </p>
                <Link to={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-bold text-blue-700">
                  Read more
                </Link>
              </article>
            ))}
          </div>

          {visibleCount < filteredPosts.length && (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + 12)}
                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-10 text-white shadow-2xl md:flex md:items-center md:justify-between md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-100">Newsletter</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">Get weekly career tips</h2>
          </div>
          <form className="mt-5 flex w-full max-w-md gap-2 md:mt-0">
            <input
              type="email"
              placeholder="Email address"
              className="h-11 flex-1 rounded-full border border-white/40 bg-white/95 px-4 text-slate-900 outline-none"
            />
            <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
