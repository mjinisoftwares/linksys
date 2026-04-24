'use client'

import React from 'react'
import { format } from 'date-fns'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

import type { Post } from '@/payload-types'

interface PostHeroProps {
  post: Post
  className?: string
}

export const PostHero: React.FC<PostHeroProps> = ({ post, className }) => {
  const { title, heroImage, publishedAt, updatedAt, authors } = post

  return (
    <section className={cn('mt-24 mb-4', className)}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          {/* AUTHOR + DATE */}

          {/* TITLE */}
          <h1 className="max-w-5xl text-4xl font-bold text-pretty leading-tight">{title}</h1>

          {/* HERO IMAGE */}
          {heroImage && typeof heroImage !== 'string' && (
            <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border shadow-sm">
              <Media priority imgClassName="w-full h-full object-cover" resource={heroImage} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
