import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, ListTodo, User, Mail, CheckSquare } from 'lucide-react'

export default function Navbar() {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Tasks', path: '/todos', icon: ListTodo },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Contact', path: '/contact', icon: Mail },
  ]

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 font-black text-xl text-foreground hover:opacity-90 transition-opacity"
        >
          <div className="p-2 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20">
            <CheckSquare className="w-5 h-5" />
          </div>
          <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            TaskMaster
          </span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </nav>

      </div>
    </header>
  )
}