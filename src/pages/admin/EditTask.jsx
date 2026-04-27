import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTasks } from '../../context/TaskContext'
import { IoDocumentTextOutline } from 'react-icons/io5'
const EditTask = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { tasks, loadTasks } = useTasks()
    const task = tasks.find(t => t.id === id)
    if (!task) {
        return (
            <div className='min-h-screen bg-slate-50 flex items-center justify-center'>
                <div className='text-center'>
                    <IoDocumentTextOutline
                        size={60}
                        className='mx-auto text-slate-300' />
                    <h3 className='text-lg font-semibold text-slate-900 mb-2'>Task Not Found</h3>
                    <p className='text-slate-500 mb-6'>The task you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/admin/task')}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer'>
                        Back to Tasks Page
                    </button>
                </div>
            </div>
        )
    }
    return (
        <div>EditTask</div>
    )
}
export default EditTask