const AUTH_ROLES = new Set(['student', 'employer', 'employee'])

export function getStoredUser() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const userData = window.localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  } catch {
    return null
  }
}

export function hasStoredAuthSession() {
  if (typeof window === 'undefined') {
    return false
  }

  const token = window.localStorage.getItem('token')
  const user = getStoredUser()

  if (!token || !user) {
    return false
  }

  const role = typeof user.role === 'string' ? user.role.toLowerCase() : ''
  return role === '' || AUTH_ROLES.has(role)
}
