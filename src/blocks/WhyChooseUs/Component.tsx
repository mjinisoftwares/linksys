// WhyChooseUsBlockComponent.tsx
import React from 'react'
import WhyChooseUs from '@/components/WhyChooseUs'

// Define the props for this block, matching the config.
export type WhyChooseUsBlockProps = {
  heading?: string
  id?: string
}

const WhyChooseUsBlock: React.FC<WhyChooseUsBlockProps> = ({ id }) => {
  return (
    <section id={`block-${id}`} className="my-16 md:my-20">
      {/* {heading && <h2 className="text-2xl font-semibold mb-4 text-center">{heading}</h2>} */}
      <WhyChooseUs />
    </section>
  )
}

export default WhyChooseUsBlock
