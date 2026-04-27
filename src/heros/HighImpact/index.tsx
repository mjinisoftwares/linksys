'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'
import type { Media } from '@/payload-types'
import RichText from '@/components/RichText'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import type { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface HeroMediaItem {
  mobile?: Media | number
  desktop?: Media | number
}

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const controls = useAnimation()

  const slides: HeroMediaItem[] =
    media && 'media' in media && Array.isArray(media.media) ? media.media : []

  useEffect(() => {
    setHeaderTheme('light')

    // Animate content on slide change
    controls.start('visible')
  }, [currentIndex, controls, setHeaderTheme])

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
      }, 7000)

      return () => clearInterval(interval)
    }
  }, [slides.length])

  // Animation variants with proper typing
  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const, // Proper easing curve type
      },
    },
  }

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <section className="bg-primary relative w-full h-screen  overflow-hidden items-center justify-center ">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait" initial={false}>
          {slides.map((slide, index) =>
            index === currentIndex ? (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="absolute inset-0 w-full h-screen"
              >
                {/* Mobile */}
                <div className="md:hidden w-full h-screen">
                  {slide.mobile && (
                    <MediaComponent
                      resource={slide.mobile}
                      imgClassName="object-cover w-full h-screen"
                      priority
                    />
                  )}
                </div>

                {/* Desktop */}
                <div className="hidden lg:block w-full h-screen">
                  {slide.desktop && (
                    <MediaComponent
                      resource={slide.desktop}
                      imgClassName="object-cover w-full h-screen"
                    />
                  )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 z-10" />
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-4 sm:px-6 ">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={contentVariants}
          className="w-full max-w-5xl flex flex-col items-center justify-center text-center "
        >
          {richText && (
            <RichText
              className={cn(
                'text-gray-300 space-y-4 md:space-y-6',
                'prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:font-bold prose-h1:leading-tight prose-h1:mb-4',
                'prose-h2:text-xl prose-h2:mt-2 prose-h2:bg-primary prose-h2:max-w-3xl prose-h2:mx-auto prose-h2:text-accent',
                'prose-p:text-base prose-p:mx-auto',
                'prose-strong:font-semibold prose-em:italic',
                'drop-shadow-lg',
              )}
              data={richText}
              enableGutter={false}
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <motion.div
              className="flex flex-wrap justify-center gap-3 md:gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {links.map(({ link }, i) => (
                <motion.div key={i} variants={buttonVariants}>
                  <CMSLink
                    {...link}
                    className="font-medium transition-all hover:scale-105 focus:scale-105 mt-8 rounded-full  border  px-8 py-6 text-sm  focus:outline-none focus:ring-2 focus:ring-white/50 mx-auto"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Navigation dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Bottom SVG Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          className="w-full md:h-full text-secondary/90"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,96L48,90C96,85,192,75,288,80C384,85,480,107,576,112C672,117,768,107,864,96C960,85,1056,75,1152,69.3C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
