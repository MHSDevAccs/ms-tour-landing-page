'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ThemeConfig {
  colors?: {
    primary?: string;
    primaryLight?: string;
    primaryDark?: string;
    secondary?: string;
    accent?: string;
    textPrimary?: string;
    textSecondary?: string;
    background?: string;
    backgroundAlt?: string;
  };
  buttons?: {
    primaryButton?: string;
    secondaryButton?: string;
    outlineButton?: string;
  };
}

interface WhatsAppFloatProps {
  phoneNumber?: string
  message?: string
  theme?: ThemeConfig
}

export default function WhatsAppFloat({ 
  phoneNumber = '+62 811 1000 2477',
  message = 'Halo! Saya tertarik dengan layanan tour Anda. Bisa bantu saya dengan informasi lebih lanjut?',
  theme
}: WhatsAppFloatProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // Show the button after page loads
    const timer = setTimeout(() => setIsVisible(true), 2000)
    
    // Show tooltip after a delay
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(tooltipTimer)
    }
  }, [])

  const handleClick = () => {
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '')
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    
    // Hide tooltip after click
    setShowTooltip(false)
  }

  const handleTooltipClose = () => {
    setShowTooltip(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                className="absolute bottom-16 right-0 mb-2 mr-2"
              >
                <div className="bg-white rounded-lg shadow-xl p-4 max-w-xs border border-gray-200">
                  <button
                    onClick={handleTooltipClose}
                    className="absolute top-1 right-1 w-6 h-6 text-gray-400 hover:text-gray-600 flex items-center justify-center"
                  >
                    ✕
                  </button>
                  <div className="pr-4">
                    <h4 className={`font-semibold ${theme?.colors?.textPrimary || 'text-gray-800'} mb-1`}>
                      Butuh bantuan?
                    </h4>
                    <p className={`text-sm ${theme?.colors?.textSecondary || 'text-gray-600'} mb-3`}>
                      Chat dengan tim kami untuk konsultasi gratis!
                    </p>
                    <button
                      onClick={handleClick}
                      className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63"/>
                      </svg>
                      Mulai Chat
                    </button>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute bottom-0 right-6 transform translate-y-full">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          >
            {/* Pulsing animation */}
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
            
            {/* WhatsApp Icon */}
            <svg 
              className="w-8 h-8 text-white relative z-10" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63"/>
            </svg>

            {/* Hover tooltip */}
            <AnimatePresence>
              {isHovered && !showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute right-full mr-3 whitespace-nowrap bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg"
                >
                  Chat via WhatsApp
                  <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-b-4 border-l-gray-800 border-r-transparent border-t-transparent border-b-transparent"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  )
}