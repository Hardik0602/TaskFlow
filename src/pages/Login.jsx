import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaCircleNotch, FaEye, FaEyeSlash } from 'react-icons/fa'
const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const handle = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      const user = login(email, password)
      if (user) {
        if (user.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      } else {
        toast.error('Invalid credentials')
        setIsLoading(false)
      }
    }, 800)
  }
  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-lg shadow-sm border border-slate-200 p-8'>
          <div className='mb-8'>
            <h1 className='text-2xl font-bold text-slate-900 mb-2'>Sign In</h1>
            <p className='text-slate-600 text-sm'>Enter your credentials to access your account</p>
          </div>
          <form onSubmit={handle} className='space-y-5'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Email Address
              </label>
              <input
                type='email'
                className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-slate-900 placeholder-slate-400'
                placeholder='name@company.com'
                value={email}
                required
                onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <div className='flex items-center justify-between mb-2'>
                <label className='block text-sm font-medium text-slate-700'>
                  Password
                </label>
                {/* <a href='#' className='text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200'>
                  Forgot password?
                </a> */}
              </div>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-slate-900 placeholder-slate-400 pr-11'
                  placeholder='Enter your password'
                  value={password}
                  required
                  onChange={e => setPassword(e.target.value)} />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition'>
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>
            {/* <div className='flex items-center'>
              <input
                type='checkbox'
                id='remember'
                className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500'
              />
              <label htmlFor='remember' className='ml-2 text-sm text-slate-700 cursor-pointer'>
                Keep me signed in
              </label>
            </div> */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full cursor-pointer py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] transition-all duration-150'>
              {isLoading ? (
                <span className='flex items-center justify-center'>
                  <FaCircleNotch
                    size={16}
                    className='animate-spin -ml-1 mr-2' />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login