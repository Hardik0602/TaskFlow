import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/manager/Dashboard'
import Inbox from './pages/manager/Inbox'
import TaskDetail from './pages/manager/TaskDetail'
import Notifications from './pages/manager/Notifications'
import Profile from './pages/manager/Profile'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import Reports from './pages/admin/Reports'
import AdminProfile from './pages/admin/AdminProfile'
import ProtectedRoute from './helper/ProtectedRoute'
import RoleProtectedRoute from './helper/RoleProtectedRoute'
import { TaskProvider } from './context/TaskContext'
import { DataProvider } from './context/DataContext'
import AssignTask from './pages/admin/TaskAssign'
import AddUser from './pages/admin/AddUser'
import AdminTasks from './pages/admin/Tasks'
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={<Login />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={['manager']}>
              <MainLayout />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }>
        <Route index element={<Inbox />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='task/:id' element={<TaskDetail />} />
        <Route path='notifications' element={<Notifications />} />
        <Route path='profile' element={<Profile />} />
      </Route>
      <Route
        path='/admin'
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }>
        <Route index element={<AdminDashboard />} />
        <Route path='users' element={<UserManagement />} />
        <Route path='reports' element={<Reports />} />
        <Route path='profile' element={<AdminProfile />} />
        <Route path='assign/:email' element={<AssignTask />} />
        <Route path='addUser' element={<AddUser />} />
        <Route path='task' element={<AdminTasks />} />
        <Route path='task/:id' element={<TaskDetail />} />
      </Route>
    </>
  )
)
export default function App() {
  return <TaskProvider><DataProvider><RouterProvider router={router} /></DataProvider></TaskProvider>
}