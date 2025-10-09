/**
 * WhatsApp utility functions for generating chat URLs with template messages
 */

/**
 * Formats a phone number for WhatsApp URL
 * Removes all non-numeric characters except the leading +
 * @param phoneNumber - The phone number to format
 * @returns Formatted phone number for WhatsApp
 */
export function formatWhatsAppNumber(phoneNumber: string): string {
  if (!phoneNumber) return ''
  
  // Remove all non-numeric characters except the leading +
  let formatted = phoneNumber.replace(/[^\d+]/g, '')
  
  // Ensure it starts with + if it doesn't already
  if (!formatted.startsWith('+')) {
    // If it starts with 0, replace with +62 (Indonesia)
    if (formatted.startsWith('0')) {
      formatted = '+62' + formatted.substring(1)
    } else if (!formatted.startsWith('62')) {
      // If it doesn't start with country code, add +62
      formatted = '+62' + formatted
    } else {
      // Add + if it starts with country code but no +
      formatted = '+' + formatted
    }
  }
  
  return formatted
}

/**
 * Generates a WhatsApp chat URL with a pre-filled message
 * @param phoneNumber - The WhatsApp phone number
 * @param message - The template message to pre-fill
 * @returns WhatsApp URL for opening chat
 */
export function generateWhatsAppURL(phoneNumber: string, message: string = ''): string {
  if (!phoneNumber) return '#'
  
  const formattedNumber = formatWhatsAppNumber(phoneNumber)
  const encodedMessage = encodeURIComponent(message)
  
  // Use wa.me for universal compatibility (works on both mobile and desktop)
  return `https://wa.me/${formattedNumber.replace('+', '')}${message ? `?text=${encodedMessage}` : ''}`
}

/**
 * Generates a WhatsApp chat URL specifically for web (desktop)
 * @param phoneNumber - The WhatsApp phone number
 * @param message - The template message to pre-fill
 * @returns WhatsApp Web URL for opening chat
 */
export function generateWhatsAppWebURL(phoneNumber: string, message: string = ''): string {
  if (!phoneNumber) return '#'
  
  const formattedNumber = formatWhatsAppNumber(phoneNumber)
  const encodedMessage = encodeURIComponent(message)
  
  return `https://web.whatsapp.com/send?phone=${formattedNumber.replace('+', '')}${message ? `&text=${encodedMessage}` : ''}`
}

/**
 * Detects if the user is on a mobile device
 * @returns true if mobile device, false otherwise
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * Generates the appropriate WhatsApp URL based on device type
 * @param phoneNumber - The WhatsApp phone number
 * @param message - The template message to pre-fill
 * @returns Appropriate WhatsApp URL for the device
 */
export function generateResponsiveWhatsAppURL(phoneNumber: string, message: string = ''): string {
  // Always use wa.me as it automatically redirects to the appropriate platform
  return generateWhatsAppURL(phoneNumber, message)
}

/**
 * Creates a WhatsApp click handler that opens the chat in a new window/tab
 * @param phoneNumber - The WhatsApp phone number
 * @param message - The template message to pre-fill
 * @returns Click handler function
 */
export function createWhatsAppClickHandler(phoneNumber: string, message: string = '') {
  return (event: React.MouseEvent) => {
    event.preventDefault()
    const url = generateResponsiveWhatsAppURL(phoneNumber, message)
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}