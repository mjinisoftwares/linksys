import React from 'react'
import type { Page, Post } from '@/payload-types'
import type { Media as MediaType } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type HeroProps = {
  type?: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact'
  richText?: DefaultTypedEditorState | null
  links?: Array<{
    link: {
      type?: ('reference' | 'custom') | null
      newTab?: boolean | null
      reference?: { relationTo: 'pages' | 'posts'; value: number | Page | Post } | null
      url?: string | null
      label: string
      look?: ('default' | 'outline' | 'primary' | 'secondary' | 'accent') | null
    }
    id?: string | null
  }> | null
  media?:
    | {
        mobile?: number | MediaType
        tablet?: number | MediaType
        desktop?: number | MediaType
        id?: string | null
      }
    | Array<{
        mobile?: number | MediaType
        tablet?: number | MediaType
        desktop?: number | MediaType
        id?: string | null
      }>
    | null
}

export const MediumImpactHero: React.FC<HeroProps> = ({ links, media, richText }) => {
  // Convert to array if media is a single object
  const mediaArray = Array.isArray(media) ? media : media ? [media] : []

  return (
    <div className="relative w-full">
      <div className="container mb-8">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
        {links?.length && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="container">
        {mediaArray.map((item, index) => (
          <div key={item?.id || index} className="media-container">
            <div className="block md:hidden">
              {item?.mobile && <Media className="w-full h-auto" resource={item.mobile} priority />}
            </div>
            <div className="hidden md:block lg:hidden">
              {item?.tablet && <Media className="w-full h-auto" resource={item.tablet} priority />}
            </div>
            <div className="hidden lg:block">
              {item?.desktop && (
                <Media className="w-full h-auto" resource={item.desktop} priority />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
