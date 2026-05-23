import { Navigate } from 'react-router-dom'
import { hasStoredAuthSession } from '../utils/auth'

export function ProtectedRoute({ children }) {
  if (!hasStoredAuthSession()) {
    return <Navigate to="/login" replace />
  }

  return children
}
