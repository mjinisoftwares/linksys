'use client'

import React, { useState, useMemo } from 'react'
import { ApplicationForm } from './ApplicationForm'

interface Job {
  id: number
  title: string
  department: string
  location: string
  type: string
  salaryRange?: string | null
  summary: string
  description: string
  requirements?: Array<{ requirement: string }> | null
  responsibilities?: Array<{ responsibility: string }> | null
  benefits?: Array<{ benefit: string }> | null
  deadline?: string | null
  featured?: boolean | null
  slug?: string | null
}

interface CareersGridProps {
  jobs: Job[]
  showFilters?: boolean
}

const departmentLabels: Record<string, string> = {
  engineering: 'Engineering',
  'sales-marketing': 'Sales & Marketing',
  'customer-support': 'Customer Support',
  operations: 'Operations',
  finance: 'Finance',
  'human-resources': 'Human Resources',
  management: 'Management',
}

const typeLabels: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  contract: 'Contract',
  internship: 'Internship',
  freelance: 'Freelance',
}

const typeColors: Record<string, string> = {
  'full-time': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  'part-time': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  contract: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  internship: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  freelance: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300',
}

export const CareersGrid: React.FC<CareersGridProps> = ({ jobs, showFilters = true }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [expandedJob, setExpandedJob] = useState<number | null>(null)
  const [applyingTo, setApplyingTo] = useState<Job | null>(null)

  // Get unique departments and types from actual jobs
  const departments = useMemo(() => {
    const deps = [...new Set(jobs.map((j) => j.department))]
    return deps.sort()
  }, [jobs])

  const types = useMemo(() => {
    const ts = [...new Set(jobs.map((j) => j.type))]
    return ts.sort()
  }, [jobs])

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (selectedDepartment !== 'all' && job.department !== selectedDepartment) return false
      if (selectedType !== 'all' && job.type !== selectedType) return false
      return true
    })
  }, [jobs, selectedDepartment, selectedType])

  // Sort: featured first, then by date
  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
  }, [filteredJobs])

  const formatDeadline = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  if (applyingTo) {
    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setApplyingTo(null)}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to all positions
        </button>
        <ApplicationForm job={applyingTo} onBack={() => setApplyingTo(null)} />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {/* Department filter */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-medium
                       focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all cursor-pointer"
          >
            <option value="all">All Departments</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {departmentLabels[dep] || dep}
              </option>
            ))}
          </select>

          {/* Type filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-medium
                       focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all cursor-pointer"
          >
            <option value="all">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {typeLabels[t] || t}
              </option>
            ))}
          </select>

          {(selectedDepartment !== 'all' || selectedType !== 'all') && (
            <button
              onClick={() => {
                setSelectedDepartment('all')
                setSelectedType('all')
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground
                         hover:text-foreground hover:bg-muted transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Jobs List */}
      {sortedJobs.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">No positions found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or check back later for new openings.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedJobs.map((job) => {
            const isExpanded = expandedJob === job.id

            return (
              <div
                key={job.id}
                className={`
                  group relative rounded-2xl border transition-all duration-300
                  ${job.featured
                    ? 'border-accent/30 bg-accent/5 shadow-sm shadow-accent/10'
                    : 'border-border bg-card hover:border-accent/20 hover:shadow-md'
                  }
                `}
              >
                {/* Featured badge */}
                {job.featured && (
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-white text-xs font-semibold shadow-sm">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Featured
                    </span>
                  </div>
                )}

                {/* Main card content */}
                <div
                  className="p-6 md:p-8 cursor-pointer"
                  onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Job icon */}
                    <div className="hidden md:flex w-12 h-12 rounded-xl bg-accent/10 items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </div>

                    {/* Job info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                          </svg>
                          {departmentLabels[job.department] || job.department}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          {job.location}
                        </span>
                        {job.salaryRange && (
                          <span className="inline-flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {job.salaryRange}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right side: badge + chevron */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[job.type] || 'bg-muted text-muted-foreground'}`}>
                        {typeLabels[job.type] || job.type}
                      </span>
                      {job.deadline && (
                        <span className="hidden lg:inline-flex text-xs text-muted-foreground">
                          Deadline: {formatDeadline(job.deadline)}
                        </span>
                      )}
                      <svg
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Summary (always visible) */}
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2 md:pl-16">
                    {job.summary}
                  </p>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-border px-6 md:px-8 pb-8 pt-6 md:pl-24 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Full description */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        About This Role
                      </h4>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
                    </div>

                    {/* Requirements */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {req.requirement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Responsibilities */}
                    {job.responsibilities && job.responsibilities.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                          Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((res, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                              </svg>
                              {res.responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Benefits */}
                    {job.benefits && job.benefits.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                          Benefits & Perks
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.benefits.map((ben, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium"
                            >
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
                              </svg>
                              {ben.benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Deadline + Apply */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        {job.deadline && (
                          <span>
                            Application deadline:{' '}
                            <strong className="text-foreground">{formatDeadline(job.deadline)}</strong>
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setApplyingTo(job)
                        }}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-white font-semibold
                                   hover:bg-accent/90 active:scale-[0.98] transition-all shadow-md shadow-accent/20"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        Apply Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
