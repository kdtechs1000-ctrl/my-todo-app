import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  UserCheck, 
  Briefcase, 
  Sparkles,
  ListTodo,
  ShieldAlert
} from 'lucide-react';

export default function HomePage() {
  const { tasks, addTask, toggleComplete, deleteTask } = useOutletContext();

  const [taskName, setTaskName] = useState('');
  const [role, setRole] = useState('Frontend Developer');
  const [priority, setPriority] = useState('Medium');
  const [gender, setGender] = useState('Male');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskName,
      role,
      priority,
      gender,
      completed: false,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    addTask(newTask);
    setTaskName('');
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'High' && !t.completed).length;

  const priorityStyles = {
    High: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800 shadow-sm shadow-rose-500/10',
    Medium: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800 shadow-sm shadow-amber-500/10',
    Low: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 shadow-sm shadow-emerald-500/10',
  };

  // Distinct active colors for each gender
  const genderStyles = {
    Male: 'bg-blue-600 text-white shadow-sm shadow-blue-500/30',
    Female: 'bg-pink-600 text-white shadow-sm shadow-pink-500/30',
    Other: 'bg-purple-600 text-white shadow-sm shadow-purple-500/30',
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Header Banner & Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Workspace Dashboard
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Task Management System
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-medium">
            Organize team workflows with roles, assignees, and real-time tracking.
          </p>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-3 gap-3 min-w-[340px]">
          <div className="p-3.5 rounded-2xl border border-indigo-200/60 dark:border-indigo-900/40 bg-card shadow-sm flex flex-col items-center justify-center">
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
              <ListTodo className="w-3.5 h-3.5" /> Total
            </span>
            <span className="text-2xl font-black text-foreground mt-0.5">{totalTasks}</span>
          </div>

          <div className="p-3.5 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 bg-card shadow-sm flex flex-col items-center justify-center">
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Done
            </span>
            <span className="text-2xl font-black text-foreground mt-0.5">{completedTasks}</span>
          </div>

          <div className="p-3.5 rounded-2xl border border-rose-200/60 dark:border-rose-900/40 bg-card shadow-sm flex flex-col items-center justify-center">
            <span className="text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Urgent
            </span>
            <span className="text-2xl font-black text-foreground mt-0.5">{highPriorityTasks}</span>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-card rounded-2xl border border-border shadow-lg shadow-indigo-500/5 overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        <div className="p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            Create New Task
          </h2>

          <form onSubmit={handleAddTask} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Task Title
              </label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="e.g., Build Frontend Dashboard Component"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Assigned Role
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm font-medium appearance-none cursor-pointer pr-10"
                  >
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="QA Engineer">QA Engineer</option>
                  </select>
                  <Briefcase className="w-4 h-4 absolute right-3.5 top-3 text-indigo-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm font-medium cursor-pointer"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>

              {/* Assignee Gender with unique colors on click */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Assignee Gender
                </label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-muted/60 rounded-xl border border-border">
                  {['Male', 'Female', 'Other'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setGender(item)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        gender === item
                          ? genderStyles[item]
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-violet-600 text-white font-bold text-sm hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <PlusCircle className="w-4.5 h-4.5" /> Add Task to Board
            </button>
          </form>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">
          Recent Tasks <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 font-bold">{totalTasks}</span>
        </h2>

        {tasks.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-border bg-card">
            <Clock className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-foreground">No tasks added yet</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  task.completed
                    ? 'bg-muted/30 border-border opacity-60'
                    : 'bg-card border-border shadow-xs'
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
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 font-semibold">
                        <Briefcase className="w-3 h-3" /> {task.role}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 font-semibold">
                        <UserCheck className="w-3 h-3" /> {task.gender}
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
                    className="text-muted-foreground hover:text-rose-500 p-1.5 rounded-xl hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}