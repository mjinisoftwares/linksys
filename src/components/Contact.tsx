'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  phone: string
  message: string
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    const phoneNumber = '254729396862' // your WhatsApp number

    const text = `Hello, I have a new inquiry:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Message: ${data.message}`

    const encodedText = encodeURIComponent(text)
    const url = `https://wa.me/${phoneNumber}?text=${encodedText}`

    window.open(url, '_blank')
    reset()
  }

  return (
    <section className="w-full flex justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1a1a1a] shadow-xl rounded-2xl p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Contact Us</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              {...register('name', { required: 'Name is required' })}
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Your Email"
              {...register('email', { required: 'Email is required' })}
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              {...register('phone', { required: 'Phone is required' })}
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Message */}
          <div>
            <textarea
              placeholder="Your Message"
              rows={5}
              {...register('message', { required: 'Message is required' })}
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-semibold bg-[#382F81] text-white hover:opacity-90 transition"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}
