import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTasks } from '../../context/TaskContext'
import { useData } from '../../context/DataContext'
import { FaArrowLeft, FaCaretDown, FaCircleNotch } from 'react-icons/fa'
import { IoDocumentTextOutline } from 'react-icons/io5'
const priorityOptions = ['low', 'medium', 'high']
const EditTask = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tasks, loadTasks } = useTasks()
  const { users } = useData()
  const task = tasks.find(t => t.id === id)
  const managers = users.filter(u => u.role === 'manager')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('low')
  const [assignedTo, setAssignedTo] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [detailsRows, setDetailsRows] = useState([{ key: '', value: '' }])
  const [submitting, setSubmitting] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setPriority(task.priority)
      setAssignedTo(task.assignedTo)
      setDueDate(task.dueDate)
      const details = task.details
      const entries = Object.entries(details)
      if (entries.length > 0) {
        setDetailsRows(entries.map(([key, value]) => ({ key, value: String(value) })))
      } else {
        setDetailsRows([{ key: '', value: '' }])
      }
    }
  }, [task])
  useEffect(() => {
    if (!task) return
    const currentDetails = {}
    detailsRows.forEach(row => {
      if (row.key.trim() && row.value.trim()) {
        currentDetails[row.key.trim()] = row.value.trim()
      }
    })
    const originalDetails = task.details || {}
    const changed =
      description !== (task.description) ||
      priority !== (task.priority) ||
      assignedTo !== (task.assignedTo) ||
      dueDate !== (task.dueDate) ||
      JSON.stringify(currentDetails) !== JSON.stringify(originalDetails)
    setHasChanges(changed)
  }, [task, description, priority, assignedTo, dueDate, detailsRows])
  const handleAddDetailRow = () => {
    setDetailsRows(prev => [...prev, { key: '', value: '' }])
  }
  const handleDetailChange = (index, field, value) => {
    setDetailsRows(prev => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }
  const handleRemoveDetailRow = (index) => {
    setDetailsRows(prev => prev.filter((_, i) => i !== index))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!description.trim() || !priority || !dueDate || !assignedTo) {
      toast.error('fill all required fields')
      return
    }
    let isValid = true
    const detailsObject = {}
    detailsRows.forEach(row => {
      const key = row.key.trim()
      const value = row.value.trim()
      if ((key && !value) || (!key && value)) {
        isValid = false
      }
      if (key && value) {
        detailsObject[key] = value
      }
    })
    if (!isValid) {
      toast.error('additional detail must have both field name and value')
      return
    }
    const updatedTask = {
      description: description.trim(),
      priority,
      assignedTo,
      dueDate,
      details: Object.keys(detailsObject).length ? detailsObject : {}
    }
    try {
      setSubmitting(true)
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      })
      if (!res.ok) throw new Error()
      toast.success('task updated successfully')
      loadTasks()
      navigate(-1)
    } catch {
      toast.error('something went wrong')
    } finally {
      setSubmitting(false)
    }
  }
  if (!task) {
    return (
      <div className='min-h-screen bg-slate-50 flex items-center justify-center'>
        <div className='text-center animate-slideUp'>
          <IoDocumentTextOutline
            size={60}
            className='mx-auto text-slate-300 mb-4' />
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
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8'>
        <div className='mb-8 animate-slideUp'>
          <button
            onClick={() => navigate(-1)}
            className='inline-flex gap-1 items-center text-slate-600 hover:text-slate-400 transition mb-4 cursor-pointer'>
            <FaArrowLeft size={15} />
            <span className='font-medium'>Back</span>
          </button>
          <h1 className='text-3xl font-bold text-slate-900'>Edit Task</h1>
        </div>
        <div className='bg-white rounded-lg border border-slate-200 animate-slideUp' style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
          <form onSubmit={handleSubmit}>
            <div className='p-6 space-y-6'>
              <div>
                <h2 className='text-lg font-semibold text-slate-900 mb-4'>Task Information</h2>
                <div className='mb-5'>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Task Title
                  </label>
                  <input
                    type='text'
                    value={title}
                    className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 cursor-not-allowed'
                    disabled />
                </div>
                <div className='mb-5'>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    required
                    onChange={e => setDescription(e.target.value)}
                    className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none transition'
                    placeholder='Provide additional context or instructions for this task...' />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Assigned To
                    </label>
                    <div className='relative'>
                      <select
                        value={assignedTo}
                        onChange={e => setAssignedTo(e.target.value)}
                        className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none cursor-pointer transition'>
                        {managers.map(u => (
                          <option key={u.email} value={u.email}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                      <FaCaretDown
                        className='absolute right-3 top-3 text-slate-400 pointer-events-none'
                        size={20} />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Due Date
                    </label>
                    <input
                      type='date'
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                      className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition'
                      min={new Date().toISOString().split('T')[0]}
                      required />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Priority
                    </label>
                    <div className='relative'>
                      <select
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                        className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none cursor-pointer transition'>
                        {priorityOptions.map(option => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                      <FaCaretDown
                        className='absolute right-3 top-3 text-slate-400 pointer-events-none'
                        size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-6 pb-6'>
              <div className='bg-slate-50 rounded-lg border border-slate-200 p-5'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='text-lg font-semibold text-slate-900'>Additional Details</h2>
                </div>
                <p className='text-sm text-slate-600 mb-4'>
                  Add custom fields specific to this task (e.g., Amount, Location)
                </p>
                <div className='space-y-3'>
                  {detailsRows.map((row, index) => (
                    <div key={index} className='flex flex-col sm:flex-row gap-3'>
                      <input
                        type='text'
                        value={row.key}
                        onChange={e => handleDetailChange(index, 'key', e.target.value)}
                        placeholder='Field name (e.g., Amount)'
                        className='flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm' />
                      <input
                        type='text'
                        value={row.value}
                        onChange={e => handleDetailChange(index, 'value', e.target.value)}
                        placeholder='Value (e.g. 1500 INR)'
                        className='flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm' />
                      {detailsRows.length > 1 && (
                        <button
                          type='button'
                          onClick={() => handleRemoveDetailRow(index)}
                          className='sm:w-auto w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer'>
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type='button'
                  onClick={handleAddDetailRow}
                  className='mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 transition cursor-pointer'>
                  Add Another Field
                </button>
              </div>
            </div>
            <div className='px-6 py-4 bg-slate-50 border-t border-slate-200 rounded-b-lg flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3'>
              <button
                type='button'
                onClick={() => navigate(-1)}
                className='px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-200 transition cursor-pointer'>
                Cancel
              </button>
              <button
                type='submit'
                disabled={submitting || !hasChanges}
                className='px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 cursor-pointer'>
                {submitting ? (
                  <>
                    <FaCircleNotch
                      size={16}
                      className='animate-spin -ml-1 mr-2' />
                    <span>Updating Task...</span>
                  </>
                ) : (
                  <span>Update Task</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default EditTask