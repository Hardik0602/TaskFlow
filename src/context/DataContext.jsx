import { createContext, useContext, useState } from 'react'
import { useTasks } from './TaskContext'
import { users } from '../data/users'
const DataContext = createContext()
export function DataProvider({ children }) {
    const { tasks } = useTasks()
    const today = new Date()
    const threeDays = new Date(today)
    threeDays.setDate(today.getDate() + 3)
    const totalUsers = users.length
    const managers = users.filter(u => u.role === 'manager').length
    const admins = users.filter(u => u.role === 'admin').length
    const [searchTerm, setSearchTerm] = useState('')
    const filteredUsers = users.filter(u => u.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || u.email.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(t => t.status !== 'pending').length
    const overdueTasks = tasks.filter(t => t.status === 'pending' && new Date(t.dueDate) < today).length
    const pendingTasks = tasks.filter(t => t.status === 'pending' && new Date(t.dueDate) >= today).length
    const effectiveTasks = tasks.map(t => {
        const overdue = (t.status === 'pending' && new Date(t.dueDate) < today)
        return {
            ...t,
            overdue,
            priority: overdue ? 'high' : t.priority
        }
    })
    const pendingEffectiveTasks = effectiveTasks.filter(t => t.status === 'pending')
    const highPriority = pendingEffectiveTasks.filter(t => t.priority === 'high').length
    const mediumPriority = pendingEffectiveTasks.filter(t => t.priority === 'medium').length
    const lowPriority = pendingEffectiveTasks.filter(t => t.priority === 'low').length
    const dueSoon = tasks.filter(t => t.status === 'pending' && new Date(t.dueDate) >= today && new Date(t.dueDate) <= threeDays).length
    return (
        <DataContext.Provider value={{ effectiveTasks, users, searchTerm, filteredUsers, setSearchTerm, totalUsers, managers, admins, overdueTasks, pendingTasks, totalTasks, completedTasks, highPriority, lowPriority, mediumPriority, dueSoon }}>
            {children}
        </DataContext.Provider>
    )
}
export const useData = () => useContext(DataContext)