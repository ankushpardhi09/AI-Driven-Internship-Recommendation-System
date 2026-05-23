import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { apiClient } from '../api/apiClient'
import { isUserAuthenticated } from '../utils/authState'

export function SignUpPage() {
  const [role, setRole] = useState('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [skills, setSkills] = useState('')
  const [gpa, setGpa] = useState('')
  const [preferences, setPreferences] = useState('')
  const [college, setCollege] = useState('')
  const [city, setCity] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
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
    setSuccessMessage('')

    try {
      let result

      if (role === 'student') {
        const parsedSkills = skills
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)

        result = await apiClient.registerStudent({
          name,
          email,
          password,
          skills: parsedSkills,
          gpa: gpa ? Number(gpa) : 0,
          preferences,
          college,
          city,
        })
      } else {
        result = await apiClient.registerEmployer({
          email,
          password,
          company_name: companyName,
          company_email: companyEmail,
        })
      }

      localStorage.setItem('token', result.token)
      localStorage.setItem('user', JSON.stringify(result))
      setSuccessMessage('Account created successfully. Redirecting...')
      navigate('/')
    } catch (err) {
      setError(err.message || 'Sign up failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-14 md:pb-20 md:pt-20">
      <section className="grid items-start gap-8 lg:grid-cols-[1fr_420px]">
        <PageHero
          eyebrow="Sign Up"
          title="Create your account"
          description="Join the platform to get matched with internships that fit your skills and goals."
        />
        <form onSubmit={handleSubmit} className="glass grid gap-4 rounded-3xl p-6 shadow-xl shadow-slate-900/5">
          {error && <p className="text-red-600">{error}</p>}
          {successMessage && <p className="text-green-700">{successMessage}</p>}

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

          {role === 'student' && (
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
                type="text"
                placeholder="Your name"
                required
              />
            </label>
          )}

          {role === 'student' && (
            <>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Email
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Skills (comma separated)
                <input
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
                  type="text"
                  placeholder="python, react, sql"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                GPA (optional)
                <input
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  placeholder="8.2"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Preferences (optional)
                <input
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
                  type="text"
                  placeholder="Remote, backend roles"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                College (optional)
                <input
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
                  type="text"
                  placeholder="ABC Engineering College"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                City (optional)
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
                  type="text"
                  placeholder="Pune"
                />
              </label>
            </>
          )}

          {role === 'employer' && (
            <>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Company name
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
                  type="text"
                  placeholder="Acme Corp"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Company email
                <input
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
                  type="email"
                  placeholder="hr@company.com"
                  required
                />
              </label>
            </>
          )}

          {role === 'employer' && (
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Login email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
                type="email"
                placeholder="login@company.com"
                required
              />
            </label>
          )}

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
              type="password"
              placeholder="Create a password"
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link className="font-bold text-blue-700" to="/login">
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}
