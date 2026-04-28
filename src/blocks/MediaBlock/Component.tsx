import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    breakout,
  } = props

  const caption = media && typeof media === 'object' ? media.caption : undefined

  return (
    <section
      className={cn(
        'relative my-16',
        {
          container: enableGutter && !breakout,
          'w-full': breakout,
        },
        className,
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl shadow-xl',
          breakout ? 'w-full max-h-[70vh]' : 'mx-auto max-w-5xl max-h-[65vh]',
        )}
      >
        {(media || staticImage) && (
          <Media
            resource={media}
            src={staticImage}
            imgClassName={cn(
              'w-full h-full object-cover transition-transform duration-700 hover:scale-105',
              imgClassName,
            )}
          />
        )}

        {/* subtle overlay for better visual depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-black/30" />
      </div>

      {/* Caption */}
      {caption && (
        <div
          className={cn(
            'mt-6 text-center',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText
            data={caption}
            enableGutter={false}
            className="
              prose mx-auto max-w-2xl
              text-sm md:text-base
              text-gray-600 dark:text-gray-300
              dark:prose-invert
            "
          />
        </div>
      )}
    </section>
  )
}
