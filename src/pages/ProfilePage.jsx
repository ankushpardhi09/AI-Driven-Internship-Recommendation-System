import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { apiClient } from '../api/apiClient'

export function ProfilePage() {
  const [profile, setProfile] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [skills, setSkills] = useState('')
  const [gpa, setGpa] = useState('')
  const [preferences, setPreferences] = useState('')
  const [college, setCollege] = useState('')
  const [city, setCity] = useState('')
  const [resumeUrl, setResumeUrl] = useState('')
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('')
  const [experienceYears, setExperienceYears] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [recommendations, setRecommendations] = useState([])
  const [recommendationsLoading, setRecommendationsLoading] = useState(false)
  const [recommendationsError, setRecommendationsError] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const navigate = useNavigate()

  const loadProfile = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      setLoading(true)
      setError('')
      const result = await apiClient.getProfile(token)
      const user = result.user

      setProfile(user)
      setEmail(user.email || '')

      if (user.role === 'student') {
        setName(user.name || '')
        setSkills(Array.isArray(user.skills) ? user.skills.join(', ') : '')
        setGpa(user.gpa ?? '')
        setPreferences(user.preferences || '')
        setCollege(user.college || '')
        setCity(user.city || '')
        setResumeUrl(user.resume_url || '')
        setProfilePhotoUrl(user.profile_photo_url || '')
        setExperienceYears(user.experience_years ?? 0)
      } else {
        setCompanyName(user.company_name || '')
        setCompanyEmail(user.company_email || '')
      }

      if (user.role === 'student') {
        await loadRecommendations(token)
      } else {
        setRecommendations([])
        setRecommendationsError('')
      }
    } catch (err) {
      if (String(err.message).includes('HTTP 401')) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
        return
      }

      setError(err.message || 'Failed to load profile.')
    } finally {
      setLoading(false)
    }
  }

  const loadRecommendations = async (token) => {
    try {
      setRecommendationsLoading(true)
      setRecommendationsError('')
      const result = await apiClient.getCopilotRecommendations(token, 5)
      setRecommendations(result.local_recommendations || [])
    } catch (err) {
      setRecommendations([])
      setRecommendationsError(err.message || 'Failed to load recommendations.')
    } finally {
      setRecommendationsLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    setSaving(true)
    setError('')
    setSuccessMessage('')

    try {
      if (!email.trim()) {
        throw new Error('Email is required.')
      }

      let payload

      if (profile?.role === 'student') {
        const parsedSkills = skills
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)

        if (!name.trim()) {
          throw new Error('Full name is required.')
        }

        if (!parsedSkills.length) {
          throw new Error('Please add at least one skill.')
        }

        payload = {
          name,
          email,
          skills: parsedSkills,
          gpa: gpa === '' ? 0 : Number(gpa),
          preferences,
          college,
          city,
          profile_photo_url: profilePhotoUrl,
          experience_years: experienceYears === '' ? 0 : Number(experienceYears),
        }

        if (resumeUrl.trim()) {
          payload.resume_url = resumeUrl.trim()
        }
      } else {
        if (!companyName.trim() || !companyEmail.trim()) {
          throw new Error('Company name and company email are required.')
        }

        payload = {
          email,
          company_name: companyName,
          company_email: companyEmail,
        }
      }

      const result = await apiClient.updateProfile(token, payload)
      setProfile(result.user)
      localStorage.setItem('user', JSON.stringify(result.user))
      setSuccessMessage('Profile updated successfully.')

      if (result.user.role === 'student') {
        await loadRecommendations(token)
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  const handlePhotoUpload = async (e) => {
    const token = localStorage.getItem('token')
    const file = e.target.files?.[0]

    if (!token || !file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Profile photo must be JPG, PNG, or WEBP.')
      return
    }

    try {
      setUploadingPhoto(true)
      setError('')
      setSuccessMessage('')
      const result = await apiClient.uploadProfilePhoto(token, file)
      const updatedUser = result.user
      setProfile(updatedUser)
      setProfilePhotoUrl(updatedUser.profile_photo_url || result.file_url || '')
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setSuccessMessage('Profile photo uploaded successfully.')

      if (updatedUser.role === 'student') {
        await loadRecommendations(token)
      }
    } catch (err) {
      setError(err.message || 'Failed to upload profile photo.')
    } finally {
      setUploadingPhoto(false)
      e.target.value = ''
    }
  }

  const handleResumeUpload = async (e) => {
    const token = localStorage.getItem('token')
    const file = e.target.files?.[0]

    if (!token || !file) return

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (!allowedTypes.includes(file.type)) {
      setError('Resume must be PDF, DOC, or DOCX.')
      return
    }

    try {
      setUploadingResume(true)
      setError('')
      setSuccessMessage('')
      const result = await apiClient.uploadResume(token, file)
      const updatedUser = result.user
      setProfile(updatedUser)
      setResumeUrl(updatedUser.resume_url || result.file_url || '')
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setSuccessMessage('Resume uploaded successfully.')

      if (updatedUser.role === 'student') {
        await loadRecommendations(token)
      }
    } catch (err) {
      setError(err.message || 'Failed to upload resume.')
    } finally {
      setUploadingResume(false)
      e.target.value = ''
    }
  }

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-14 md:pb-20 md:pt-20">
        <p className="text-slate-700">Loading profile...</p>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-14 md:pb-20 md:pt-20">
      <section className="grid items-start gap-8 lg:grid-cols-[1fr_520px]">
        <PageHero
          eyebrow="Profile"
          title="Manage your account"
          description="View and edit your saved profile details. Upload profile photo and resume files directly."
        />

        <form onSubmit={handleSubmit} className="glass grid gap-4 rounded-3xl p-6 shadow-xl shadow-slate-900/5">
          {error && <p className="text-red-600">{error}</p>}
          {successMessage && <p className="text-green-700">{successMessage}</p>}

          <p className="text-sm font-semibold text-slate-700">Role: {profile?.role}</p>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3"
              required
            />
          </label>

          {profile?.role === 'student' && (
            <>
              <div className="grid gap-2 text-sm font-semibold text-slate-700">
                <span>Profile photo</span>
                {profilePhotoUrl ? (
                  <img
                    src={profilePhotoUrl}
                    alt="Profile"
                    className="h-24 w-24 rounded-full border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="grid h-24 w-24 place-items-center rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-500">
                    No photo
                  </div>
                )}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handlePhotoUpload}
                  className="block text-sm font-normal text-slate-700"
                />
                <p className="text-xs font-normal text-slate-500">
                  {uploadingPhoto ? 'Uploading photo...' : 'Accepted: JPG, PNG, WEBP'}
                </p>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Full name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Skills (comma separated)
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                GPA
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Preferences
                <input
                  type="text"
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                College
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                City
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Upload resume
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="block text-sm font-normal text-slate-700"
                />
                <p className="text-xs font-normal text-slate-500">
                  {uploadingResume ? 'Uploading resume...' : 'Accepted: PDF, DOC, DOCX'}
                </p>
              </label>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  Open current resume
                </a>
              )}

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Experience years
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3"
                />
              </label>
            </>
          )}

          {profile?.role === 'employer' && (
            <>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Company name
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Company email
                <input
                  type="email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3"
                  required
                />
              </label>
            </>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-bold text-white disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>

        </form>
      </section>

      {profile?.role === 'student' && (
        <section className="mt-8 grid gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">Recommended internships</p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900">Updated automatically from your profile</h2>
              </div>
              <p className="text-sm text-slate-600">{recommendationsLoading ? 'Refreshing matches...' : 'Matches based on your saved profile and seat availability.'}</p>
            </div>

            {recommendationsError && <p className="mt-4 text-sm font-semibold text-red-600">{recommendationsError}</p>}

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {recommendations.map((item) => (
                <article key={item.internship_id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">Rank #{item.rank}</p>
                      <h3 className="mt-1 text-lg font-bold text-slate-900">{item.title}</h3>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                      {(item.match_score * 100).toFixed(0)}% fit
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">Seats available: {item.seats_available}</p>
                  <p className="mt-2 text-sm text-slate-500">Auto-updated when your profile changes.</p>
                </article>
              ))}

              {!recommendationsLoading && recommendations.length === 0 && !recommendationsError && (
                <p className="text-sm text-slate-500">No recommendations yet. Update your student profile to generate internship cards.</p>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
