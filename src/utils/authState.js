export function getCurrentUser() {
  try {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  } catch {
    return null
  }
}

export function isUserAuthenticated() {
  const token = localStorage.getItem('token')
  return Boolean(token && getCurrentUser())
}