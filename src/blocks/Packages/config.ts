import type { Block } from 'payload'

export const PackagesBlock: Block = {
  slug: 'packages',
  interfaceName: 'PackagesBlock',
  labels: {
    singular: 'Packages Block',
    plural: 'Packages Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Our Internet Packages',
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },

    // 🔥 THIS is the key (like media)
    {
      name: 'packages',
      type: 'relationship',
      relationTo: 'packages',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select packages to display',
      },
    },
  ],
}
