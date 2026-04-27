'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  phone: string
  service: string
  package: string
  location: string
  message: string
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      package: 'DS-HOME BASIC - KSh 2000 (20 Mbps)', // ✅ default
    },
  })

  const onSubmit = (data: FormData) => {
    const phoneNumber = '254713366366'

    const text = `📡 *New Internet Inquiry*

👤 Name: ${data.name}
📧 Email: ${data.email}
📱 Phone: ${data.phone}
🛠 Service: ${data.service}
📦 Package: ${data.package}
📍 Location: ${data.location}

💬 Message:
${data.message}`

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    reset()
  }

  return (
    <section className="w-full px-4 py-12 flex justify-center">
      <div className="w-full max-w-6xl grid md:grid-cols-2 bg-white dark:bg-[#1a1a1a] shadow-2xl overflow-hidden">
        {/* LEFT IMAGE */}
        <div className="hidden md:block relative">
          <img src="/support.webp" alt="Support" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
            <h2 className="text-white text-2xl font-semibold text-center">
              Fast, Reliable Internet for Your Home & Business
            </h2>
          </div>
        </div>

        {/* FORM */}
        <div className="p-6 md:p-10">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-6">Get Connected Today</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <input
              type="text"
              placeholder="Your Name"
              {...register('name', { required: 'Name is required' })}
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#382F81] cursor-pointer"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            {/* Email */}
            <input
              type="email"
              placeholder="Your Email"
              {...register('email', { required: 'Email is required' })}
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#382F81] cursor-pointer"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone Number"
              {...register('phone', { required: 'Phone is required' })}
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#382F81] cursor-pointer"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

            {/* Service */}
            <select
              {...register('service', { required: 'Please select a service' })}
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#382F81] dark:bg-[#1a1a1a] cursor-pointer"
            >
              <option value="">Select a Service</option>
              <option>Home Internet Installation</option>
              <option>Business Internet Setup</option>
              <option>Network Installation</option>
              <option>IT Support</option>
            </select>
            {errors.service && <p className="text-red-500 text-sm">{errors.service.message}</p>}

            {/* PACKAGE (🔥 IMPROVED) */}
            <select
              {...register('package', { required: 'Please select a package' })}
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#382F81] dark:bg-[#1a1a1a] cursor-pointer  "
            >
              <option value="DS-HOME BASIC - KSh 2000 (20 Mbps)">
                🔥 DS-HOME BASIC — KSh 2000 (20 Mbps) [Most Popular]
              </option>
              <option>DS-HOME PRO — KSh 2500 (25 Mbps)</option>
              <option>BUSINESS — KSh 3000 (30 Mbps)</option>
              <option>BUSINESS PRO — KSh 3500 (35 Mbps)</option>
              <option>BUSINESS PREMIUM — KSh 4000 (40 Mbps)</option>
              <option>STUDENT — KSh 1700 (10 Mbps)</option>
              <option>BASE — KSh 1500 (6 Mbps)</option>
            </select>
            {errors.package && <p className="text-red-500 text-sm">{errors.package.message}</p>}

            {/* Location */}
            <input
              type="text"
              placeholder="Your Location (e.g. Nakuru, Molo)"
              {...register('location', { required: 'Location is required' })}
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#382F81] cursor-pointer"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

            {/* Message */}
            <textarea
              rows={4}
              placeholder="Any additional details..."
              {...register('message', { required: 'Message is required' })}
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#382F81] cursor-pointer"
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg font-semibold bg-[#382F81] text-white hover:bg-[#F9640C] transition-colors cursor-pointer"
            >
              {isSubmitting ? 'Sending...' : 'Send via WhatsApp'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
