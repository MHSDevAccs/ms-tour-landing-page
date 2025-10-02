import { defineType, defineField } from 'sanity'

export const mainPageContent = defineType({
  name: 'mainPageContent',
  title: 'Main Page Content',
  type: 'document',
  icon: () => '🏠',
  fields: [
    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          validation: (Rule) => Rule.required().min(10).max(100)
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(200)
        }),
        defineField({
          name: 'ctaText',
          title: 'Call to Action Text',
          type: 'string',
          validation: (Rule) => Rule.max(50)
        }),
        defineField({
          name: 'ctaLink',
          title: 'Call to Action Link',
          type: 'url'
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
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
        }),
        defineField({
          name: 'sliderImages',
          title: 'Slider Images',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Image',
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
                }),
                defineField({
                  name: 'caption',
                  title: 'Caption',
                  type: 'string'
                })
              ]
            }
          ]
        }),
        defineField({
          name: 'sliderSettings',
          title: 'Slider Settings',
          type: 'object',
          fields: [
            defineField({
              name: 'autoplay',
              title: 'Autoplay',
              type: 'boolean',
              initialValue: true
            }),
            defineField({
              name: 'interval',
              title: 'Autoplay Interval (seconds)',
              type: 'number',
              initialValue: 5,
              validation: (Rule) => Rule.min(1).max(30)
            }),
            defineField({
              name: 'showNavigation',
              title: 'Show Navigation Arrows',
              type: 'boolean',
              initialValue: true
            }),
            defineField({
              name: 'showDots',
              title: 'Show Dots Indicator',
              type: 'boolean',
              initialValue: true
            }),
            defineField({
              name: 'pauseOnHover',
              title: 'Pause on Hover',
              type: 'boolean',
              initialValue: true
            })
          ]
        }),
        defineField({
          name: 'isActive',
          title: 'Is Active',
          type: 'boolean',
          initialValue: true
        })
      ]
    }),

    // Features Section
    defineField({
      name: 'featuresSection',
      title: 'Features Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required().min(5).max(100)
        }),
        defineField({
          name: 'sectionSubtitle',
          title: 'Section Subtitle',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(300)
        }),
        defineField({
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Feature Title',
                  type: 'string',
                  validation: (Rule) => Rule.required().min(3).max(100)
                }),
                defineField({
                  name: 'description',
                  title: 'Feature Description',
                  type: 'text',
                  rows: 3,
                  validation: (Rule) => Rule.required().min(10).max(300)
                }),
                defineField({
                  name: 'icon',
                  title: 'Feature Icon',
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
                }),
                defineField({
                  name: 'link',
                  title: 'Feature Link (Optional)',
                  type: 'url'
                })
              ]
            }
          ],
          validation: (Rule) => Rule.min(1).max(6)
        }),
        defineField({
          name: 'isActive',
          title: 'Is Active',
          type: 'boolean',
          initialValue: true
        })
      ]
    }),

    // Testimonials Section
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required().min(5).max(100)
        }),
        defineField({
          name: 'sectionSubtitle',
          title: 'Section Subtitle',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(300)
        }),
        defineField({
          name: 'testimonials',
          title: 'Featured Testimonials',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'testimonial' }]
            }
          ],
          validation: (Rule) => Rule.max(10)
        }),
        defineField({
          name: 'showAllTestimonials',
          title: 'Show All Testimonials',
          type: 'boolean',
          description: 'If enabled, will show all active testimonials instead of just featured ones',
          initialValue: false
        }),
        defineField({
          name: 'isActive',
          title: 'Is Active',
          type: 'boolean',
          initialValue: true
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
      title: 'heroSection.title',
      subtitle: 'heroSection.subtitle',
      media: 'heroSection.backgroundImage'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Main Page Content',
        subtitle: subtitle || 'Homepage content configuration'
      }
    }
  }
})

export default mainPageContent