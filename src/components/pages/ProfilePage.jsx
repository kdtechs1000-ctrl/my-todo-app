import React, { useState, useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
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
    avatarUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVDxUVFRUVEBAQDw8VDw8QFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFy0dHR0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKIBNwMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAIFBgEAB//EAD8QAAEDAgMFBgMFBQgDAAAAAAEAAhEDIQQSMQUiQVFhBjJxgZGxE6HBQmJy0fAHFCNSgiQzU5KissLhFRPx/8QAGwEAAgMBAQEAAAAAAAAAAAAAAQMAAgQFBgf/xAA0EQACAQMCAwcCBQUBAQEAAAAAAQIDETEEIQUSQQYTIjJRYXEzgRQjkbHBJEJicqE00SX/2gAMAwEAAhEDEQA/AMw1NKkyeShCQUITp31RITaVABgYUIEmxPQqPBFkxuNd3Z/mJKZwGG85+9jRxeXhjEA/VenOCsHKlZzdD5cFk1OlpVV4onT0XE9TpvJPb0e6CU+74pXEFy6KS9h/CZurxHneXdljsQ/x6fn7LylDzo9ZxZX0zNpK6R4o6CiQ8oQkiArdrGxSauB1LJRUW3XJq5OvSwO4WnvKUPMSv5S9Zou7DBwqnmOyrFDoKJUm0ogYRpRKsJKJU9ooQ6G8VCBRdEBIXsoCx7oUAgXCEAgKlkQpCuI6KrLxFKiqNQCVSReOTO7ZdJXOrPc6NJbFWNUkaXeG7q30sGKrk65XYscB4IFibbIgOtHFQhMmdFABAUSBafVQB1xsfAoSwwxyjH4uDl81t4DG1Bt9WP41Gzh8MXdgS85muLenBTimqqUay5HbY18G4THWadyb3uBr0qrLuGYcwl0eMNu1RA1fZ+rRTcVsPULtHgupxF/0jMHAl/8AoJezGdkuitT8foV5Ki7TR6/iO+nkvY3ErpHirHgigWOgoksdzKAKPbmPa0EQSRpoA51obJ43CTU32HU1bco6e1QI3HSRMEGZMwBGpWR6e7ybVqLLAnVr1HxmqmmDqGuAdqbmOEg26J0aUY4QmVWUssCB8ABlUkmd4ExAvY8dQM3X1YmxQxg61ajDhWcfGq5zAOrYuephWUmgOKeUW2H7VlpiqzMPtVKbmbo6iSJ6Srqp6i3SXQ02CxjKrQ+m4PaeIPyPVPTTwZ5Ra2Y20qxQICiCx1pUBYmCiQlmhQBKYugSxxzpuoQGTmVQ2AuPBEKQrVsgy6FKioNQtVVJYGQyZnaJ3iubUydGlgSbqqIuXVDRb6eDFUyeeiUHRpKgSTRKhDodNlCWCZstkSE2iLqAJgyoA7XfuO8ChPysvTjeSMfWb3fCV1uDR/p18s09olyVoR/xX7sawXFYeOr8yL9ju9kXfTTX+X8IJidCuNSV5pe6PSaramxel9PqvW8WfLpbfB867Orn17l7MlgjFVh+8F5Kn5keu1kb0pfDNw0rqHiGdlQFjxciCwPE4ltNhe3RoJMa25KNkUTCbQxLsS+TugGW0we6IiXuNs0Wj1SG7salYTfTIe3I4gAg5SQcpaZBEcOqATrcO81MrpuQZiJgWt1lS4bDn/jXscDoB3cpgZryOlzPmi2TlI4ik6DLXC0Ex9q0R/T7lDmQeVgX4dpgU2gHSQcs8+BsNJ4ngj8FbB9kYx2FqzcUyctUGCOjrHUeyZCXKyk4cyPolKpIB5rWjG0FBUBYlmRJY6HIlbEg5QljrXKEsRc9BhSIufyVSWBvcoFIVqOQZdIVqFVYxCtY2KVPA2KM3jRvFc2o9zo01sLU23QiFlzS0W+GDFPJFyLKoZZ1QLMI48kQEjYWUJYnTHEogZ1hJPRAgTNFgoSx7EmGOPQqtR2izVoafPqIR90ZnFM3h4LtcG+h92M7V7auK/xX7sNggsfHl4oP5Or2Of5VRe/8E8UbLkaSPNXgvdHo+Jz5NNOXomLg2XouOStQS9WeD7LL8+pL0X8kqVi0/eHuvLR2aPZaiP5L+GbIOldQ8EyefgoAjMIgMt24xxDG0gbvMuj+VsfX6qk2Wiiq2RhGhupBtMRebgfrlwVLbFkavYPZoV4qVPIjUhZqlWzNlKhdXZraXZCgRpcRDuNtErvmO7iJYUuzlId4ZyP5tQYjXwUdRsKpRQWrsOi4Q5gItAgco9kOdlnTizM7c7C0n71OWnkLeavGsxUqCeDA7Q2JVwzjTddjwcr+TmjNB8gVohPmMtSm4F12J2jnpfCcZdTu3maZ09DI9FtoyurGKrGzuacFPE2PZlAWOgoksdzIgseLkCWIPqIMKQI1EC1gbqiAUgL3qrLJAHuVWXSFq5slTwMjkoMTquZPJ0YYAsF0Y5JLBZt0W+ODDLJxyIB8smyXzoZyMm2nAR50DlZxjIN1OdE5WTLZKPMgcoQttZHmQOVk2MRugWYrtGzY5kfmkV5eGx2+A0ebVJ+iZRYwbw8F6Dg30PuzF2uVtZH/AFX7snhFk49/Z9zodjX4avyjuL0XP4VDm1Ufbc7PaKr3ehm/Xb9RchdPjz8EF7nmOy0fqS+P5GKLZc0feb7hedjk9fqfpS+GbAthdI+fs9k4qAIkcSiQ+a7Wxnx67njScrIjuDSPHXzSm7ssWXZ2iKtXLbK3WO6TNz4W87KrexaC3PrWzmgAAaCy58snWgtjSYWnMKRRJMd/dRqm8iFd4yJwqnIHnFcRRCW1Yuncx3avZuem8cdWnkQFaErMpVjzRPk2w8X8DEMJtDsj+rH2v4WPkF0acrSTOVNXVj6YFtMp1Eh1EFjygLHJRJYg9BlkBcqlgbigGwFyqyyBuCqyyFsSbJNTAyC3KGsblc2WTfDBBgurQyCWCybYLesGN5BuMIMBF+IcFyoyZ1GkFwmIcRcqSk0SMUw4qlDvJFu7iL1cc5roTIzlYVKEbkqePcp3rIqSYQ7QdICnfMncoliq5cQOQn1UVRzPQ8DoKLlISxo08/ovV8Ef5LXuee7ZRtqab9Y/yRoa+SRx5bQ+5o7Gv6q+COJcs3AoXrSl6I19rattNGHqzjGS2ep+idx57wXyZOylO9KrL3X7EX1cuU/eb7hcfTUueXxud/iNVU6Dfrt+pqm7RboqfiDyf4cmMe1H8SgfhmV3aHaYbh6mU3LYHi631V41uZ2KTocqufPKQJs0SSeGp4AfNNMxp+xtB3xYGmpI5f8A0W8Euo7IdRjeR9V2aRYLAzqI0+ECvFMXJosThjEp/IxKqLBxtFxFgoosLkhPFUXaH2S5RY2MlYz+2hAv+psq2De58N7QUQHu4HM9vQgEEfJ/+lbY7pHLmrSZ9D2Ti/iUabzq5jSfxECfnK1KsuonuW9x0OCt30fUHcyOh4VlVj6g7mR2Qrd5H1KunL0PWR50Du36EHgKcyJysCWhDmQeVg3tUugqLBFirctZgnNVGw2FcY3dSaj2GQM+8XK50sm+K2OUhdXp5KTwWgbIW9YMjBlkoEFcS9ciB1ZhsD3UJ5DDAcKpcr6gl6an4RT8wxTCW2XSOVO+FOhHkM7vnpA/XqmUsHqeEwtSv6gcb9nz+i9XwJ/lz+TV31.jpg'
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
    avatarUrl: profile.avatarUrl || ''
  })

  const [saved, setSaved] = useState(false)
  const fileInputRef = useRef(null)

  // Keep local state in sync if context profile updates
  useEffect(() => {
    if (context.profile) {
      setFormData((prev) => ({ ...prev, ...context.profile }))
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
              src={formData.avatarUrl}
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