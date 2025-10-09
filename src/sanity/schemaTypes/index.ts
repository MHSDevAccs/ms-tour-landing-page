import { type SchemaTypeDefinition } from 'sanity'
import { heroSection } from './heroSection'
import { featuresSection } from './featuresSection'
import { testimonial } from './testimonial'
import { blogPost } from './blogPost'
import { businessInfo } from './businessInfo'
import { contactData } from './contactData'
import { socialSettings } from './socialSettings'
import servicePackage from './servicePackage'
import gallery from './gallery'
import galleryCategory from './galleryCategory'
import { aboutUs } from './aboutUs'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroSection, 
    featuresSection, 
    testimonial, 
    blogPost,  
     businessInfo,
     contactData,
    socialSettings,
    servicePackage, 
    gallery,
    galleryCategory,
    aboutUs
  ],
}
