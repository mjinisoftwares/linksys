import type { Block, Field } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { MediaBlock } from '../MediaBlock/config'
import { Banner } from '../Banner/config'
import { CallToAction } from '../CallToAction/config'
import { linkGroup } from '@/fields/linkGroup'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      { label: 'One Third', value: 'oneThird' },
      { label: 'Half', value: 'half' },
      { label: 'Two Thirds', value: 'twoThirds' },
      { label: 'Full', value: 'full' },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures, defaultFeatures }) => [
        ...rootFeatures,
        ...defaultFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        BlocksFeature({ blocks: [MediaBlock, Banner, CallToAction] }),
      ],
    }),
    label: false,
  },
  linkGroup({
    overrides: {
      maxRows: 2,
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: false,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Section Subtitle',
      required: false,
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
