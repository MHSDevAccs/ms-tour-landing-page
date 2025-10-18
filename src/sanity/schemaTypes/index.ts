import { type SchemaTypeDefinition } from 'sanity'
import { heroSection } from './heroSection'
import { testimonial } from './testimonial'
import { blogPost } from './blogPost'
import { businessInfo } from './businessInfo'
import { contactData } from './contactData'
import { socialSettings } from './socialSettings'
import servicePackage from './servicePackage'
import gallery from './gallery'
import { aboutUs } from './aboutUs'
import { errorPages } from './errorPages'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroSection, 
    testimonial, 
    blogPost, 
    businessInfo,
    contactData,
    socialSettings,
    servicePackage, 
    gallery,
    aboutUs,
    errorPages
  ],
}
