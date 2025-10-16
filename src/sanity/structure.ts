import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      
      S.divider(),
      
      // Website Content
      S.listItem()
        .title('Beranda Page')
        .child(
          S.list()
            .title('Beranda Page')
            .items([
              S.listItem()
                .title('Hero Section')
                .child(
                  S.document()
                    .schemaType('heroSection')
                    .documentId('heroSection')
                ),
              S.listItem()
                .title('💬 Testimonials')
                .child(
                  S.documentTypeList('testimonial')
                    .title('Customer Testimonials')
                ),
            ])
        ),

      // About Us Page
      S.listItem()
        .title('Tentang Kami Page')
        .child(
          S.document()
            .schemaType('aboutUs')
            .documentId('aboutUs')
        ),
      
      // Services & Tours Section
      S.listItem()
        .title('Layanan Page')
        .child(
          S.list()
            .title('Layanan Page')
            .items([
              S.listItem()
                .title('📦 Service Packages')
                .child(
                  S.documentTypeList('servicePackage')
                    .title('Service Packages')
                ),
              S.listItem()
                .title('✨ Service Features')
                .child(
                  S.documentTypeList('featuresSection')
                    .title('Service Features')
                ),
            ])
        ),
      
      // Gallery & Portfolio Section
      S.listItem()
        .title('Galery Page')
        .child(
          S.list()
            .title('Galery Page')
            .items([
              S.listItem()
                .title('🖼️ Galleries')
                .child(S.documentTypeList('gallery').title('Photo Galleries')),
              S.listItem()
                .title('📂 Gallery Categories')
                .child(S.documentTypeList('gallery').title('Gallery'))
            ])
        ),

      // Blog & Content
      S.listItem()
        .title('Blog Page')
        .child(
          S.list()
            .title('Blog Page')
            .items([
              S.listItem()
                .title('📝 Blog Posts')
                .child(S.documentTypeList('blogPost').title('Blog Articles')),
            ])
        ),      
      
      S.divider(),
      
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
                .title('📱 Social Media & Communication')
                .child(
                  S.document()
                    .schemaType('socialSettings')
                    .documentId('socialSettings')
                ),
              S.listItem()
                .title('📞 Contact & Site Settings')
                .child(
                  S.document()
                    .schemaType('contactData')
                    .documentId('contactData')
                ),
              S.listItem()
                .title('⚠️ Error Pages')
                .child(
                  S.document()
                    .schemaType('errorPages')
                    .documentId('errorPages')
                ),
            ])
        ),
      
      S.divider(),
      
      // All Documents (fallback)
      ...S.documentTypeListItems().filter(
        (listItem) => !['heroSection', 'featuresSection', 'testimonial', 'siteSettings', 'businessInfo', 'themeSettings', 'socialSettings', 'contentSettings', 'servicePackage', 'gallery', 'blogPost', 'contactSubmission', 'aboutUs', 'contactData', 'errorPages'].includes(listItem.getId() || '')
      ),
    ])
