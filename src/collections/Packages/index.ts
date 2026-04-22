import { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Packages: CollectionConfig<'packages'> = {
  slug: 'packages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    // Internet Speed
    {
      name: 'internetSpeed',
      type: 'text',
      required: true,
    },
    // Features
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
