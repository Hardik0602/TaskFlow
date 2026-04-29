import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to='/login' replace />
  }
  if (!allowedRoles.includes(user.role)) {
    if (user.role === 'admin') {
      return <Navigate to='/admin' replace />
    } else {
      return <Navigate to='/' replace />
    }
  }
  return children
}
export default RoleProtectedRoute
