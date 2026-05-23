const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

async function request(path, options = {}) {
  let response
  const isFormData = options.body instanceof FormData
  const mergedHeaders = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {}),
  }

  try {
    response = await fetch(`${API_BASE}${path}`, {
      headers: mergedHeaders,
      ...options,
    })
  } catch {
    throw new Error('Unable to reach backend API. Make sure backend is running on port 5000.')
  }

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json')
    ? await response.json()
    : { error: await response.text() }

  if (!response.ok) {
    const rawError = typeof data.error === 'string' ? data.error : ''
    if (
      response.status === 500 &&
      /ECONNREFUSED|proxy|connect/i.test(rawError)
    ) {
      throw new Error('Backend API is not running. Start backend on port 5000 and try again.')
    }

    const fallbackMessage = `Request failed (HTTP ${response.status})`
    throw new Error(data.error || fallbackMessage)
  }

  return data
}

export const apiClient = {
  // Auth endpoints
  registerStudent: async (data) => {
    return request('/auth/register/student', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  registerEmployer: async (data) => {
    return request('/auth/register/employer', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  login: async (email, password, role) => {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    })
  },

  verifyToken: async (token) => {
    return request('/auth/verify', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  getProfile: async (token) => {
    return request('/auth/profile', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  updateProfile: async (token, data) => {
    return request('/auth/profile', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    })
  },

  uploadProfilePhoto: async (token, file) => {
    const body = new FormData()
    body.append('file', file)

    return request('/auth/profile/upload/photo', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body,
    })
  },

  uploadResume: async (token, file) => {
    const body = new FormData()
    body.append('file', file)

    return request('/auth/profile/upload/resume', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body,
    })
  },

  // Recommendations endpoint
  getRecommendations: async (token, top_n = 10) => {
    return request(`/recommendations?top_n=${top_n}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  getCopilotRecommendations: async (token, top_n = 5, query = '') => {
    const searchParams = new URLSearchParams({ top_n: String(top_n) })
    if (query.trim()) {
      searchParams.set('q', query.trim())
    }

    return request(`/copilot/recommendations?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}