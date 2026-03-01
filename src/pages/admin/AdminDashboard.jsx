import React from 'react'
import { useTasks } from '../../context/TaskContext'
const AdminDashboard = () => {
  const { tasks } = useTasks()
  console.log(tasks)
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard