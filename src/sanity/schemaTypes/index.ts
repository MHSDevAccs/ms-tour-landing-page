import { type SchemaTypeDefinition } from 'sanity'

// Site Settings schemas (individual sections)
import { businessInfo } from './businessInfo'
import { themeDesign } from './themeDesign'
import { socialMedia } from './socialMedia'
import { contentManagement } from './contentManagement'

// Page content schemas
import { mainPageContent } from './mainPageContent'
import { servicePageContent } from './servicePageContent'
import { galleryPageContent } from './galleryPageContent'
import { blogPageContent } from './blogPageContent'
import { aboutUs } from './aboutUs'

// Content type schemas
import { blogPost } from './blogPost'
import servicePackage from './servicePackage'
import gallery from './gallery'
import galleryCategory from './galleryCategory'
import contactSubmission from './contactSubmission'

// Legacy schemas (keeping for backward compatibility during transition)
import { heroSection } from './heroSection'
import { featuresSection } from './featuresSection'
import { testimonial } from './testimonial'
import { siteSettings } from './siteSettings'
import { themeSettings } from './themeSettings'
import { socialSettings } from './socialSettings'
import { contentSettings } from './contentSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Site Settings schemas (individual sections)
    businessInfo,
    themeDesign,
    socialMedia,
    contentManagement,
    
    // Page content schemas
    mainPageContent,
    servicePageContent,
    galleryPageContent,
    blogPageContent,
    aboutUs,
    
    // Content type schemas
    blogPost,
    servicePackage,
    gallery,
    galleryCategory,
    contactSubmission,
    
    // Legacy schemas (for backward compatibility)
    heroSection, 
    featuresSection, 
    testimonial, 
    siteSettings,
    themeSettings,
    socialSettings,
    contentSettings,
  ],
}
