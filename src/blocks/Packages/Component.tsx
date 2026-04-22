'use client'

import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/utilities/ui'

import type { PackagesBlock as PackagesBlockProps } from '@/payload-types'

type Props = PackagesBlockProps & {
  className?: string
}

export const PackagesBlock: React.FC<Props> = ({ title, subtitle, packages, className }) => {
  if (!packages || packages.length === 0) return null

  return (
    <section
      className={cn(
        'py-16 md:py-24 bg-gradient-to-br from-[#F4FAFD] via-white to-[#F4FAFD]',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center space-y-4 mb-12"
        >
          {title && <h2 className="text-3xl md:text-4xl font-bold text-zinc-600">{title}</h2>}
          {subtitle && <p className="text-zinc-5  00 text-lg">{subtitle}</p>}
        </motion.div>

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((pkg: any, i: number) => {
            if (typeof pkg === 'string') return null

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="group flex flex-col h-full rounded-2xl bg-white border border-[#63B5D3]/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* TOP */}
                  <div className="p-8">
                    {/* 🔥 SPEED FIRST (HERO) */}
                    {pkg.internetSpeed && (
                      <div className="mb-4">
                        <p className="text-4xl font-extrabold text-[#02659C] leading-none">
                          {pkg.internetSpeed}
                        </p>
                        <p className="text-sm font-semibold uppercase tracking-widest text-accent mt-1">
                          High-Speed Internet
                        </p>
                        <hr className="border-accent/60 mt-4" />
                      </div>
                    )}

                    {/* PRICE */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-semibold text-zinc-500">KSh</span>
                        <span className="text-2xl font-bold text-zinc-800">
                          {pkg.price?.toLocaleString()}
                        </span>
                        <span className="text-sm text-zinc-400">/mo</span>
                      </div>
                    </div>

                    {/* PLAN NAME */}
                    <h3 className="text-base font-semibold uppercase tracking-wider text-accent">
                      Package: {pkg.title}
                    </h3>
                  </div>

                  {/* FEATURES */}
                  <div className="px-6 pb-6 flex-1">
                    <ul className="space-y-3 text-sm">
                      {pkg.features?.map((f: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="size-4 mt-0.5 text-[#77BC43]" />
                          <span className="text-zinc-700">{f.feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="p-6 pt-0 mt-auto">
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="block w-full text-center rounded-lg bg-[#02659C] text-white py-3 font-semibold hover:bg-[#014a73] transition-all duration-300"
                    >
                      Get Connected →
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
