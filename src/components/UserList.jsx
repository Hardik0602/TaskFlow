import React from 'react'
import { BsClipboardPlus } from 'react-icons/bs'
import { FiShield } from 'react-icons/fi'
import { PiSuitcase } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
const UserList = ({ role, filteredUsers }) => {
  const navigate = useNavigate()
  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return (
        <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-medium bg-purple-100 text-purple-700'>
          <FiShield size={15} />
          Admin
        </span>
      )
    }
    return (
      <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-700'>
        <PiSuitcase size={15} />
        Manager
      </span>
    )
  }
  return (
    filteredUsers.filter(u => u.role === role).map((user, index) => (
      <div
        key={index}
        className='p-4 hover:bg-slate-50 transition'>
        <div className='md:hidden'>
          <div className='grid grid-cols-2 mb-3'>
            <div className='flex justify-start items-center gap-3'>
              <div className='w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center'>
                <span className='text-sm font-medium text-slate-600'>
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className='text-sm font-semibold text-slate-900 truncate'>
                  {user.name}
                </p>
                <p className='text-xs text-slate-500 truncate'>
                  {user.email}
                </p>
              </div>
            </div>
            <div className='flex justify-end items-center'>
              {getRoleBadge(user.role)}
            </div>
          </div>
          {user.role === 'manager' &&
            <button
              className='w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg'
              onClick={() => navigate(`/admin/assign/${user.email}`)}>
              <BsClipboardPlus size={15} />
              <span>Assign Task</span>
            </button>
          }
        </div>
        <div className='hidden md:grid md:grid-cols-3 items-center'>
          <div className='flex justify-start items-center gap-3'>
            <div className='w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center'>
              <span className='text-sm font-medium text-slate-600'>
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className='text-sm font-semibold text-slate-900 truncate'>
                {user.name}
              </p>
              <p className='text-xs text-slate-500 truncate'>
                {user.email}
              </p>
            </div>
          </div>
          <div className='flex justify-center'>
            {getRoleBadge(user.role)}
          </div>
          <div className='flex justify-end'>
            {user.role === 'manager' &&
              <button
                className='flex cursor-pointer items-center justify-center gap-1.5 px-4 py-1.5 text-xs font-medium text-blue-700 border bg-blue-50 border-blue-200 rounded-lg hover:bg-blue-200 transition'
                onClick={() => navigate(`/admin/assign/${user.email}`)}>
                <BsClipboardPlus size={15} />
                <span>Assign Task</span>
              </button>
            }
          </div>
        </div>
      </div>
    ))
  )
}
export default UserList