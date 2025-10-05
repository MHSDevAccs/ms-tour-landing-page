/**
 * Utility functions for URL processing and validation
 */

/**
 * Clean social media URL by removing backticks, extra spaces, and normalizing the format
 * Conservative approach to avoid interfering with Sanity's URL validation
 * @param url - The raw URL that might contain backticks and spaces
 * @returns Cleaned URL or original URL if already valid
 */
export function cleanSocialMediaUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  // First check if the URL is already valid - if so, return as-is
  try {
    new URL(url);
    return url; // URL is already valid, don't modify it
  } catch {
    // URL is not valid, try to clean it
  }

  // Remove backticks, extra spaces, and trim
  const cleaned = url
    .replace(/`/g, '') // Remove all backticks
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, '') // Remove any internal spaces

  // Validate that it's a proper URL after cleaning
  if (!cleaned || cleaned.length === 0) {
    return null;
  }

  // Try the cleaned URL
  try {
    new URL(cleaned);
    return cleaned;
  } catch {
    // If it doesn't start with http/https, try adding https
    if (!cleaned.startsWith('http')) {
      try {
        const withHttps = `https://${cleaned}`;
        new URL(withHttps);
        return withHttps;
      } catch {
        return null;
      }
    }
    return null;
  }
}

/**
 * Clean all social media URLs in a social media object
 * @param socialMedia - Object containing social media URLs
 * @returns Object with cleaned URLs
 */
export function cleanSocialMediaUrls(socialMedia: any): any {
  if (!socialMedia || typeof socialMedia !== 'object') {
    return {};
  }

  const cleaned: any = {};
  
  // Clean each social media URL
  Object.keys(socialMedia).forEach(key => {
    const cleanedUrl = cleanSocialMediaUrl(socialMedia[key]);
    if (cleanedUrl) {
      cleaned[key] = cleanedUrl;
    }
  });

  return cleaned;
}

/**
 * Validate and format WhatsApp number
 * @param whatsapp - WhatsApp number that might contain extra characters
 * @returns Cleaned WhatsApp number or null
 */
export function cleanWhatsAppNumber(whatsapp: string | null | undefined): string | null {
  if (!whatsapp || typeof whatsapp !== 'string') {
    return null;
  }

  // Remove all non-numeric characters except +
  const cleaned = whatsapp.replace(/[^0-9+]/g, '');
  
  // Ensure it starts with + or add it if it starts with a country code
  if (cleaned.length > 0) {
    if (cleaned.startsWith('+')) {
      return cleaned;
    } else if (cleaned.startsWith('62') || cleaned.startsWith('1') || cleaned.startsWith('44')) {
      return `+${cleaned}`;
    } else {
      // Assume Indonesian number if no country code
      return `+62${cleaned}`;
    }
  }
  
  return null;
}