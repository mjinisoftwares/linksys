'use client'

import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  return (
    <article
      ref={card.ref}
      className={cn(
        'border border-border rounded-2xl overflow-hidden bg-background hover:shadow-md transition cursor-pointer',
        className,
      )}
    >
      {/* ✅ FIXED IMAGE CONTAINER */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
        {!metaImage && (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            No image
          </div>
        )}

        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} size="33vw" imgClassName="w-full h-full object-cover" />
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {showCategories && hasCategories && (
          <div className="uppercase text-xs tracking-wide text-muted-foreground mb-4">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {category.title}
                    {!isLast && ', '}
                  </Fragment>
                )
              }
              return null
            })}
          </div>
        )}

        {titleToUse && (
          <h3 className="text-xl font-semibold leading-snug">
            <Link href={href} ref={link.ref} className="hover:underline">
              {titleToUse}
            </Link>
          </h3>
        )}

        {description && (
          <p className="mt-2 text-base text-muted-foreground line-clamp-2">
            {sanitizedDescription}
          </p>
        )}
      </div>
    </article>
  )
}
