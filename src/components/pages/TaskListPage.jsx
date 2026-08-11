import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { 
  CheckCircle2, 
  Trash2, 
  Briefcase, 
  UserCheck, 
  ListTodo,
  Clock 
} from 'lucide-react'

export default function TaskListPage() {
  const { tasks, toggleComplete, deleteTask } = useOutletContext()

  const priorityStyles = {
    High: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800',
    Medium: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800',
    Low: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800',
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h1 className="text-3xl font-black text-foreground flex items-center gap-3">
            <ListTodo className="w-8 h-8 text-indigo-500" /> All Tasks
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            View, track, and manage all active tasks across your workspace.
          </p>
        </div>
        <span className="text-sm font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600">
          {tasks.length} Total
        </span>
      </div>

      {/* Task List / Empty State */}
      {tasks.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-indigo-200/60 dark:border-indigo-900/30 bg-card">
          <Clock className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground">No tasks found</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Go to the Home page to add new tasks to your board.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                task.completed
                  ? 'bg-muted/30 border-border opacity-60'
                  : 'bg-card border-border shadow-sm hover:border-indigo-500/40'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                    task.completed
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'border-input bg-background'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>

                <div>
                  <h3 className={`text-sm font-bold text-foreground ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 font-semibold">
                      <Briefcase className="w-3 h-3" /> {task.role}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-600 font-semibold">
                      <UserCheck className="w-3 h-3" /> {task.gender}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium pl-1">
                      {task.createdAt}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full border font-bold ${priorityStyles[task.priority]}`}>
                  {task.priority}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-muted-foreground hover:text-rose-500 p-2 rounded-xl hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}