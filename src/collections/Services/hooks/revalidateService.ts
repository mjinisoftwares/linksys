import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Service } from '../../../payload-types'

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/services/${doc.slug}`

    payload.logger.info(`Revalidating service at path: ${path}`)

    revalidatePath(path)
    revalidateTag('services-sitemap', 'max')

    // If the service was previously at a different slug, revalidate the old path too
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      const oldPath = `/services/${previousDoc.slug}`

      payload.logger.info(`Revalidating old service at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('services-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Service> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/services/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('services-sitemap', 'max')
  }

  return doc
}
