// @ts-ignore
import createImageUrlBuilder from '@sanity/image-url'

import { dataset, projectId } from '../env'

// Image URL builder with content-specific resolutions
const builder = createImageUrlBuilder({ projectId, dataset })

// Hero/Banner images - Full width backgrounds
export const urlForHero = (source: any) => {
  return builder
    .image(source)
    .width(1920)
    .height(1080) // 16:9 ratio for hero banners
    .fit('crop')
    .format('webp')
    .quality(85)
}

// Card/Feature images - Square thumbnails 
export const urlForCard = (source: any) => {
  return builder
    .image(source)
    .width(400)
    .height(400) // 1:1 square ratio for cards
    .fit('crop')
    .format('webp')
    .quality(85)
}

// Gallery images - 4:3 ratio for photo galleries
export const urlForGallery = (source: any) => {
  return builder
    .image(source)
    .width(800)
    .height(600) // 4:3 ratio for gallery display
    .fit('crop')
    .format('webp')
    .quality(85)
}

// Product/Package images - 3:2 ratio for product showcase
export const urlForProduct = (source: any) => {
  return builder
    .image(source)
    .width(600)
    .height(400) // 3:2 ratio for product display
    .fit('crop')
    .format('webp')
    .quality(85)
}

// Icon images - Small square icons
export const urlForIcon = (source: any) => {
  return builder
    .image(source)
    .width(100)
    .height(100) // Small 1:1 for icons
    .fit('crop')
    .format('webp')
    .quality(90)
}

// Default fallback (backward compatibility)
export const urlFor = urlForHero
