// config.ts
import type { Block } from 'payload'

export const WhyChooseUsBlock: Block = {
  slug: 'whyChooseUs',
  interfaceName: 'WhyChooseUsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: false,
    },
  ],
  labels: {
    singular: 'Why Choose Us Section',
    plural: 'Why Choose Us Sections',
  },
}

export default WhyChooseUsBlock
