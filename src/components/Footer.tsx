'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
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
  content?: {
    tagline?: string
    ctaText?: string
    contactCtaText?: string
    getInTouchText?: string
  }
  navigation?: {
    homeText?: string
    aboutText?: string
    servicesText?: string
    galleryText?: string
    blogText?: string
    contactText?: string
  }
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
    whatsapp?: string
  }
  socialMedia?: {
    instagram?: string
    facebook?: string
    youtube?: string
    twitter?: string
  }
  copyrightText?: string
  theme?: {
    colors?: {
      primary?: string
      primaryLight?: string
      textPrimary?: string
      textSecondary?: string
    }
    layout?: {
      container?: string
      footerBg?: string
    }
  }
}

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)

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

  const navigation = {
    main: [
      { name: siteSettings?.navigation?.homeText || 'Home', href: '/' },
      { name: siteSettings?.navigation?.aboutText || 'About', href: '/about' },
      { name: siteSettings?.navigation?.servicesText || 'Services', href: '/services' },
      { name: siteSettings?.navigation?.galleryText || 'Gallery', href: '/gallery' },
      { name: siteSettings?.navigation?.blogText || 'Blog', href: '/blog' },
      { name: siteSettings?.navigation?.contactText || 'Contact', href: '/contact' },
    ],
    services: [
      { name: 'Tour Packages', href: '/services/packages' },
      { name: 'Custom Tours', href: '/services/custom' },
      { name: 'Group Tours', href: '/services/group' },
      { name: 'Private Tours', href: '/services/private' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cancellation Policy', href: '/cancellation' },
    ],
    social: [
      ...(siteSettings?.socialMedia?.facebook ? [{
        name: 'Facebook',
        href: siteSettings.socialMedia.facebook,
        icon: (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        ),
      }] : []),
      ...(siteSettings?.socialMedia?.instagram ? [{
        name: 'Instagram',
        href: siteSettings.socialMedia.instagram,
        icon: (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.316-1.296C4.165 14.81 3.662 13.628 3.662 12.3c0-1.329.503-2.511 1.471-3.393.968-.882 2.119-1.372 3.316-1.372 1.297 0 2.448.49 3.316 1.372.968.882 1.471 2.064 1.471 3.393 0 1.328-.503 2.51-1.471 3.392-.868.806-2.019 1.296-3.316 1.296zm7.718-9.038c-.503 0-.911-.408-.911-.911s.408-.911.911-.911.911.408.911.911-.408.911-.911.911zm-3.612 2.05c-1.297 0-2.347 1.05-2.347 2.347s1.05 2.347 2.347 2.347 2.347-1.05 2.347-2.347-1.05-2.347-2.347-2.347z" clipRule="evenodd" />
          </svg>
        ),
      }] : []),
      ...(siteSettings?.contactInfo?.whatsapp ? [{
        name: 'WhatsApp',
        href: `https://wa.me/${siteSettings.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`,
        icon: (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        ),
      }] : []),
      ...(siteSettings?.socialMedia?.youtube ? [{
        name: 'YouTube',
        href: siteSettings.socialMedia.youtube,
        icon: (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        ),
      }] : []),
      ...(siteSettings?.socialMedia?.twitter ? [{
        name: 'Twitter',
        href: siteSettings.socialMedia.twitter,
        icon: (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        ),
      }] : []),
    ],
  }

  return (
    <footer className={siteSettings?.theme?.layout?.footerBg || "bg-gray-900 text-white"}>
      <div className={siteSettings?.theme?.layout?.container || "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              {siteSettings?.logo ? (
                <Image
                  src={urlFor(siteSettings.logo).width(200).height(60).url()}
                  alt={siteSettings.logoAlt || 'Company Logo'}
                  width={200}
                  height={60}
                  className="h-10 w-auto brightness-0 invert"
                />
              ) : (
                <span className={`text-2xl font-bold ${siteSettings?.theme?.colors?.primaryLight || 'text-primary-light'}`}>
                  {siteSettings?.siteName || 'Mahabbatussholihin Tour & Travel'}
                </span>
              )}
            </div>
            <p className="text-gray-300 mb-4">
              {siteSettings?.content?.tagline || 'Your trusted partner for unforgettable travel experiences. We create memories that last a lifetime with our expertly crafted tour packages.'}
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-gray-400 hover:${siteSettings?.theme?.colors?.primaryLight || 'text-primary-light'} transition-colors duration-200`}
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-gray-300 hover:${siteSettings?.theme?.colors?.primaryLight || 'text-primary-light'} transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-gray-300 hover:${siteSettings?.theme?.colors?.primaryLight || 'text-primary-light'} transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              {siteSettings?.contactInfo?.address && (
                <div className="flex items-start">
                  <svg className={`h-5 w-5 ${siteSettings?.theme?.colors?.primaryLight || 'text-primary-light'} mt-1 mr-3 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-300 text-sm whitespace-pre-line">
                    {siteSettings.contactInfo.address}
                  </p>
                </div>
              )}
              {siteSettings?.contactInfo?.whatsapp && (
                <div className="flex items-center">
                  <svg className={`h-5 w-5 ${siteSettings?.theme?.colors?.primaryLight || 'text-primary-light'} mr-3 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a 
                    href={`https://wa.me/${siteSettings.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`} 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {siteSettings.contactInfo.whatsapp}
                  </a>
                </div>
              )}
              {siteSettings?.contactInfo?.email && (
                <div className="flex items-center">
                  <svg className={`h-5 w-5 ${siteSettings?.theme?.colors?.primaryLight || 'text-primary-light'} mr-3 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a 
                    href={`mailto:${siteSettings.contactInfo.email}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {siteSettings.contactInfo.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {siteSettings?.copyrightText || `© ${currentYear} Mahabbatussholihin Tour & Travel. All rights reserved.`}
            </p>
            <div className="flex space-x-6">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-400 hover:${siteSettings?.theme?.colors?.primaryLight || 'text-primary-light'} text-sm transition-colors duration-200`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer