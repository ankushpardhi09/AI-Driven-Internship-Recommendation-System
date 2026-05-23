import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiClient } from '../api/apiClient'

function RecommendationCard({ item, sourceLabel }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          {sourceLabel && <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">{sourceLabel}</p>}
          <h3 className="mt-1 text-lg font-bold text-slate-900">{item.title}</h3>
        </div>
        {typeof item.match_score === 'number' && (
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            {(item.match_score * 100).toFixed(0)}% fit
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-slate-600">{item.summary || item.content || 'Open this listing to learn more.'}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
        {item.seats_available !== undefined && <span>Seats: {item.seats_available}</span>}
        {item.score !== undefined && <span>Score: {Number(item.score).toFixed(2)}</span>}
        {item.url && (
          <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-800">
            Open source
          </a>
        )}
      </div>
    </article>
  )
}

export function AICopilotPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState(null)
  const [localRecommendations, setLocalRecommendations] = useState([])
  const [webRecommendations, setWebRecommendations] = useState([])
  const [webSummary, setWebSummary] = useState('')

  const loadRecommendations = async (query = '') => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('Please log in to generate internship recommendations.')
      setLocalRecommendations([])
      setWebRecommendations([])
      setWebSummary('')
      setProfile(null)
      return
    }

    try {
      setLoading(true)
      setError('')
      const result = await apiClient.getCopilotRecommendations(token, 6, query)
      setProfile(result.student || null)
      setLocalRecommendations(result.local_recommendations || [])
      setWebRecommendations(result.web_recommendations || [])
      setWebSummary(result.web_summary || '')
    } catch (err) {
      setError(err.message || 'Failed to load internship recommendations.')
      setLocalRecommendations([])
      setWebRecommendations([])
      setWebSummary('')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecommendations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    await loadRecommendations(searchTerm)
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-14 md:pb-20 md:pt-20">
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm md:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">AI Copilot</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">Search jobs and get internship recommendations</h1>
          <p className="mt-4 text-lg text-slate-600">
            Search by role, skill, or company. Results are ranked from your student profile and enriched with Tavily web search when enabled.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search jobs, internships, or skills"
            className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-slate-800 outline-none ring-blue-300 transition focus:ring"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-bold text-white shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Searching...' : 'Search Jobs'}
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-semibold">Profile-based ranking</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-semibold">Seat-aware local matches</span>
        </div>

        {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}
      </section>

      <section className="mt-8 grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                {profile?.name ? `${profile.name}'s matches` : 'Your matches'}
              </h2>
            </div>
            <p className="text-sm text-slate-600">{profile?.preferences || 'Updated automatically from the student profile.'}</p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {localRecommendations.map((item) => (
              <RecommendationCard key={item.internship_id} item={item} sourceLabel={`Rank #${item.rank}`} />
            ))}

            {!loading && localRecommendations.length === 0 && (
              <p className="text-sm text-slate-500">No local internship cards yet. Update your profile to generate matches.</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">Recommended internships</p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900">Live job search cards</h2>
            </div>
            <p className="text-sm text-slate-600">{webSummary || 'Search by keyword to see live web results.'}</p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {webRecommendations.map((item) => (
              <RecommendationCard key={item.url || item.title} item={item} sourceLabel="" />
            ))}

            {!loading && webRecommendations.length === 0 && (
              <p className="text-sm text-slate-500">No web results yet. Try searching for a job title or skill.</p>
            )}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-8 text-white shadow-2xl md:flex md:items-center md:justify-between md:px-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">Profile sync</p>
          <h2 className="mt-2 text-2xl font-extrabold md:text-4xl">Update your profile and the cards refresh automatically</h2>
        </div>
        <Link to="/profile" className="mt-5 rounded-full bg-white px-5 py-3 font-bold text-slate-900 transition hover:-translate-y-0.5 md:mt-0">
          Open Profile
        </Link>
      </section>
    </main>
  )
}
