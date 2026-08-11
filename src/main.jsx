import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './index.css'

import Navbar from './components/Navbar'
import HomePage from './components/pages/HomePage'
import TaskListPage from './components/pages/TaskListPage'
import ContactUsPage from './components/pages/ContactPage'
import ProfilePage from './components/pages/ProfilePage'

// Layout component wrapping the app with shared state
function RootLayout() {
  const [tasks, setTasks] = useState([])

  // Initialize profile state from localStorage or use defaults
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('user_profile')
    return saved
      ? JSON.parse(saved)
      : {
          fullName: 'John Doe',
          gender: 'Male',
          role: 'Frontend Engineer',
        }
  })

  // Sync profile updates to localStorage
  useEffect(() => {
    localStorage.setItem('user_profile', JSON.stringify(profile))
  }, [profile])

  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev])
  }

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div>
      <Navbar profile={profile} />
      <main>
        {/* Outlet passes task & profile state/handlers to all child pages */}
        <Outlet
          context={{
            tasks,
            addTask,
            toggleComplete,
            deleteTask,
            profile,
            setProfile,
          }}
        />
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'todos',
        element: <TaskListPage />, // Displays all tasks
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'contact',
        element: <ContactUsPage />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)