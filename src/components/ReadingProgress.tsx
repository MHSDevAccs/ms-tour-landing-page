'use client'

import { useState, useEffect } from 'react'

interface ReadingProgressProps {
  className?: string
  color?: string
  height?: number
}

export default function ReadingProgress({
  className = '',
  color = 'bg-primary',
  height = 3
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / maxHeight) * 100
      setProgress(Math.min(100, Math.max(0, progress)))
    }

    // Update progress on scroll
    window.addEventListener('scroll', updateProgress)
    
    // Initial calculation
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
    }
  }, [])

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div 
        className="bg-gray-200"
        style={{ height: `${height}px` }}
      >
        <div
          className={`${color} transition-all duration-150 ease-out`}
          style={{ 
            width: `${progress}%`,
            height: `${height}px`
          }}
        />
      </div>
    </div>
  )
}

// Reading progress circle (alternative design)
export function ReadingProgressCircle({
  className = '',
  size = 60,
  strokeWidth = 4,
  color = 'rgb(57, 172, 231)' // Using primary color from CSS variables
}: {
  className?: string
  size?: number
  strokeWidth?: number
  color?: string
}) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / maxHeight) * 100
      
      setProgress(Math.min(100, Math.max(0, progress)))
      setIsVisible(scrolled > 100) // Show after scrolling 100px
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
    }
  }, [])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
        ${className}
      `}
      style={{ width: size, height: size }}
      title="Kembali ke atas"
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(229, 231, 235)" // gray-200
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      
      {/* Arrow up icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          className="w-5 h-5 text-gray-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </div>
    </button>
  )
}

// Reading time estimator
export function ReadingTimeEstimator({ 
  content, 
  className = '' 
}: { 
  content: any[]
  className?: string 
}) {
  const calculateReadingTime = (content: any[]) => {
    if (!content) return 0
    
    const plainText = content
      .filter(block => block._type === 'block')
      .map(block => block.children?.map((child: any) => child.text).join(''))
      .join(' ')
    
    const wordsPerMinute = 200
    const wordCount = plainText.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const readingTime = calculateReadingTime(content)

  if (readingTime === 0) return null

  return (
    <div className={`flex items-center text-sm text-gray-600 ${className}`}>
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12,6 12,12 16,14"></polyline>
      </svg>
      <span>{readingTime} menit baca</span>
    </div>
  )
}