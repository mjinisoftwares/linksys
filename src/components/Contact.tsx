'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  phone: string
  service: string
  location: string
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
    const phoneNumber = '254729396862'

    const text = `Hello, I have a new inquiry:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service}
Location: ${data.location}
Message: ${data.message}`

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    reset()
  }

  return (
    <section className="w-full px-4 py-12 flex justify-center">
      <div className="w-full max-w-6xl grid md:grid-cols-2 bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-2xl overflow-hidden">
        {/* LEFT: IMAGE */}
        <div className="hidden md:block relative">
          <img
            src="/support.webp" // 👉 replace with your image
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
            <h2 className="text-white text-3xl font-semibold text-center">
              Let’s Build Something Powerful
            </h2>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Contact Us</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Your Name"
                {...register('name', { required: 'Name is required' })}
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#382F81]"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Your Email"
                {...register('email', { required: 'Email is required' })}
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#382F81]"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                {...register('phone', { required: 'Phone is required' })}
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#382F81]"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            {/* Service */}
            <div>
              <select
                {...register('service', { required: 'Please select a service' })}
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#382F81]"
              >
                <option value="">Select a Service</option>
                <option>Hotspot & Public Wi-Fi</option>
                <option>Wireless & Structured Cabling Networking</option>
                <option>CCTV & Security Solutions</option>
                <option>IT Support & Managed IT Services</option>
              </select>
              {errors.service && <p className="text-red-500 text-sm">{errors.service.message}</p>}
            </div>

            {/* Location */}
            <div>
              <input
                type="text"
                placeholder="Location"
                {...register('location', { required: 'Location is required' })}
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#382F81]"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            {/* Message */}
            <div>
              <textarea
                rows={4}
                placeholder="Your Message"
                {...register('message', { required: 'Message is required' })}
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#382F81]"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg font-semibold bg-[#382F81] text-white hover:bg-[#F9640C] transition"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
