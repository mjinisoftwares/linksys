import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn(' max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="w-full" key={index}>
                <Card
                  className="h-full overflow-hidden rounded-2xl"
                  doc={result}
                  relationTo="posts"
                  showCategories
                />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
