import React from 'react'
import { useData } from '../../context/DataContext'
import { BsPeople, BsPersonPlus } from 'react-icons/bs'
import { PiSuitcase } from 'react-icons/pi'
import { FiShield } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import UserList from '../../components/UserList'
const UserManagement = () => {
  const { totalUsers, managers, admins, filteredUsers, searchTerm, setSearchTerm } = useData()
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8 animate-slideUp'>
          <div className='flex flex-row items-center justify-between gap-4'>
            <div>
              <h1 className='text-2xl font-bold text-slate-900'>User Management</h1>
              {/* <p className='text-slate-600 mt-1'>Manage users</p> */}
            </div>
            <button
              onClick={() => navigate(('/admin/addUser'))}
              className='flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg w-auto active:scale-[0.98] transition-all duration-150'>
              <BsPersonPlus size={20} />
              <span>Add User</span>
            </button>
          </div>
        </div>
        <div className='bg-white rounded-lg border border-slate-200 mb-1 animate-slideUp' style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}>
          <div className='p-4'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search user by name or email'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-4 py-2.5 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm' />
              <BsPeople className='absolute left-3 top-3 text-slate-400' size={20} />
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg border animate-slideUp border-slate-200 mb-6' style={{ animationDelay: '225ms', animationFillMode: 'backwards' }}>
          <UserList role='admin' filteredUsers={filteredUsers} />
          <UserList role='manager' filteredUsers={filteredUsers} />
          {filteredUsers.length === 0 &&
            <div className='p-12 text-center'>
              <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <BsPeople
                  className='text-slate-400'
                  size={30} />
              </div>
              <h3 className='text-sm font-semibold text-slate-400'>No user found</h3>
            </div>
          }
        </div>
        <div className='bg-white rounded-lg border border-slate-200 p-6 animate-slideUp' style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
          <h3 className='text-lg font-semibold text-slate-900 mb-4'>User Statistics</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='p-4 bg-slate-50 rounded-lg border border-slate-200 animate-slideUp' style={{ animationDelay: '375ms', animationFillMode: 'backwards' }}>
              <div className='flex items-center gap-2 mb-2'>
                <BsPeople className='text-slate-500' size={20} />
                <p className='text-sm font-medium text-slate-500'>Total Users</p>
              </div>
              <p className='text-2xl font-bold text-slate-400'>{totalUsers}</p>
            </div>
            <div className='p-4 bg-blue-50 rounded-lg border border-blue-200 animate-slideUp' style={{ animationDelay: '450ms', animationFillMode: 'backwards' }}>
              <div className='flex items-center gap-2 mb-2'>
                <PiSuitcase className='text-blue-500' size={20} />
                <p className='text-sm font-medium text-blue-500'>Managers</p>
              </div>
              <p className='text-2xl font-bold text-blue-400'>
                {managers}
              </p>
            </div>
            <div className='p-4 bg-purple-50 rounded-lg border border-purple-200 animate-slideUp' style={{ animationDelay: '525ms', animationFillMode: 'backwards' }}>
              <div className='flex items-center gap-2 mb-2'>
                <FiShield size={20} className='text-purple-500' />
                <p className='text-sm font-medium text-purple-500'>Admins</p>
              </div>
              <p className='text-2xl font-bold text-purple-400'>
                {admins}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserManagement