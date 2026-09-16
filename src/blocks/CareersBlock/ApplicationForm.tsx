'use client'

import React, { useState, useRef } from 'react'
import { getClientSideURL } from '@/utilities/getURL'

interface Job {
  id: number
  title: string
  department: string
  location: string
  type: string
}

interface ApplicationFormProps {
  job: Job
  onBack: () => void
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ job, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    experience: '',
    coverLetter: '',
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // 1. Upload resume first
      let resumeId: number | null = null

      if (resumeFile) {
        const uploadData = new FormData()
        uploadData.append('file', resumeFile)
        uploadData.append('alt', `Resume - ${formData.fullName}`)

        const uploadRes = await fetch(`${getClientSideURL()}/api/media`, {
          method: 'POST',
          body: uploadData,
        })

        if (!uploadRes.ok) {
          throw new Error('Failed to upload resume. Please try again.')
        }

        const uploadResult = await uploadRes.json()
        resumeId = uploadResult.doc?.id
      }

      // 2. Create job application
      const applicationPayload: Record<string, any> = {
        position: job.id,
        positionTitle: job.title,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        status: 'new',
      }

      if (formData.location) applicationPayload.location = formData.location
      if (formData.linkedIn) applicationPayload.linkedIn = formData.linkedIn
      if (formData.experience) applicationPayload.experience = formData.experience
      if (formData.coverLetter) applicationPayload.coverLetter = formData.coverLetter
      if (resumeId) applicationPayload.resume = resumeId

      const res = await fetch(`${getClientSideURL()}/api/job-applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationPayload),
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.errors?.[0]?.message || 'Failed to submit application.')
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 md:p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-3">Application Submitted!</h3>
        <p className="text-muted-foreground mb-2">
          Thank you for applying for <strong className="text-foreground">{job.title}</strong>.
        </p>
        <p className="text-muted-foreground mb-8">
          We'll review your application and get back to you soon.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-semibold
                     hover:bg-accent/90 transition-all"
        >
          View More Positions
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          Applying for
        </div>
        <h3 className="text-2xl font-bold">{job.title}</h3>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
          </div>
        </div>

        {/* Phone & Location */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254 7XX XXX XXX"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Current Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Nairobi, Kenya"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
          </div>
        </div>

        {/* Experience & LinkedIn */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Years of Experience</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all cursor-pointer"
            >
              <option value="">Select...</option>
              <option value="0-1">0 - 1 years</option>
              <option value="1-3">1 - 3 years</option>
              <option value="3-5">3 - 5 years</option>
              <option value="5-10">5 - 10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
            <input
              type="url"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
          </div>
        </div>

        {/* Resume upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Resume / CV *</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative w-full p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all text-center
              ${resumeFile
                ? 'border-accent/50 bg-accent/5'
                : 'border-border hover:border-accent/30 hover:bg-accent/5'
              }
            `}
          >
            {resumeFile ? (
              <div className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium">{resumeFile.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setResumeFile(null)
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <svg className="w-8 h-8 mx-auto mb-2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-sm text-muted-foreground">
                  Click to upload your resume (PDF, DOC, DOCX)
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              required={!resumeFile}
              onChange={(e) => {
                if (e.target.files?.[0]) setResumeFile(e.target.files[0])
              }}
            />
          </div>
        </div>

        {/* Cover letter */}
        <div>
          <label className="block text-sm font-medium mb-2">Cover Letter</label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us why you're the perfect fit for this role..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm resize-none
                       focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full
                     bg-accent text-white font-bold text-base
                     hover:bg-accent/90 active:scale-[0.98] transition-all shadow-lg shadow-accent/20
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              Submit Application
            </>
          )}
        </button>
      </form>
    </div>
  )
}
