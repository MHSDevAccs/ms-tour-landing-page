/**
 * IMAGE RESOLU  // Card images - Square thumbnails and icons  
  card: {
    width: 400,
    height: 400,   // 1:1 square ratio
    usage: 'Service icons, thumbnails, profile photos',
    function: 'urlForCard()'
  },IDELINES
 * 
 * This file documents the standardized image resolutions for different content types
 * in the MHS Tour Landing project. Each content type has specific dimensions 
 * optimized for its display context.
 */

// CONTENT TYPE SPECIFIC RESOLUTIONS

export const imageResolutions = {
  // Hero/Banner Images - Full-width background sections
  hero: {
    width: 1920,
    height: 1080,  // 16:9 ratio
    usage: 'Hero sections, full-width banners',
    function: 'urlForHero()'
  },

  // Card/Feature Images - Square thumbnails and icons
  card: {
    width: 400,
    height: 400,   // 1:1 square ratio
    usage: 'Feature cards, service icons, thumbnails',
    function: 'urlForCard()'
  },

  // Gallery Images - Photo gallery displays
  gallery: {
    width: 800,
    height: 600,   // 4:3 ratio
    usage: 'Photo galleries, image grids',
    function: 'urlForGallery()'
  },

  // Product Images - Package/tour/feature displays
  product: {
    width: 600,
    height: 400,   // 3:2 ratio
    usage: 'Tour packages, feature showcases, product displays',
    function: 'urlForProduct()'
  },

  // Profile Images - Customer photos, avatars
  profile: {
    width: 400,
    height: 400,   // 1:1 square ratio
    usage: 'Customer testimonials, team photos',
    function: 'urlForCard()'  // Same as card
  },

  // Logo Images - Brand logos
  logo: {
    width: 400,
    height: 200,   // 2:1 ratio
    usage: 'Company logos, brand marks',
    function: 'urlForProduct()'  // Similar dimensions
  },

  // Icon Images - Small UI icons
  icon: {
    width: 100,
    height: 100,   // 1:1 small square
    usage: 'UI icons, small graphics',
    function: 'urlForIcon()'
  }
}

// SCHEMA DESCRIPTIONS FOR CMS
export const schemaDescriptions = {
  hero: '🖼️ HERO BANNER: 1920x1080px (16:9) | Max Size: 20MB | Format: JPEG/PNG/WebP',
  card: '🔲 CARD ICON: 400x400px (Square) | Max Size: 20MB | Format: JPEG/PNG/WebP/SVG',
  gallery: '📸 GALLERY PHOTO: 800x600px (4:3) | Max Size: 20MB | Format: JPEG/PNG/WebP',
  product: '📦 PRODUCT IMAGE: 600x400px (3:2) | Max Size: 20MB | Format: JPEG/PNG/WebP',
  profile: '👤 PROFILE PHOTO: 400x400px (Square) | Max Size: 20MB | Format: JPEG/PNG/WebP',
  logo: '🏢 COMPANY LOGO: 400x200px (2:1) | Max Size: 20MB | Format: PNG/SVG/WebP',
  icon: '⭐ SMALL ICON: 100x100px (Square) | Max Size: 20MB | Format: PNG/SVG/WebP'
}