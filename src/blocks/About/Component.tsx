'use client'

import React from 'react'
import { Globe, Cog, Shield } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'motion/react'

type AboutBlockProps = {
  title?: string
  subtitle?: string
  description?: string
  companyIntroLabel?: string
  companyStory?: string
  services?: { service?: string }[]
  stats?: { value?: string; label?: string }[]
  image?: { url?: string; alt?: string }
  values?: {
    title?: string
    description?: string
    icon?: 'globe' | 'cog' | 'shield'
  }[]
}

const iconMap = {
  globe: <Globe />,
  cog: <Cog />,
  shield: <Shield />,
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

export const AboutBlock: React.FC<AboutBlockProps> = ({
  title,
  subtitle,
  description,
  companyIntroLabel,
  companyStory,
  services = [],
  stats = [],
  image,
  values = [],
}) => {
  return (
    <section className="py-20 px-6 md:px-12 bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* ================= COMPANY INTRO ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden"
        >
          {image?.url && (
            <div className="absolute inset-0 opacity-8">
              <Image
                src={image.url}
                alt={image.alt || 'About background'}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="relative z-10 max-w-4xl">
            {companyIntroLabel && (
              <div className="flex items-center gap-3 mb-6">
                <div className="size-2.5 bg-accent rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  {companyIntroLabel}
                </span>
              </div>
            )}

            {title && <h2 className="text-4xl font-bold mb-6 text-black">{title}</h2>}

            {companyStory && <p className="text-gray-600 leading-relaxed">{companyStory}</p>}

            {/* SERVICES */}

            {services.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-gray-100">
                {services.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold text-accent bg-accent/10 px-3 py-2 rounded-full border border-gray-100 hover:bg-gray-100 transition"
                  >
                    {item.service}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ================= ABOUT + STATS ================= */}
        {(subtitle || description || stats.length > 0) && (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* TEXT */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {subtitle && (
                <motion.h3 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-black">
                  {subtitle}
                </motion.h3>
              )}

              {description && (
                <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed">
                  {description}
                </motion.p>
              )}

              {stats.length > 0 && (
                <motion.div variants={stagger} className="flex gap-10 pt-4 flex-wrap">
                  {stats.map((stat, i) => (
                    <motion.div key={i} variants={fadeUp}>
                      <div className="text-2xl font-bold text-accent">{stat.value}</div>
                      <div className="text-xs uppercase text-gray-500 font-semibold">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-white border border-gray-100"
            >
              {image?.url && (
                <Image
                  src={image.url}
                  alt={image.alt || 'About image'}
                  fill
                  className="object-cover"
                />
              )}
            </motion.div>
          </div>
        )}

        {/* ================= VALUES ================= */}
        <h3 className="text-3xl md:text-4xl font-bold text-center text-black">
          What Makes Us Different
        </h3>

        {values.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {values.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="size-12 flex items-center justify-center bg-accent/10 text-accent rounded-xl mb-6">
                  {item.icon && iconMap[item.icon]}
                </div>

                <h3 className="text-xl font-bold mb-2 text-black">{item.title}</h3>

                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
