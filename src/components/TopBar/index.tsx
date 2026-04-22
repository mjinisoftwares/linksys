'use client'

import Link from 'next/link'
import { Mail, Phone, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react'

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://www.facebook.com/people/Linksys-Fiber-Networks/61558710290221/',
  },

  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Flinksysfiber%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExbnhHWXZueDVJMGhBc2NZSXNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR7UUiy3GS5_xy6Js1hrdRWjRo1PANI38rzj2JJXlcNbn0BpVZ2dwiAdoo_mJQ_aem_Jtv1Zj0arxo0StiVT35eow&h=AT7oI1_qEFvrJrklPhRU7QJwGI_J7_Fpx4UefzxJM6qRlLv2g12oieqtNGwVAT4uA0PYRqs07F0VGrRxZYmQIRR6RVWRrDi_sYEmZqMrvR1stAgvDaw1i3VD96Rmd2YgK_sF',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    href: 'https://l.facebook.com/l.php?u=https%3A%2F%2Ftiktok.com%2F%40linksysfibernet%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExbnhHWXZueDVJMGhBc2NZSXNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR5dlQe-pJ04GktFd-yxCaB-H8-L3O5PG7ipM9xGdHSXxdtk8jgHRF1lm4Wtdg_aem_17UK-a_mn94ohBqPXDKqbA&h=AT4dlvqq6yLGXEPQgAklWuFuta1ZuwxJPuZ_LwI4PJDBNEPX_6WaRnIZbUx310Fptzj9YtpPe3fOybOtAs1GvTVTI1Byd9SUTX3Gjn38TyiVywOw2dsdXrVQgHAmbQc2KonY',
  },
]

export function TopBarComponent() {
  return (
    <div className="bg-primary py-1 hidden md:block">
      <div className="z-50 mx-auto px-4 sm:px-8 md:px-12 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex justify-between items-center relative">
          {/* Left: Contact Info */}
          <div className="flex space-x-4 z-10">
            <div className="flex items-center space-x-2 text-xs text-gray-200">
              <Mail className="w-4 h-4 text-accent" />
              <span>info@linksysfiber.ke</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-200">
              <Phone className="w-4 h-4 text-accent" />
              <span>0713-366-366</span>
            </div>
          </div>

          {/* Center: Marquee Container */}
          <div className="ml-4 absolute left-1/2 -translate-x-1/2 w-[40%] overflow-hidden">
            <div className=" whitespace-nowrap animate-marquee text-xs text-accent font-medium">
              Contact Us For Fast, Affordable and the Most Reliable Internet Connection in Molo and
              its Environs.
            </div>
          </div>

          {/* Right: Social Icons */}
          <div className="flex space-x-3 z-10">
            .
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.href} aria-label={link.name}>
                <div className="bg-secondary p-1 rounded-full text-white hover:bg-accent transition-colors">
                  <link.icon className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </div>
  )
}
