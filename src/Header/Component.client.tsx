'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useAuth } from '@/providers/Auth'

import type { Header } from '@/payload-types'
import { HeaderNav } from './Nav'
import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TopBarComponent } from '@/components/TopBar'

interface HeaderClientProps {
  data: Header
  mobile?: boolean
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { user } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Reset theme + close menu on route change
  useEffect(() => {
    setHeaderTheme(null)
    setMobileMenuOpen(false)
  }, [pathname])

  // Sync theme
  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  return (
    <header
      className="z-[999] fixed top-0 left-0 w-full"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <TopBarComponent />

      {/* NAVBAR */}
      <div className="bg-white py-2 border-b border-accent px-4 sm:px-8 md:px-12 lg:px-12 xl:px-16 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo loading="eager" priority="high" />
        </Link>

        {/* Desktop Nav (CENTERED PROPERLY) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <HeaderNav data={data} />
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="accent" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden ml-auto text-primary"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg px-6 py-6 flex flex-col gap-6">
          <HeaderNav data={data} />

          <div className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
