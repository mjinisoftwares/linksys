import type { Block } from 'payload'

export const CareersBlock: Block = {
  slug: 'careersBlock',
  interfaceName: 'CareersBlock',
  labels: {
    singular: 'Careers Section',
    plural: 'Careers Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Join Our Team',
      label: 'Section Heading',
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'Explore exciting career opportunities and be part of something great',
      label: 'Section Subheading',
    },
    {
      name: 'showFilters',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Department & Type Filters',
    },
  ],
}
