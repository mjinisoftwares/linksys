import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return posts.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise

  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug

  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="relative bg-gradient-to-b from-primary/10 via-transparent to-transparent pt-16 pb-20">
      <PageClient />

      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* 🔥 HERO */}
      <PostHero post={post} />

      {/* 🔥 CONTENT WRAPPER */}
      <section className="relative z-30">
        <div className="container">
          <div
            className="
              relative mx-auto mt-[-4rem] max-w-3xl rounded-2xl shadow-2xl
              px-6 py-10 md:px-12 md:py-12
              
              bg-white text-gray-900
              dark:bg-[#1e1b2e] dark:text-gray-100
              
              backdrop-blur-md border border-black/5 dark:border-white/10
            "
          >
            {/* ✍️ CONTENT */}
            <RichText
              data={post.content}
              enableGutter={false}
              className="
                prose mx-auto max-w-none
                
                prose-headings:font-bold
                prose-headings:tracking-tight
                
                prose-h1:text-3xl md:prose-h1:text-4xl
                prose-h2:text-2xl md:prose-h2:text-3xl
                
                prose-p:text-base 
                prose-p:leading-relaxed
                
                prose-a:text-[#77bc43] hover:prose-a:opacity-80
                
                prose-strong:font-semibold
                
                dark:prose-invert
              "
            />
          </div>
        </div>
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <RelatedPosts
            className="px-8 md:px-12 lg:px-16  mt-12 max-w-[32rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
            docs={post.relatedPosts.filter((post) => typeof post === 'object')}
          />
        )}
      </section>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: { equals: slug },
    },
    select: {
      title: true,
      slug: true,
      heroImage: true,
      content: true,
      relatedPosts: true,
      authors: true,
      categories: true,
      publishedAt: true,
      updatedAt: true,
      createdAt: true,
      _status: true,
    },
  })

  return result.docs?.[0] || null
})
