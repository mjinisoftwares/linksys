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

/* 🔥 Cleaner animation variants (IMPORTANT) */
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
    <section className="py-16 px-6 md:px-12 text-black overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* ================= COMPANY INTRO ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-[#63B5D3]/30 relative overflow-hidden"
        >
          {image?.url && (
            <div className="absolute inset-0 hidden lg:block">
              <Image
                src={image.url}
                alt={image.alt || 'About background'}
                fill
                className="object-cover opacity-[0.05]"
              />
            </div>
          )}

          <div className="relative z-10 max-w-4xl">
            {companyIntroLabel && (
              <div className="flex items-center gap-3 mb-6">
                <div className="size-2.5 bg-accent rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent">
                  {companyIntroLabel}
                </span>
              </div>
            )}

            {title && (
              <h2 className="text-4xl font-bold leading-tight mb-6 text-black/80">{title}</h2>
            )}

            {companyStory && <p className="text-zinc-500 mb-8">{companyStory}</p>}

            {/* SERVICES */}
            {services.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-4 border-t border-accent/60">
                {services.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold text-[#02659C] bg-[#63B5D3]/10 px-3 py-1 rounded-full hover:bg-[#63B5D3]/20 transition"
                  >
                    {item.service}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ================= ABOUT / STATS ================= */}
        {(subtitle || description || stats.length > 0) && (
          <div className="grid lg:grid-cols-2 gap-10 items-center px-4">
            {/* TEXT */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-5"
            >
              {subtitle && (
                <motion.h3
                  variants={fadeUp}
                  className="text-3xl md:text-4xl font-bold text-zinc-600"
                >
                  {subtitle}
                </motion.h3>
              )}

              {description && (
                <motion.p variants={fadeUp} className="text-zinc-500">
                  {description}
                </motion.p>
              )}

              {stats.length > 0 && (
                <motion.div variants={stagger} className="flex gap-8 pt-4 flex-wrap">
                  {stats.map((stat, i) => (
                    <motion.div key={i} variants={fadeUp}>
                      <div className="text-2xl font-bold text-accent">{stat.value}</div>
                      <div className="text-xs uppercase text-accent font-semibold">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative aspect-[16/10] rounded-3xl overflow-hidden"
            >
              {image?.url && (
                <>
                  <Image
                    src={image.url}
                    alt={image.alt || 'About image'}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#02659C]/60 mix-blend-multiply" />
                </>
              )}
            </motion.div>
          </div>
        )}

        <div className="h-1 bg-accent" />

        {/* ================= VALUES ================= */}
        <h3 className="text-zinc-600 px-4 text-3xl md:text-4xl font-bold text-center">
          What Makes Us Different
        </h3>

        {values.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="px-4 grid md:grid-cols-3 gap-8"
          >
            {values.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 bg-white border border-[#63B5D3]/20 rounded-3xl shadow-sm hover:shadow-md transition"
              >
                <div className="size-12 flex items-center justify-center bg-accent/10 text-accent rounded-xl mb-6">
                  {item.icon && iconMap[item.icon]}
                </div>

                <h3 className="text-xl font-bold mb-2 text-[#02659C]">{item.title}</h3>

                <p className="text-sm text-zinc-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
