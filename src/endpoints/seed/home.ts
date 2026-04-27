import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
}) => {
  return {
    slug: 'home',
    _status: 'published',

    hero: {
      type: 'highImpact',

      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'All posts',
            url: '/posts',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'Contact',
            url: '/contact',
          },
        },
      ],

      // ✅ FIXED: matches your new group + array structure
      media: {
        media: [
          {
            mobile: heroImage.id,
            desktop: heroImage.id,
          },
        ],
      },

      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h1',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Payload Website Template',
                  version: 1,
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },

    layout: [
      {
        blockName: 'Media Block',
        blockType: 'mediaBlock',
        media: metaImage.id,
      },
    ],

    meta: {
      description: 'An open-source website built with Payload and Next.js.',
      image: heroImage.id,
      title: 'Payload Website Template',
    },

    title: 'Home',
  }
}
