import { defineType, defineField } from 'sanity'

export const galleryPageContent = defineType({
  name: 'galleryPageContent',
  title: 'Gallery Page Content',
  type: 'document',
  icon: () => '🖼️',
  fields: [
    // Page Header
    defineField({
      name: 'pageHeader',
      title: 'Page Header',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Page Title',
          type: 'string',
          validation: (Rule) => Rule.required().min(5).max(100)
        }),
        defineField({
          name: 'subtitle',
          title: 'Page Subtitle',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(300)
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Header Background Image',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: (Rule) => Rule.required()
            })
          ]
        })
      ]
    }),

    // Gallery Categories Management
    defineField({
      name: 'categorySettings',
      title: 'Category Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'showCategoryFilter',
          title: 'Show Category Filter',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'defaultCategory',
          title: 'Default Category',
          type: 'reference',
          to: [{ type: 'galleryCategory' }],
          description: 'Category to show by default when page loads'
        }),
        defineField({
          name: 'categoriesPerRow',
          title: 'Categories Per Row',
          type: 'number',
          initialValue: 4,
          validation: (Rule) => Rule.min(2).max(6)
        })
      ]
    }),

    // Featured Galleries
    defineField({
      name: 'featuredGalleries',
      title: 'Featured Galleries',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'sectionSubtitle',
          title: 'Section Subtitle',
          type: 'text',
          rows: 3
        }),
        defineField({
          name: 'galleries',
          title: 'Featured Gallery Items',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'gallery' }]
            }
          ],
          validation: (Rule) => Rule.max(12)
        })
      ]
    }),

    // Gallery Display Settings
    defineField({
      name: 'displaySettings',
      title: 'Gallery Display Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'layout',
          title: 'Gallery Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Grid', value: 'grid' },
              { title: 'Masonry', value: 'masonry' },
              { title: 'Carousel', value: 'carousel' }
            ]
          },
          initialValue: 'grid'
        }),
        defineField({
          name: 'itemsPerPage',
          title: 'Items Per Page',
          type: 'number',
          initialValue: 12,
          validation: (Rule) => Rule.min(6).max(24)
        }),
        defineField({
          name: 'showPagination',
          title: 'Show Pagination',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'enableLightbox',
          title: 'Enable Lightbox',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'showImageInfo',
          title: 'Show Image Information',
          type: 'boolean',
          initialValue: true,
          description: 'Show title, description, and metadata for images'
        })
      ]
    }),

    // Gallery Content Sections
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'content',
              title: 'Section Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'Quote', value: 'blockquote' }
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' }
                    ],
                    annotations: [
                      {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                          {
                            title: 'URL',
                            name: 'href',
                            type: 'url'
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            }),
            defineField({
              name: 'gallery',
              title: 'Section Gallery',
              type: 'reference',
              to: [{ type: 'gallery' }],
              description: 'Optional gallery to display in this section'
            })
          ]
        }
      ]
    }),

    // Call to Action
    defineField({
      name: 'callToAction',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'CTA Title',
          type: 'string'
        }),
        defineField({
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 3
        }),
        defineField({
          name: 'button',
          title: 'CTA Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string'
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'url'
            })
          ]
        }),
        defineField({
          name: 'backgroundImage',
          title: 'CTA Background Image',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string'
            })
          ]
        })
      ]
    }),

    // SEO Fields
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Page Title',
          type: 'string',
          validation: (Rule) => Rule.max(60)
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160)
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        })
      ]
    })
  ],

  preview: {
    select: {
      title: 'pageHeader.title',
      subtitle: 'pageHeader.subtitle',
      media: 'pageHeader.backgroundImage'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Gallery Page Content',
        subtitle: subtitle || 'Gallery page configuration'
      }
    }
  }
})

export default galleryPageContent