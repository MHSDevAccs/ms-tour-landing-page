'use client'

import { useEffect } from 'react'

// Auto image refresh utility for development
export default function ImageRefreshUtil() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    
    // Function to refresh all Sanity images
    const refreshSanityImages = () => {
      const images = document.querySelectorAll('img[src*="cdn.sanity.io"]')
      images.forEach((element) => {
        const img = element as HTMLImageElement
        const currentSrc = img.src
        const baseSrc = currentSrc.split('?')[0]
        img.src = `${baseSrc}?v=${Date.now()}&refresh=true`
      })
    }

    // Listen for keyboard shortcut (Ctrl/Cmd + Shift + R) to refresh images
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
        e.preventDefault()
        refreshSanityImages()
        console.log('🖼️ Refreshed all Sanity images')
      }
    }

    document.addEventListener('keydown', handleKeydown)

    // Auto-refresh images every 2 minutes in development
    const interval = setInterval(refreshSanityImages, 120000)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      clearInterval(interval)
    }
  }, [])

  return null
}