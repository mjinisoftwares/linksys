'use client'

import React from 'react'
import { motion, easeInOut } from 'framer-motion'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

type ContentColumn = {
  size?: 'oneThird' | 'half' | 'twoThirds' | 'full'
  richText?: any
  links?: {
    link: {
      type?: string
      url?: string
      newTab?: boolean
      label?: string
    }
  }[]
  style?: string
  animation?: 'pulse' | 'fade' | 'zoom' | 'none'
  cardBackground?: string
}

type ContentBlockProps = {
  title?: string
  subtitle?: string
  blockBackground?: string
  columns?: ContentColumn[]
}

const colsSpanClasses = {
  full: '12',
  half: '6',
  oneThird: '4',
  twoThirds: '8',
} as const

export const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  subtitle,
  blockBackground,
  columns,
}) => {
  const baseAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: easeInOut },
    viewport: { once: true, amount: 0.3 },
  }

  return (
    <motion.section
      {...baseAnimation}
      className={cn(
        blockBackground || 'bg-gray-100',
        'px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-16 md:py-20 lg:py-24',
      )}
    >
      <div className="max-w-screen-2xl mx-auto">
        {(title || subtitle) && (
          <motion.div {...baseAnimation} className="text-center md:mb-12">
            {title && (
              <h2 className="text-3xl md:text-5xl font-bold text-primary/80 mb-4 tracking-normal">
                {title}
              </h2>
            )}
            {subtitle && (
              <h3 className="text-lg md:text-2xl font-medium text-secondary mb-4">{subtitle}</h3>
            )}
            <motion.hr
              layoutId="underline"
              className="w-24 md:w-48 h-1 rounded-full bg-accent mx-auto mb-4"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0.6, 1, 0.6] }}
              transition={{
                scaleX: { duration: 0.6, ease: 'easeInOut' },
                opacity: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: 0.4,
                },
              }}
              style={{ transformOrigin: 'center' }}
            />
          </motion.div>
        )}

        <div className="grid grid-cols-4 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12">
          {columns?.map((col, index) => {
            const {
              richText,
              size = 'oneThird',
              links,
              animation = 'pulse',
              // style = 'shadow-md',
              cardBackground = '',
            } = col

            const animationStyles =
              animation === 'fade'
                ? {
                    initial: { opacity: 0 },
                    whileInView: { opacity: 1 },
                    transition: { duration: 1, ease: easeInOut },
                    viewport: { once: true, amount: 0.3 },
                  }
                : animation === 'zoom'
                  ? {
                      initial: { scale: 0.95, opacity: 0 },
                      whileInView: { scale: 1, opacity: 1 },
                      transition: { duration: 1, ease: easeInOut },
                      viewport: { once: true, amount: 0.3 },
                    }
                  : animation === 'pulse'
                    ? {
                        animate: {
                          opacity: [0.9, 1, 0.9],
                          scale: [0.98, 1, 0.98],
                        },
                        transition: {
                          duration: 1.5,
                          ease: easeInOut,
                          repeat: Infinity,
                          repeatType: 'reverse' as const,
                        },
                      }
                    : {}

            return (
              <motion.div
                key={index}
                {...baseAnimation}
                className={cn(
                  `col-span-4 lg:col-span-${colsSpanClasses[size]}`,
                  'flex h-full transition-all duration-300 hover:translate-y-[-2px]',
                )}
              >
                <motion.div
                  {...animationStyles}
                  className={cn(
                    'flex flex-col justify-center h-full w-full p-4 rounded-xl',

                    cardBackground,
                  )}
                >
                  {richText && (
                    <RichText
                      className={cn(
                        'text-base font-normal leading-relaxed space-y-4',
                        'prose prose-slate max-w-none',
                        'prose-h1:mt-6 prose-h1:text-5xl prose-h1:font-bold prose-h1:leading-tight prose-h1:text-slate-900',
                        'prose-h2:text-4xl prose-h2:font-extrabold prose-h2:text-primary/90',
                        'prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-primary/80',
                        'prose-h4:text-xl prose-h4:font-semibold prose-h4:text-primary/80',
                        'prose-p:text-base prose-p:text-slate-600',
                        'prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-a:underline underline-offset-4',
                        'prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-slate-400',
                        'prose-hr:border-accent',
                      )}
                      data={richText}
                      enableGutter={false}
                    />
                  )}

                  {Array.isArray(links) && links.length > 0 && (
                    <div className="flex gap-4 pt-8">
                      {links.map(({ link }, i) => (
                        <motion.div key={i} className="inline-block">
                          <CMSLink
                            {...{
                              ...link,
                              type:
                                link.type === 'custom' ||
                                link.type === 'reference' ||
                                link.type === null
                                  ? link.type
                                  : undefined,
                            }}
                            className="font-medium transition-all hover:scale-105"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
