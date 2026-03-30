import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BsBarChart, BsPeople, BsFileText } from 'react-icons/bs'
import { IoPersonOutline } from 'react-icons/io5'
import { FaCaretDown } from 'react-icons/fa'
import { PiSignOut } from 'react-icons/pi'
import { RxHamburgerMenu } from 'react-icons/rx'
const AdminNavBar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileView, setMobileView] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  const currentPage = ({ isActive }) =>
    isActive
      ? 'flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md active:scale-[0.98] transition-all duration-150'
      : 'flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md active:scale-[0.98] transition-all duration-150'
  return (
    <nav className='bg-white border-b border-slate-200 sticky top-0 z-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <h1 className='text-xl font-bold text-indigo-600 cursor-not-allowed'>TaskFlow <span className='text-xs text-indigo-700 bg-indigo-100 p-0.5 rounded'>Admin Pannel</span></h1>
          <div className='hidden md:flex items-center space-x-1'>
            <NavLink to='/admin' end className={currentPage}>
              <BsBarChart size={18} />
              <span className='ml-2'>Dashboard</span>
            </NavLink>
            <NavLink to='/admin/users' className={currentPage}>
              <BsPeople size={18} />
              <span className='ml-2'>Users</span>
            </NavLink>
            <NavLink to='/admin/reports' className={currentPage}>
              <BsFileText size={18} />
              <span className='ml-2'>Reports</span>
            </NavLink>
          </div>
          <div className='hidden md:flex items-center space-x-3'>
            <div className='relative'>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className='flex cursor-pointer items-center space-x-2 px-3 py-2 rounded-md hover:bg-slate-50 active:scale-[0.98] transition-all duration-150'>
                <div className='w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center'>
                  <span className='text-sm font-medium text-slate-600'>
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className='text-sm font-medium text-slate-700'>{user?.name}</span>
                <FaCaretDown
                  className={`text-slate-400 transition ${showProfileMenu ? 'rotate-180' : ''}`}
                  size={18} />
              </button>
              {showProfileMenu && (
                <>
                  <div
                    className='fixed inset-0 z-10'
                    onClick={() => setShowProfileMenu(false)} />
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-20'>
                    <NavLink
                      to='/admin/profile'
                      onClick={() => setShowProfileMenu(false)}
                      className='block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all duration-150'>
                      <div className='flex items-center space-x-2'>
                        <IoPersonOutline size={18} />
                        <span>Profile</span>
                      </div>
                    </NavLink>
                    <div className='border-t border-slate-200 my-1' />
                    <button
                      onClick={() => {
                        setShowProfileMenu(false)
                        handleLogout()
                      }}
                      className='w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 active:scale-[0.98] transition-all duration-150'>
                      <div className='flex items-center space-x-2'>
                        <PiSignOut size={18} />
                        <span>Sign Out</span>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setMobileView(!mobileView)}
              className='p-2 rounded-md text-slate-600'>
              <RxHamburgerMenu
                size={20}
                className={`transition ${mobileView ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      {mobileView && (
        <div className='md:hidden border-t border-slate-200 bg-white'>
          <div className='px-4 py-3 space-y-1'>
            <NavLink
              to='/admin'
              end
              className={currentPage}
              onClick={() => setMobileView(false)}>
              <BsBarChart size={18} />
              <span className='ml-2'>Dashboard</span>
            </NavLink>
            <NavLink
              to='/admin/users'
              className={currentPage}
              onClick={() => setMobileView(false)}>
              <BsPeople size={18} />
              <span className='ml-2'>Users</span>
            </NavLink>
            <NavLink
              to='/admin/reports'
              className={currentPage}
              onClick={() => setMobileView(false)}>
              <BsFileText size={18} />
              <span className='ml-2'>Reports</span>
            </NavLink>
            <div className='border-t border-slate-200 my-2' />
            <NavLink
              to='/admin/profile'
              className='flex items-center space-x-2 p-2 text-sm font-medium text-slate-600'
              onClick={() => setMobileView(false)}>
              <div className='w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center'>
                <span className='text-sm font-medium text-slate-600'>
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span>{user?.name}</span>
            </NavLink>
            <button
              onClick={() => {
                setMobileView(false)
                handleLogout()
              }}
              className='w-full flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600'>
              <PiSignOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
export default AdminNavBar