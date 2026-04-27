// config.ts
import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlockComponent',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: false,
    },
  ],
  labels: {
    singular: 'Contact Section',
    plural: 'Contact Sections',
  },
}

export default ContactBlock
