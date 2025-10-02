import { defineType, defineField } from 'sanity'

export const servicePageContent = defineType({
  name: 'servicePageContent',
  title: 'Service Page Content',
  type: 'document',
  icon: () => '🛎️',
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

    // Service Categories
    defineField({
      name: 'serviceCategories',
      title: 'Service Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Category Description',
              type: 'text',
              rows: 2
            }),
            defineField({
              name: 'icon',
              title: 'Category Icon',
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
              name: 'slug',
              title: 'Category Slug',
              type: 'slug',
              options: {
                source: 'name',
                maxLength: 96
              },
              validation: (Rule) => Rule.required()
            })
          ]
        }
      ]
    }),

    // Featured Services
    defineField({
      name: 'featuredServices',
      title: 'Featured Services',
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
          name: 'services',
          title: 'Featured Service Packages',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'servicePackage' }]
            }
          ],
          validation: (Rule) => Rule.max(8)
        })
      ]
    }),

    // Service Content Sections
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
                },
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alternative Text',
                      type: 'string',
                      validation: (Rule) => Rule.required()
                    }
                  ]
                }
              ]
            }),
            defineField({
              name: 'backgroundImage',
              title: 'Section Background Image',
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
          type: 'string',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 3
        }),
        defineField({
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'url',
              validation: (Rule) => Rule.required()
            })
          ]
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button (Optional)',
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
        title: title || 'Service Page Content',
        subtitle: subtitle || 'Services page configuration'
      }
    }
  }
})

export default servicePageContent