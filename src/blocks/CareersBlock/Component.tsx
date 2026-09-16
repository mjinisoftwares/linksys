import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { CareersGrid } from './CareersGrid'

interface CareersBlockProps {
  id?: string
  heading?: string
  subheading?: string
  showFilters?: boolean
}

export const CareersBlockComponent: React.FC<CareersBlockProps> = async (props) => {
  const { id, heading, subheading, showFilters = true } = props

  const payload = await getPayload({ config: configPromise })

  const careers = await payload.find({
    collection: 'careers',
    depth: 0,
    limit: 100,
    where: {
      status: {
        equals: 'open',
      },
    },
    sort: '-createdAt',
  })

  return (
    <section id={`block-${id}`} className="w-full py-20 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        {heading && (
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subheading}
          </p>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-1 w-12 rounded-full bg-accent" />
          <span className="text-sm font-medium text-accent">
            {careers.totalDocs} Open Position{careers.totalDocs !== 1 ? 's' : ''}
          </span>
          <div className="h-1 w-12 rounded-full bg-accent" />
        </div>
      </div>

      {/* Client Component for filtering + interaction */}
      <CareersGrid jobs={careers.docs} showFilters={showFilters} />
    </section>
  )
}

export default CareersBlockComponent
