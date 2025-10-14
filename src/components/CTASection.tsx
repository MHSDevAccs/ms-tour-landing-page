'use client'

import { motion } from 'framer-motion'

interface CTASectionProps {
  contactData?: {
    contactWhatsapp?: string
    whatsappTemplate?: string
  }
  title?: string
  description?: string
  buttonText?: string
}

export default function CTASection({ 
  contactData,
  title = "Siap Memulai Perjalanan Anda?",
  description = "Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik untuk perjalanan impian Anda.",
  buttonText = "Konsultasi Gratis"
}: CTASectionProps) {
  
  const handleWhatsAppClick = () => {
    const phoneNumber = contactData?.contactWhatsapp || '+62 811 1000 2477'
    const message = contactData?.whatsappTemplate || 'Halo! Saya tertarik dengan layanan tour Anda. Bisa bantu saya dengan informasi lebih lanjut?'
    
    // Clean phone number (remove spaces and non-numeric characters except +)
    const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '')
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodeURIComponent(message)}`
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="bg-white py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-black mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {buttonText}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}