'use client'

import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  title: string
  description?: string
  url?: string
  className?: string
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  description,
  url,
  className = "flex-1 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
}) => {
  const handleShare = async () => {
    const shareUrl = url || window.location.href
    
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: description || `Lihat ${title}`,
          url: shareUrl
        })
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl)
        alert('Link telah disalin ke clipboard!')
      }
    } catch (error) {
      // Fallback to clipboard if share fails
      try {
        await navigator.clipboard.writeText(shareUrl)
        alert('Link telah disalin ke clipboard!')
      } catch (clipboardError) {
        console.error('Failed to copy to clipboard:', clipboardError)
        alert('Gagal membagikan atau menyalin link')
      }
    }
  }

  return (
    <button
      onClick={handleShare}
      className={className}
    >
      <Share2 className="w-4 h-4" />
      Bagikan
    </button>
  )
}

export default ShareButton