import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsPeople } from 'react-icons/bs'
import { IoWarningOutline } from 'react-icons/io5'
import { LuClock4 } from 'react-icons/lu'
import { FaRegArrowAltCircleRight } from 'react-icons/fa'
import { MdRefresh } from 'react-icons/md'
import { useTasks } from '../../context/TaskContext'
import { useData } from '../../context/DataContext'
import Stats from '../../components/Stats'
const AdminDashboard = () => {
  const { loading, loadTasks } = useTasks()
  const { totalUsers, admins, managers, overdueTasks, pendingTasks, getUsers } = useData()
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8 animate-slideUp'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-slate-900'>Admin Dashboard</h1>
              {/* <p className='text-slate-600 mt-1'>Overview of users and task load</p> */}
            </div>
            <button
              onClick={() => { loadTasks(), getUsers() }}
              disabled={loading}
              className='flex cursor-pointer disabled:cursor-not-allowed items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 active:scale-[0.98] transition-all duration-150'>
              <MdRefresh
                className={`text-slate-600 ${loading ? 'animate-spin' : ''}`}
                size={18} />
              <span className='text-sm font-medium text-slate-700'>Refresh</span>
            </button>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8'>
          <Stats
            title='Total Users'
            value={totalUsers}
            icon={<BsPeople size={25} />}
            color='purple'
            subtitle={`Managers: ${managers} | Admins: ${admins}`}
            index={0} />
          <Stats
            title='Pending Tasks'
            value={pendingTasks}
            icon={<LuClock4 size={25} />}
            color='amber'
            subtitle='Awaiting action across all users'
            index={1} />
          <Stats
            title='Overdue Tasks'
            value={overdueTasks}
            icon={<IoWarningOutline size={25} />}
            color='red'
            subtitle='Needs attention across all users'
            index={2} />
        </div>
        <div className='grid grid-cols-1 gap-6'>
          <div className='bg-white rounded-lg border border-slate-200 p-6 animate-slideUp' style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
            <h2 className='text-lg font-semibold text-slate-900 mb-4'>Quick Actions</h2>
            <div className='space-y-3'>
              <button
                className='w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition'
                onClick={() => navigate('/admin/users')}>
                <div className='flex items-center justify-between'>
                  <span className='text-md font-medium text-purple-900'>Assign Task</span>
                  <FaRegArrowAltCircleRight
                    className='text-purple-600'
                    size={20} />
                </div>
              </button>
              <button
                className='w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition'
                onClick={() => navigate('/admin/reports')}>
                <div className='flex items-center justify-between'>
                  <span className='text-md font-medium text-blue-900'>View Report</span>
                  <FaRegArrowAltCircleRight
                    className='text-blue-600'
                    size={20} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdminDashboard