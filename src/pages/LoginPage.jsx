import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { apiClient } from '../api/apiClient'
import { isUserAuthenticated } from '../utils/authState'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (isUserAuthenticated()) {
      navigate('/profile', { replace: true })
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await apiClient.login(email, password, role)

      // Save token and user details for authenticated requests.
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', JSON.stringify(result))

      // Redirect to an existing route until a dedicated dashboard is added.
      navigate('/')
    } catch (err) {
      setError(err.message || 'Connection error. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-14 md:pb-20 md:pt-20">
      <section className="grid items-start gap-8 lg:grid-cols-[1fr_420px]">
        <PageHero
          eyebrow="Login"
          title="Welcome back"
          description="Sign in to continue reviewing matches, applications, and placement updates."
        />
        <form onSubmit={handleSubmit} className="glass grid gap-4 rounded-3xl p-6 shadow-xl shadow-slate-900/5">
          {error && <p className="text-red-600">{error}</p>}
          
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Role
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3"
            >
              <option value="student">Student</option>
              <option value="employer">Employer</option>
            </select>
          </label>
          
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 rounded-xl border border-slate-200 bg-white px-3"
            />
          </label>
          
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-11 rounded-xl border border-slate-200 bg-white px-3"
            />
          </label>
          
          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-bold text-white disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <p className="text-sm text-slate-600">
            New here?{' '}
            <Link className="font-bold text-blue-700" to="/signup">
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}