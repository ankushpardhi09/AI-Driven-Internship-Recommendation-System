import { Navigate } from 'react-router-dom'
import { hasStoredAuthSession } from '../utils/auth'

export function PublicOnlyRoute({ children, redirectTo = '/' }) {
  if (hasStoredAuthSession()) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}
