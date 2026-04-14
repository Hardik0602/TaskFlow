import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useData } from '../../context/DataContext'
import { FaArrowLeft, FaCircleNotch, FaEye, FaEyeSlash } from 'react-icons/fa'
import { PiSuitcase } from 'react-icons/pi'
import { FiShield } from 'react-icons/fi'
const AddUser = () => {
    const navigate = useNavigate()
    const { getUsers } = useData()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('manager')
    const [showPassword, setShowPassword] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name.trim() || !email.trim() || !password.trim()) {
            toast.error('fill all required fields')
            return
        }
        const newUser = {
            email: email.trim().toLowerCase(),
            password: password,
            name: name.trim(),
            role: role
        }
        try {
            setSubmitting(true)
            const res = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            })
            if (!res.ok) throw new Error()
            toast.success('user added successfully')
            getUsers()
            navigate('/admin/users')
        } catch (error) {
            toast.error('failed to add user')
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <div className='min-h-screen bg-slate-50'>
            <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='mb-8 animate-slideUp'>
                    <button
                        onClick={() => navigate(-1)}
                        className='inline-flex gap-1 items-center text-slate-600 hover:text-slate-400 transition mb-4'>
                        <FaArrowLeft size={15} />
                        <span className='font-medium'>Back</span>
                    </button>
                    <h1 className='text-3xl font-bold text-slate-900'>Add New User</h1>
                    {/* <p className='text-slate-600 mt-1'>Create a new user account and assign permissions</p> */}
                </div>
                <div className='bg-white rounded-lg border border-slate-200 overflow-hidden animate-slideUp' style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}>
                    <form onSubmit={handleSubmit}>
                        <div className='p-6 space-y-6'>
                            <div>
                                <h2 className='text-lg font-semibold text-slate-900 mb-4'>User Information</h2>
                                <div className='mb-5'>
                                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                                        Full Name
                                    </label>
                                    <input
                                        type='text'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200'
                                        placeholder='User name'
                                        required />
                                </div>
                                <div className='mb-5'>
                                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                                        Email Address
                                    </label>
                                    <input
                                        type='email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200'
                                        placeholder='user@company.com'
                                        required />
                                </div>
                                <div className='mb-5'>
                                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                                        Password
                                    </label>
                                    <div className='relative'>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className='w-full px-4 py-2.5 pr-12 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200'
                                            placeholder='Enter new password'
                                            minLength={6}
                                            required />
                                        <button
                                            type='button'
                                            onClick={() => setShowPassword(!showPassword)}
                                            className='absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200'                                        >
                                            {showPassword ? (
                                                <FaEyeSlash size={20} />
                                            ) : (
                                                <FaEye size={20} />
                                            )}
                                        </button>
                                    </div>
                                    <p className='text-xs text-slate-500 mt-1'>
                                        Password must be at least 6 characters long
                                    </p>
                                </div>
                            </div>
                            <div className='pt-6 border-t border-slate-200'>
                                <h2 className='text-lg font-semibold text-slate-900 mb-4'>Role & Permissions</h2>
                                <div>
                                    {/* <label className='block text-sm font-medium text-slate-700 mb-3'>
                                        User Role
                                    </label> */}
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                        <label
                                            className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${role === 'manager'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-slate-200 bg-white hover:border-slate-300'
                                                }`}>
                                            <input
                                                type='radio'
                                                name='role'
                                                value='manager'
                                                checked={role === 'manager'}
                                                onChange={e => setRole(e.target.value)}
                                                className='mt-1 h-4 w-4 text-blue-600' />
                                            <div className='ml-3 flex-1'>
                                                <div className='flex items-center gap-2 mb-1'>
                                                    <PiSuitcase className={`w-5 h-5 ${role === 'manager' ? 'text-blue-600' : 'text-slate-400'}`} size={15} />
                                                    <span className={`text-sm font-semibold ${role === 'manager' ? 'text-blue-900' : 'text-slate-900'}`}>
                                                        Manager
                                                    </span>
                                                </div>
                                                <p className={`text-xs ${role === 'manager' ? 'text-blue-700' : 'text-slate-500'}`}>
                                                    Can view and manage assigned tasks
                                                </p>
                                            </div>
                                        </label>
                                        <label
                                            className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${role === 'admin'
                                                ? 'border-purple-500 bg-purple-50'
                                                : 'border-slate-200 bg-white hover:border-slate-300'
                                                }`}>
                                            <input
                                                type='radio'
                                                name='role'
                                                value='admin'
                                                checked={role === 'admin'}
                                                onChange={e => setRole(e.target.value)}
                                                className='mt-1 h-4 w-4 text-purple-600' />
                                            <div className='ml-3 flex-1'>
                                                <div className='flex items-center gap-2 mb-1'>
                                                    <FiShield className={`w-5 h-5 ${role === 'admin' ? 'text-purple-600' : 'text-slate-400'}`} size={15} />
                                                    <span className={`text-sm font-semibold ${role === 'admin' ? 'text-purple-900' : 'text-slate-900'}`}>
                                                        Admin
                                                    </span>
                                                </div>
                                                <p className={`text-xs ${role === 'admin' ? 'text-purple-700' : 'text-slate-500'}`}>
                                                    Full system and user access
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3'>
                            <button
                                type='button'
                                onClick={() => navigate('/admin/users')}
                                className='px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200'>
                                Cancel
                            </button>
                            <button
                                type='submit'
                                disabled={submitting}
                                className='px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2'>
                                {submitting ? (
                                    <span className='flex items-center justify-center'>
                                        <FaCircleNotch
                                            size={16}
                                            className='animate-spin -ml-1 mr-2' />
                                        Adding user...
                                    </span>
                                ) : (
                                    'Add User'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddUser