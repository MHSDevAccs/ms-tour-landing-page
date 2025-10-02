import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      // Site Settings
      S.listItem()
        .title('⚙️ Site Settings')
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
                    .title('Business Information')
                ),
              S.listItem()
                .title('🎨 Theme & Design')
                .child(
                  S.document()
                    .schemaType('themeDesign')
                    .documentId('themeDesign')
                    .title('Theme & Design')
                ),
              S.listItem()
                .title('📱 Social Media')
                .child(
                  S.document()
                    .schemaType('socialMedia')
                    .documentId('socialMedia')
                    .title('Social Media')
                ),
              S.listItem()
                .title('📝 Content Management')
                .child(
                  S.document()
                    .schemaType('contentManagement')
                    .documentId('contentManagement')
                    .title('Content Management')
                ),
            ])
        ),
      
      S.divider(),
      
      // Main Page Content
      S.listItem()
        .title('🏠 Main Page Content')
        .child(
          S.document()
            .schemaType('mainPageContent')
            .documentId('mainPageContent')
            .title('Main Page Content')
        ),
      
      // Service Page Content
      S.listItem()
        .title('🛎️ Service Page Content')
        .child(
          S.document()
            .schemaType('servicePageContent')
            .documentId('servicePageContent')
            .title('Service Page Content')
        ),
      
      // About Us Page Content
      S.listItem()
        .title('ℹ️ About Us Page Content')
        .child(
          S.document()
            .schemaType('aboutUs')
            .documentId('aboutUs')
            .title('About Us Content')
        ),
      
      // Gallery Page
      S.listItem()
        .title('🖼️ Gallery Page')
        .child(
          S.list()
            .title('Gallery Page')
            .items([
              S.listItem()
                .title('📄 Gallery Page Content')
                .child(
                  S.document()
                    .schemaType('galleryPageContent')
                    .documentId('galleryPageContent')
                    .title('Gallery Page Settings')
                ),
              S.listItem()
                .title('🖼️ Galleries')
                .child(
                  S.documentTypeList('gallery')
                    .title('Photo Galleries')
                ),
              S.listItem()
                .title('📂 Gallery Categories')
                .child(
                  S.documentTypeList('galleryCategory')
                    .title('Gallery Categories')
                ),
            ])
        ),
      
      // Blog Page
      S.listItem()
        .title('📝 Blog Page')
        .child(
          S.list()
            .title('Blog Page')
            .items([
              S.listItem()
                .title('📄 Blog Page Content')
                .child(
                  S.document()
                    .schemaType('blogPageContent')
                    .documentId('blogPageContent')
                    .title('Blog Page Settings')
                ),
              S.listItem()
                .title('📝 Blog Posts')
                .child(
                  S.documentTypeList('blogPost')
                    .title('Blog Articles')
                ),
            ])
        ),
      
      S.divider(),
      
      // Additional Content Types (if any exist that aren't covered above)
      ...S.documentTypeListItems().filter(
        (listItem) => ![
          'siteSettings',
          'mainPageContent', 
          'servicePageContent',
          'aboutUs',
          'galleryPageContent',
          'blogPageContent',
          'gallery',
          'galleryCategory',
          'blogPost',
          'servicePackage',
          'contactSubmission',
          // Legacy schemas that might still exist
          'heroSection',
          'featuresSection', 
          'testimonial',
          'businessInfo',
          'themeSettings',
          'socialSettings',
          'contentSettings'
        ].includes(listItem.getId() || '')
      ),
    ])
