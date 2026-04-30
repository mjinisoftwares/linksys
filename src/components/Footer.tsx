'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Youtube,
  Globe,
  Linkedin,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-24">
          {/* ABOUT */}
          <div className="mt-[-8px]">
            <h3 className="text-lg font-semibold my-2 text-accent">About Linksys</h3>

            <p className="text-gray-500 text-sm leading-relaxed">
              Linksys is a trusted internet service provider in Molo, delivering fast, reliable, and
              affordable internet to homes and businesses.
            </p>
            <Link href="/" className="flex items-center mt-4  ">
              <img
                src="/linksys-logo-final.webp"
                alt="Linksys Molo Logo"
                width={180}
                height={40}
                className="object-contain"
              />
            </Link>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Quick Links</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/packages" className="text-gray-500 hover:text-accent">
                  Internet Packages
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-500 hover:text-accent">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-500 hover:text-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-accent">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-500 hover:text-accent">
                  Read Our Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Contact Info</h3>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin className="h-5 w-5 text-accent mt-1" />
                Generis Hotel Building, Ground Floor, Molo, Nakuru County
              </li>

              <li className="flex items-center gap-3 text-gray-500">
                <Phone className="h-5 w-5 text-accent" />
                0713 366 366
              </li>

              <li className="flex items-center gap-3 text-gray-500">
                <Mail className="h-5 w-5 text-accent" />
                info@linksysfiber.ke
              </li>

              <li className="flex items-center gap-3 text-gray-500">
                <Globe className="h-5 w-5 text-accent" />
                <Link href="/" className="hover:text-accent">
                  linksys.co.ke
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="bg-[#021b28] border-t border-accent/40 text-center py-6 text-gray-600">
        <p className="text-accent font-medium">Keeping Molo Connected</p>

        {/* SOCIALS */}
        <div className="flex justify-center space-x-4 my-4">
          <a
            href="https://www.facebook.com/people/Linksys-Fiber-Networks/61558710290221/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            <Facebook />
          </a>

          <a
            href="https://tiktok.com/@linksysfibernet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            <Twitter />
          </a>

          <a
            href="https://www.instagram.com/linksysfiber"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            <Instagram />
          </a>

          <a href="#" className="hover:text-accent">
            <Youtube />
          </a>

          <a href="#" className="hover:text-accent">
            <Linkedin />
          </a>
        </div>

        <p>&copy; {new Date().getFullYear()} Linksys Molo. All rights reserved.</p>

        <div className="text-xs mt-2 text-gray-400">
          Designed & developed by{' '}
          <a href="https://mjinidigital.co.ke" className="underline">
            Mjini Digital
          </a>
        </div>
      </div>
    </footer>
  )
}
