import React from 'react'
import Stats from '../../components/Stats'
import { useTasks } from '../../context/TaskContext'
import { LuCalendar, LuClipboard, LuClock4 } from 'react-icons/lu'
import { IoWarningOutline } from 'react-icons/io5'
import { FaRegCheckCircle } from 'react-icons/fa'
const Dashboard = () => {
  const { tasks } = useTasks()
  const today = new Date()
  const total = tasks.length
  const overdue = tasks.filter(t =>
    t.status === 'pending' && new Date(t.dueDate) < today
  ).length
  const pending = tasks.filter(t =>
    t.status === 'pending' && new Date(t.dueDate) >= today
  ).length
  const completed = tasks.filter(t =>
    t.status !== 'pending'
  ).length
  const weekAgo = new Date(today)
  weekAgo.setDate(today.getDate() - 7)
  const completedThisWeek = tasks.filter(t =>
    t.status !== 'pending' && new Date(t.submittedDate) >= weekAgo
  ).length
  const effectiveTasks = tasks.map(t => {
    const overdue = t.status === 'pending' && new Date(t.dueDate) < today
    return {
      ...t,
      effectivePriority: overdue ? 'high' : t.priority
    }
  })
  const pendingTasks = effectiveTasks.filter(t => t.status === 'pending')
  const highPriority = pendingTasks.filter(t => t.effectivePriority === 'high').length
  const mediumPriority = pendingTasks.filter(t => t.effectivePriority === 'medium').length
  const lowPriority = pendingTasks.filter(t => t.effectivePriority === 'low').length
  const threeDaysFromNow = new Date(today)
  threeDaysFromNow.setDate(today.getDate() + 3)
  const dueSoon = tasks.filter(t =>
    t.status === 'pending' &&
    new Date(t.dueDate) >= today &&
    new Date(t.dueDate) <= threeDaysFromNow
  ).length
  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-slate-900'>Dashboard</h1>
          {/* <p className='text-slate-600 mt-1'>Overview of your tasks and activities</p> */}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <Stats
            title='Total Tasks'
            value={total}
            icon={
              <LuClipboard size={25} />
            }
            color='blue' />
          <Stats
            title='Pending'
            value={pending}
            icon={
              <LuClock4 size={25} />
            }
            color='amber'
            subtitle='Awaiting action' />
          <Stats
            title='Overdue'
            value={overdue}
            icon={
              <IoWarningOutline size={25} />
            }
            color='red'
            subtitle='Needs attention' />
          <Stats
            title='Completed'
            value={completed}
            icon={
              <FaRegCheckCircle size={25} />
            }
            color='green'
            subtitle={`${completedThisWeek} this week`} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white rounded-lg border border-slate-200 p-6'>
            <h2 className='text-lg font-semibold text-slate-900 mb-4'>Due Task Priority Breakdown</h2>
            <div className='space-y-4'>
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-slate-700'>High Priority</span>
                  </div>
                  <span className='text-sm font-semibold text-slate-900'>{highPriority}</span>
                </div>
                <div className='w-full bg-slate-100 rounded-full h-2'>
                  <div
                    className='bg-red-500 h-2 rounded-full transition-all duration-500'
                    style={{ width: `${pending > 0 ? (highPriority / pending) * 100 : 0}%` }} />
                </div>
              </div>
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-slate-700'>Medium Priority</span>
                  </div>
                  <span className='text-sm font-semibold text-slate-900'>{mediumPriority}</span>
                </div>
                <div className='w-full bg-slate-100 rounded-full h-2'>
                  <div
                    className='bg-amber-500 h-2 rounded-full transition-all duration-500'
                    style={{ width: `${pending > 0 ? (mediumPriority / pending) * 100 : 0}%` }} />
                </div>
              </div>
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-slate-700'>Low Priority</span>
                  </div>
                  <span className='text-sm font-semibold text-slate-900'>{lowPriority}</span>
                </div>
                <div className='w-full bg-slate-100 rounded-full h-2'>
                  <div
                    className='bg-blue-500 h-2 rounded-full transition-all duration-500'
                    style={{ width: `${pending > 0 ? (lowPriority / pending) * 100 : 0}%` }} />
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-lg border border-slate-200 p-6'>
            <h2 className='text-lg font-semibold text-slate-900 mb-4'>Quick Insights</h2>
            <div className='space-y-4'>
              <div className='flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg'>
                <IoWarningOutline
                  size={35}
                  className='text-amber-600' />
                <div>
                  <p className='text-sm font-semibold text-amber-900'>{dueSoon} tasks due soon</p>
                  <p className='text-xs text-amber-700 mt-0.5'>Due within the next 3 days</p>
                </div>
              </div>
              <div className='flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                <LuCalendar
                  size={35}
                  className='text-blue-600' />
                <div>
                  <p className='text-sm font-semibold text-blue-900'>Completion Rate</p>
                  <p className='text-xs text-blue-700 mt-0.5'>
                    {total > 0 ? Math.round((completed / total) * 100) : 0}% of all tasks completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard