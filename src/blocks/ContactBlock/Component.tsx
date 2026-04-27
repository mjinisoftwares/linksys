// WhyChooseUsBlockComponent.tsx
import React from 'react'
import Cta from '@/components/CTA'
import ContactForm from '@/components/Contact'

// Define the props for this block, matching the config.
export type ContactBlockProps = {
  heading?: string
  id?: string
}

const ContactBlock: React.FC<ContactBlockProps> = ({ id }) => {
  return (
    <section id={`block-${id}`}>
      {/* {heading && <h2 className="text-2xl font-semibold mb-4 text-center">{heading}</h2>} */}
      <ContactForm />
    </section>
  )
}

export default ContactBlock
