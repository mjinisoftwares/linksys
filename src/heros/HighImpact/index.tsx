'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

interface HighImpactHeroProps {
  links?: Page['hero']['links']
  media?: Page['hero']['media']
  richText?: Page['hero']['richText']
}

export const HighImpactHero: React.FC<HighImpactHeroProps> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <section
      className="relative mt-8 min-h-screen w-full overflow-hidden"
      data-theme="dark"
      aria-label="Hero sec  tion"
    >
      {/* Background Media */}
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 -z-10">
          <Media
            fill
            priority
            className="h-full w-full"
            imgClassName="object-cover"
            resource={media}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" />
        </div>
      )}

      {/* Content Container */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-20 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="prose prose-invert mx-auto max-w-5xl text-center">
            {/* Rich Text Content */}
            {richText && (
              <RichText
                className="[&_h1]:mb-4 
                  [&_h1]:font-bold 
                  [&_h1]:tracking-tight
                  [&_h1]:text-white
                  [&_h1]:text-4xl
                  [&_h1]:leading-tight
                  sm:[&_h1]:text-5xl
                  
                  [&_h2]:text-[#77bc43]
                  [&_h2]:mt-4
                  [&_h2]:bg-primary
                  [&_h2]:max-w-fit
                  [&_h2]:mx-auto
                  [&_h2]:font-semibold
                  [&_p]:text-base
                  [&_p]:text-white/90
                  [&_p]:leading-relaxed                
                  [&_p]:max-w-3xl
                  [&_p]:mx-auto
                  [&_p]:mt-4
                  [&_strong]:text-white
                  [&_a]:text-primary-foreground
                  [&_a]:hover:opacity-80"
                data={richText}
                enableGutter={false}
              />
            )}

            {/* Call to Action Links */}
            {Array.isArray(links) && links.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:mt-10">
                {links.map(({ link }, index) => {
                  // First link gets accent style, others get default
                  const isAccent = index === 0

                  return (
                    <div key={index}>
                      <CMSLink
                        {...link}
                        className={
                          isAccent
                            ? ' items-center justify-center px-8 py-6 text-sm font-medium rounded-full shadow-lg bg-[#77bc43] text-white hover:bg-[#66a83a] transition-colors duration-200'
                            : ' items-center justify-center px-8 py-6 text-sm font-medium rounded-full border border-white/30 bg-primary text-white backdrop-blur-sm hover:bg-primary/80 transition-colors duration-200'
                        }
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce md:block">
        <div className="h-10 w-6 rounded-full border-2 border-white/50">
          <div className="mx-auto mt-2 h-2 w-1 animate-pulse rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  )
}
