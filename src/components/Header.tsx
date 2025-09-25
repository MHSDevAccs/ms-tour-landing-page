'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

interface SiteSettings {
  _id: string
  logo?: {
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  logoAlt?: string
  siteName?: string
  navigation?: {
    homeText?: string
    aboutText?: string
    servicesText?: string
    galleryText?: string
    blogText?: string
    contactText?: string
  }
  content?: {
    bookNowText?: string
  }
  theme?: {
    colors?: {
      primary?: string
      primaryLight?: string
      primaryDark?: string
      textPrimary?: string
      textSecondary?: string
    }
    buttons?: {
      primaryButton?: string
      secondaryButton?: string
    }
    layout?: {
      headerBg?: string
      container?: string
    }
  }
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const settings = await sanityFetch<SiteSettings>({
          query: queries.getSiteSettings(),
          tags: ['siteSettings'],
        })
        setSiteSettings(settings)
      } catch (error) {
        console.error('Failed to fetch site settings:', error)
      }
    }

    fetchSiteSettings()
  }, [])

  const navigation = [
    { name: siteSettings?.navigation?.homeText || 'Home', href: '/' },
    { name: siteSettings?.navigation?.aboutText || 'About', href: '/about' },
    { name: siteSettings?.navigation?.servicesText || 'Services', href: '/services' },
    { name: siteSettings?.navigation?.galleryText || 'Gallery', href: '/gallery' },
    { name: siteSettings?.navigation?.blogText || 'Blog', href: '/blog' },
    { name: siteSettings?.navigation?.contactText || 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  // Get dynamic header background classes
  const headerBgClasses = siteSettings?.theme?.layout?.headerBg || 'bg-white shadow-sm'
  const containerClasses = siteSettings?.theme?.layout?.container || 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'

  return (
    <header className={`${headerBgClasses} sticky top-0 z-50`}>
      <div className={containerClasses}>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {siteSettings?.logo ? (
                <Image
                  src={urlFor(siteSettings.logo).width(200).height(60).url()}
                  alt={siteSettings.logoAlt || 'Company Logo'}
                  width={200}
                  height={60}
                  className="h-10 w-auto"
                  priority
                />
              ) : (
                <span className="text-2xl font-bold text-primary">
                  {siteSettings?.siteName }
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary border-b-2 border-primary'
              : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact"
              className={siteSettings?.theme?.buttons?.primaryButton || 'bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors duration-200'}
            >
              {siteSettings?.content?.bookNowText || 'Book Now'}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                isActive(item.href)
                  ? 'text-primary bg-primary-lighter'
                : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="px-3 py-2">
            <Link
              href="/contact"
              className={`block w-full text-center ${siteSettings?.theme?.buttons?.primaryButton || 'bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors duration-200'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {siteSettings?.content?.bookNowText || 'Book Now'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header