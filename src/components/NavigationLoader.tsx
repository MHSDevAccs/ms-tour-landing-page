'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { GooeyLoader } from "@/components/ui/loader-10"

export default function NavigationLoader() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Show loading when pathname changes
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    // Show loading for navigation
    handleStart()
    
    // Hide loading after a short delay to allow page to load
    const timer = setTimeout(handleComplete, 500)

    return () => clearTimeout(timer)
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {/* Gooey Loader */}
          <div className="mb-8">
            <GooeyLoader
              primaryColor="#39ace7" // Using your brand primary color
              secondaryColor="#9bd4e4" // Using your brand light color
              borderColor="#e5e7eb" // Gray border
              className="mx-auto"
            />
          </div>
          
          {/* Loading Text */}
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Memuat Halaman...
          </h2>
          <p className="text-gray-500">
            Mohon tunggu sebentar
          </p>
        </div>
      </div>
    </div>
  )
}