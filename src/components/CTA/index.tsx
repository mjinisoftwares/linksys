'use client'
import React from 'react'
import { Button } from '@/components/ui/button'

export default function Cta() {
  return (
    <section className="bg-primary text-gray-300 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Looking for Fast, Reliable Internet?</h2>
        <p className="text-base mb-8 md:w-2/5 mx-auto">
          Linksys Fiber Networks is here to keep your home or business online with high-speed,
          uninterrupted connectivity across Molo and its environs.
        </p>
        <Button
          size="lg"
          className="bg-accent hover:bg-secondary text-white text-sm py-4 px-6 rounded-full transition-colors duration-300"
        >
          Get in Touch
        </Button>
      </div>
    </section>
  )
}
