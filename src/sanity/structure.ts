import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      // Site Settings (Global Configuration)
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('🏢 Business Information')
                .child(
                  S.document()
                    .schemaType('businessInfo')
                    .documentId('businessInfo')
                ),
              S.listItem()
                .title('🎨 Theme & Design')
                .child(
                  S.document()
                    .schemaType('themeSettings')
                    .documentId('themeSettings')
                ),
              S.listItem()
                .title('📱 Social Media & Communication')
                .child(
                  S.document()
                    .schemaType('socialSettings')
                    .documentId('socialSettings')
                ),
              S.listItem()
                .title('📝 Content Management')
                .child(
                  S.document()
                    .schemaType('contentSettings')
                    .documentId('contentSettings')
                ),
            ])
        ),
      
      S.divider(),
      
      // Website Content
      S.listItem()
        .title('Website Content')
        .child(
          S.list()
            .title('Website Content')
            .items([
              S.listItem()
                .title('Hero Section')
                .child(
                  S.document()
                    .schemaType('heroSection')
                    .documentId('heroSection')
                ),
              S.listItem()
                .title('Testimonials')
                .child(
                  S.documentTypeList('testimonial')
                    .title('Customer Testimonials')
                ),
            ])
        ),
      
      // Services & Tours Section
      S.listItem()
        .title('Services & Tours')
        .child(
          S.list()
            .title('Services & Tours')
            .items([
              S.listItem()
                .title('Service Packages')
                .child(
                  S.documentTypeList('servicePackage')
                    .title('Tour Packages')
                ),
            ])
        ),
      
      // Gallery & Portfolio Section
      S.listItem()
        .title('Gallery & Portfolio')
        .child(
          S.list()
            .title('Gallery & Portfolio')
            .items([
              S.listItem()
                .title('Galleries')
                .child(S.documentTypeList('gallery').title('Photo Galleries')),
              S.listItem()
                .title('Gallery Categories')
                .child(S.documentTypeList('galleryCategory').title('Gallery Categories')),
            ])
        ),
      
      // Pre-defined category lists for quick access
      S.divider(),
      S.listItem()
        .title('Destinations')
        .child(
          S.documentTypeList('gallery')
            .title('Destination Galleries')
            .filter('_type == "gallery" && category->icon == "destinations"')
        ),
      S.listItem()
        .title('Cultural Tours')
        .child(
          S.documentTypeList('gallery')
            .title('Cultural Tour Galleries')
            .filter('_type == "gallery" && category->icon == "cultural"')
        ),
      
      S.divider(),
      
      // Blog & Content Section
      S.listItem()
        .title('Blog & Content')
        .child(
          S.list()
            .title('Blog & Content')
            .items([
              S.listItem()
                .title('Blog Posts')
                .child(S.documentTypeList('blogPost').title('Blog Articles')),
            ])
        ),
      
      // Customer Data Section
      S.listItem()
        .title('Customer Data')
        .child(
          S.list()
            .title('Customer Data')
            .items([
              S.listItem()
                .title('Contact Submissions')
                .child(S.documentTypeList('contactSubmission').title('Contact Form Submissions')),
            ])
        ),
      
      S.divider(),
      
      // All Documents (fallback)
      ...S.documentTypeListItems().filter(
        (listItem) => !['heroSection', 'featuresSection', 'testimonial', 'siteSettings', 'businessInfo', 'themeSettings', 'socialSettings', 'contentSettings', 'servicePackage', 'gallery', 'galleryCategory', 'blogPost', 'contactSubmission'].includes(listItem.getId() || '')
      ),
    ])
