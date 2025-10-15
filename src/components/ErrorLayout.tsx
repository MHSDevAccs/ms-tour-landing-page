'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

// Types
interface ErrorButton {
  text: string
  link: string
}

interface ErrorContent {
  title: string
  subtitle: string
  description: string
  image?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt?: string
  }
  primaryButton: ErrorButton
  secondaryButton?: ErrorButton
}

interface ErrorPagesData {
  _id: string
  layout: {
    showHeader: boolean
    showFooter: boolean
    backgroundColor: string
    centerContent: boolean
  }
  error404: ErrorContent
  error500: ErrorContent
  error403: ErrorContent
  generalError: ErrorContent
  language: string
  isActive: boolean
}

interface ErrorLayoutProps {
  errorCode: 404 | 500 | 403 | 'general'
  title?: string
  subtitle?: string
  description?: string
  children?: React.ReactNode
}

export default function ErrorLayout({
  errorCode,
  title,
  subtitle,
  description,
  children
}: ErrorLayoutProps) {
  const [errorData, setErrorData] = useState<ErrorPagesData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchErrorData = async () => {
      try {
        const data = await sanityFetch<ErrorPagesData>({
          query: queries.getErrorPages('id'),
          tags: ['errorPages'],
          revalidate: 3600 // Cache for 1 hour since error pages rarely change
        })
        setErrorData(data)
      } catch (error) {
        console.error('Failed to fetch error page data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchErrorData()
  }, [])

  // Get the appropriate error content based on error code
  const getErrorContent = (): ErrorContent => {
    if (!errorData) {
      // Fallback content if Sanity data is not available
      return {
        title: title || 'Terjadi Kesalahan',
        subtitle: subtitle || 'Maaf, terjadi kesalahan yang tidak terduga.',
        description: description || 'Silakan coba lagi dalam beberapa saat atau hubungi kami jika masalah berlanjut.',
        primaryButton: {
          text: 'Kembali ke Beranda',
          link: '/'
        },
      }
    }

    switch (errorCode) {
      case 404:
        return errorData.error404
      case 500:
        return errorData.error500
      case 403:
        return errorData.error403
      default:
        return errorData.generalError
    }
  }

  const errorContent = getErrorContent()
  const layout = errorData?.layout || {
    showHeader: false,
    showFooter: false,
    backgroundColor: 'bg-white',
    centerContent: true
  }

  // Determine page classes
  const pageClasses = `min-h-screen ${layout.backgroundColor} ${
    layout.centerContent ? 'flex flex-col' : ''
  }`

  const contentClasses = layout.centerContent 
    ? 'flex-1 flex items-center justify-center'
    : 'py-16'

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[300] min-h-screen bg-white flex flex-col">
      {/* Main Content - Always centered, no header/footer for error pages */}
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Error Image */}
            {errorContent.image && (
              <div className="mb-8">
                <Image
                  src={urlFor(errorContent.image.asset).width(400).height(300).url()}
                  alt={errorContent.image.alt || 'Error illustration'}
                  width={400}
                  height={300}
                  className="mx-auto rounded-lg"
                  priority
                />
              </div>
            )}

            {/* Error Code Badge */}
            {errorCode !== 'general' && (
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-red-100 text-red-600 font-semibold rounded-full text-sm">
                  Error {errorCode}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {errorContent.title}
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
              {errorContent.subtitle}
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {errorContent.description}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center mb-8">
              <Link
                href={errorContent.primaryButton.link}
                className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Kembali ke Beranda
              </Link>
            </div>

            {/* Custom Children Content */}
            {children && (
              <div className="mt-12">
                {children}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

// Helper function to get error status text
export function getErrorStatusText(errorCode: number | string): string {
  switch (errorCode) {
    case 404:
      return 'Page Not Found'
    case 500:
      return 'Internal Server Error'
    case 403:
      return 'Access Forbidden'
    case 401:
      return 'Unauthorized'
    case 503:
      return 'Service Unavailable'
    default:
      return 'Error'
  }
}