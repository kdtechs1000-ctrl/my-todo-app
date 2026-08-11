import React, { useState } from 'react'
import { 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  RotateCcw, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2 
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    phone: '',
    title: '',
    description: '',
  })
  
  const [submitted, setSubmitted] = useState(false)
  const maxChars = 500

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'description' && value.length > maxChars) return
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleReset = () => {
    setFormData({ phone: '', title: '', description: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // UPDATE 1: Included formData.phone.trim() check
    if (!formData.phone.trim() || !formData.title.trim() || !formData.description.trim()) return

    // Simulate submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      handleReset()
    }, 4000)
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Header & Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Support Center
            </div>
            <h1 className="text-3xl font-black text-foreground sm:text-4xl tracking-tight">
              Get in Touch
            </h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Have a question, feedback, or found a bug? Send us a message and our dedicated support team will resolve it quickly.
            </p>
          </div>

          {/* Quick Info Cards */}
          <div className="space-y-3.5 pt-2">
            <div className="p-4 rounded-2xl border border-border bg-card shadow-xs hover:border-indigo-500/30 transition-all flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Email Us
                </span>
                <span className="text-sm font-bold text-foreground">
                  support@taskmaster.com
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-border bg-card shadow-xs hover:border-indigo-500/30 transition-all flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Phone
                </span>
                <span className="text-sm font-bold text-foreground">
                  +977-9800-00000
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-border bg-card shadow-xs hover:border-indigo-500/30 transition-all flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Response Time
                </span>
                <span className="text-sm font-bold text-foreground">
                  Within 24 Hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <div className="bg-card rounded-3xl border border-border shadow-xl shadow-indigo-500/5 overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-500" />
                  Submit a Ticket
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Fill in the details below to alert our technical team directly.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold">Ticket Submitted Successfully!</h4>
                    <p className="text-xs text-emerald-600/80 mt-0.5">
                      Our support team has received your ticket and will follow up shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Phone Input */}
                  <div>
                    {/* UPDATE 2: Removed (Optional) and added required asterisk + required attribute */}
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +977-9800-00000"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      required
                    />
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Bug / Topic Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Login button not responding on mobile"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      required
                    />
                  </div>

                  {/* Description Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] font-semibold text-muted-foreground">
                        {formData.description.length}/{maxChars} characters
                      </span>
                    </div>
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Include steps to reproduce, expected behavior, and what actually happened..."
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                      required
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl border border-input bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white font-bold text-xs hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Ticket
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}