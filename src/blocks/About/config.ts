import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const AboutBlock: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
      admin: {
        description: 'The main headline for the about section',
      },
    },
    {
      name: 'companyIntroLabel',
      type: 'text',
      label: 'Company Intro Label',
      admin: {
        description: 'Small label above the main title (e.g., "Company Introduction")',
      },
    },
    {
      name: 'companyStory',
      type: 'textarea',
      label: 'Company Story',
      admin: {
        description: 'The main company story/description text',
        rows: 4,
      },
    },
    {
      name: 'services',
      type: 'array',
      label: 'Services',
      fields: [
        {
          name: 'service',
          type: 'text',
          label: 'Service Name',
        },
      ],
      admin: {
        description:
          'List of services (Hotspot & Public Wi-Fi Broadcating, Wireless and Structured Cabling Networking,CCTV @ Security Solutions, IT Support & Managed Services)',
      },
      defaultValue: [
        { service: 'Hotspot & Public Wi-Fi Broadcating' },
        { service: 'Wireless and Structured Cabling Networking' },
        { service: 'CCTV @ Security Solutions' },
        { service: 'IT Support & Managed Services' },
      ],
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'About Section Subtitle',
      admin: {
        description: 'Subtitle for the about section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'About/Who We Are Section Description',
      admin: {
        description: 'Description text for the about/who we are section',
        rows: 3,
      },
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Stat Value',
          admin: {
            description: 'e.g., "99.99%" or "1.2ms"',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Stat Label',
          admin: {
            description: 'e.g., "Quick Installation" or "24/7 Support" or "High Speed Internet"',
          },
        },
      ],
      admin: {
        description: 'Key statistics to display',
      },
    },
    // Image
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'values',
      type: 'array',
      label: 'Values',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Value Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Value Description',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Value Icon',
          required: true,
          options: [
            { label: 'Globe', value: 'globe' },
            { label: 'Cog', value: 'cog' },
            { label: 'Shield', value: 'shield' },
          ],
        },
      ],
      admin: {
        description: 'Values grid items (recommended: 3 items)',
      },
    },
  ],
  labels: {
    plural: 'About Blocks',
    singular: 'About Block',
  },
}
