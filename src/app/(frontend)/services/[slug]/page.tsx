import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { ServiceHero } from '@/heros/ServicesHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = services.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ServicePage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/services/' + decodedSlug
  const service = await queryServiceBySlug({ slug: decodedSlug })

  if (!service) return <PayloadRedirects url={url} />

  return (
    <article className="bg-secondary/10">
      <PageClient />

      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Hero */}
      <ServiceHero service={service} />

      {/* Content Section */}
      <section className="relative z-30 pb-28">
        <div className="container">
          <div
            className="
        relative mx-auto mt-[-10%] max-w-3xl rounded-2xl shadow-2xl
        px-6 py-10 md:px-12 md:py-12
        
        bg-white text-gray-900
        dark:bg-[#1e1b2e] dark:text-gray-100
        
        backdrop-blur-md border border-black/5 dark:border-white/10
      "
          >
            <RichText
              data={service.content}
              enableGutter={false}
              className="
          prose mx-auto max-w-none
          
          prose-headings:font-bold
          prose-headings:tracking-tight
          
          prose-h1:text-3xl md:prose-h1:text-4xl
          prose-h2:text-2xl md:prose-h2:text-3xl
          
          prose-p:text-base md:prose-p:text-lg
          prose-p:leading-relaxed
          
          prose-a:text-[#77bc43] hover:prose-a:opacity-80
          
          prose-strong:font-semibold
          
          dark:prose-invert
        "
            />
          </div>
        </div>
      </section>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const service = await queryServiceBySlug({ slug: decodedSlug })

  return generateMeta({ doc: service })
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
