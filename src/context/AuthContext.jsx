import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_URL } from '../config'
const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const getUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`)
      const data = await res.json()
      return data
    } catch (error) {
      console.log(error)
      return []
    }
  }
  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem('user') ||
      sessionStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const login = (email, password, keepSignedIn, users) => {
    if (users.length === 0) {
      toast.error('Something went wrong')
      return null
    }
    const found = users.find(
      u => u.email === email && u.password === password
    )
    if (!found) {
      toast.error('Invalid Credentials')
      return null
    }
    if (keepSignedIn) {
      localStorage.setItem('user', JSON.stringify(found))
    } else {
      sessionStorage.setItem('user', JSON.stringify(found))
    }
    setUser(found)
    return found
  }
  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, getUsers }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)