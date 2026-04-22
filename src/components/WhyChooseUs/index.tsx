'use client'

import { Shield, Star, Clock, Users } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Reliable Internet',
    description:
      'We deliver stable and secure internet in Molo, ensuring consistent connectivity for homes and businesses without interruptions.',
  },
  {
    icon: Star,
    title: 'High-Speed Internet',
    description:
      'Our network is optimized for fast browsing, streaming, and business operations, even during peak usage.',
  },
  {
    icon: Clock,
    title: 'Fast Installation',
    description:
      'We provide quick and professional setup, getting you connected in the shortest time possible.',
  },
  {
    icon: Users,
    title: '24/7 Support',
    description:
      'Our team is always available to resolve issues quickly and keep your internet running smoothly at all times.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-primary backdrop-blur-lg">
      <div className="mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose Us</h2>

          <p className="text-[#E2E8F0]">
            We are committed to providing the best real estate experience in Nairobi
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg transition-all duration-300 hover:bg-white/20 hover:shadow-2xl animate-blink"
            >
              {/* Glassmorphism Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/20 to-[#123063]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* Icon with Glass Effect */}
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white border border-[#2E6CFF]/20 shadow-inner">
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 text-white  transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#E2E8F0]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
