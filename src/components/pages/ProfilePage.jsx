import React, { useState, useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import defaultAvatar from '../assets/b.webp' // 1. Imported your local asset image
import { 
  User, 
  Mail, 
  Briefcase, 
  ShieldCheck, 
  Bell, 
  Moon, 
  Save, 
  Camera, 
  Check, 
  Sparkles 
} from 'lucide-react'

export default function ProfilePage() {
  const context = useOutletContext() || {}
  const profile = context.profile || {
    fullName: ' Balen John Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    role: 'Frontend Engineer',
    bio: 'Passionate software engineer building beautiful web interfaces.',
    emailNotifications: true,
    darkMode: false,
    avatarUrl: defaultAvatar // 2. Set default fallbacks to local asset
  }
  const setProfile = context.setProfile || (() => {})

  const [formData, setFormData] = useState({
    fullName: profile.fullName || 'John Doe',
    email: profile.email || 'john.doe@example.com',
    gender: profile.gender || 'Male',
    role: profile.role || 'Frontend Engineer',
    bio: profile.bio || 'Passionate software engineer building beautiful web interfaces.',
    emailNotifications: profile.emailNotifications ?? true,
    darkMode: profile.darkMode ?? false,
    avatarUrl: profile.avatarUrl || defaultAvatar // 3. Fallback to imported image
  })

  const [saved, setSaved] = useState(false)
  const fileInputRef = useRef(null)

  // Keep local state in sync if context profile updates
  useEffect(() => {
    if (context.profile) {
      setFormData((prev) => ({ 
        ...prev, 
        ...context.profile,
        avatarUrl: context.profile.avatarUrl || defaultAvatar 
      }))
    }
  }, [context.profile])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // File upload handler for updating profile picture
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const newAvatarUrl = URL.createObjectURL(file)
      setFormData((prev) => ({
        ...prev,
        avatarUrl: newAvatarUrl
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setProfile(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Account Settings
          </div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            User Profile
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage your personal credentials, workspace preferences, and notification settings.
          </p>
        </div>

        {saved && (
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold animate-in fade-in">
            <Check className="w-4 h-4" /> Changes saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Hidden File Input for Avatar Selection */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          accept="image/*"
          className="hidden"
        />

        {/* Profile Card Header (Photo Section) */}
        <div className="p-6 rounded-3xl border border-border bg-card shadow-md flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <img
              src={formData.avatarUrl || defaultAvatar}
              alt={formData.fullName}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-500/20 shadow-sm"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-slate-900 text-white dark:bg-indigo-600 hover:scale-105 transition-transform shadow-md cursor-pointer"
              title="Change Photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
              {formData.fullName || ' Balen John Doe'}
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
            </h2>
            <p className="text-xs font-semibold text-muted-foreground">
              {formData.role} • {formData.email}
            </p>
            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-muted text-[11px] font-bold text-muted-foreground border border-border">
                {formData.gender}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold border border-indigo-500/20">
                Verified Account
              </span>
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Personal Information Section */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-md space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 border-b border-border pb-3">
              <User className="w-4 h-4 text-indigo-500" /> Personal Information
            </h3>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  required
                />
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Role / Occupation */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Role / Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                <Briefcase className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Gender
              </label>
              <div className="flex items-center gap-4 text-sm font-medium pt-1">
                {['Male', 'Female', 'Other'].map((g) => (
                  <label key={g} className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="accent-indigo-600"
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            {/* Biography */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
              />
            </div>
          </div>

          {/* Preferences & System Settings Section */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 border-b border-border pb-3">
                <Bell className="w-4 h-4 text-indigo-500" /> Preferences
              </h3>

              {/* Email Notifications Toggle */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Email Notifications</p>
                    <p className="text-[11px] text-muted-foreground">Receive updates & activity summaries</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleChange}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>

              {/* Dark Mode Preference Toggle */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Dark Theme Preference</p>
                    <p className="text-[11px] text-muted-foreground">Enable dark mode theme UI</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={formData.darkMode}
                  onChange={handleChange}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Save Changes Button Section */}
            <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}