import { type SchemaTypeDefinition } from 'sanity'
import { heroSection } from './heroSection'
import { featuresSection } from './featuresSection'
import { testimonial } from './testimonial'
import { blogPost } from './blogPost'
import { siteSettings } from './siteSettings'
import { businessInfo } from './businessInfo'
import { themeSettings } from './themeSettings'
import { socialSettings } from './socialSettings'
import { contentSettings } from './contentSettings'
import servicePackage from './servicePackage'
import contactSubmission from './contactSubmission'
import gallery from './gallery'
import galleryCategory from './galleryCategory'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroSection, 
    featuresSection, 
    testimonial, 
    blogPost, 
    siteSettings, 
    businessInfo,
    themeSettings,
    socialSettings,
    contentSettings,
    servicePackage, 
    contactSubmission,
    gallery,
    galleryCategory
  ],
}
