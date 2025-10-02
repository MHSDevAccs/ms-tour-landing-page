import { defineType, defineField } from 'sanity'

export const blogPageContent = defineType({
  name: 'blogPageContent',
  title: 'Blog Page Content',
  type: 'document',
  icon: () => '📝',
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

    // Featured Posts Section
    defineField({
      name: 'featuredPosts',
      title: 'Featured Posts Section',
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
          name: 'posts',
          title: 'Featured Blog Posts',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'blogPost' }]
            }
          ],
          validation: (Rule) => Rule.max(6),
          description: 'Select up to 6 posts to feature'
        }),
        defineField({
          name: 'showReadMore',
          title: 'Show Read More Button',
          type: 'boolean',
          initialValue: true
        })
      ]
    }),

    // Blog Categories Section
    defineField({
      name: 'categoriesSection',
      title: 'Categories Section',
      type: 'object',
      fields: [
        defineField({
          name: 'showCategories',
          title: 'Show Categories Section',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Browse by Category'
        }),
        defineField({
          name: 'categories',
          title: 'Blog Categories',
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
                  name: 'slug',
                  title: 'Category Slug',
                  type: 'slug',
                  options: {
                    source: 'name',
                    maxLength: 96
                  },
                  validation: (Rule) => Rule.required()
                }),
                defineField({
                  name: 'description',
                  title: 'Category Description',
                  type: 'text',
                  rows: 3
                }),
                defineField({
                  name: 'icon',
                  title: 'Category Icon',
                  type: 'string',
                  description: 'Icon name or emoji for the category'
                }),
                defineField({
                  name: 'color',
                  title: 'Category Color',
                  type: 'string',
                  description: 'Hex color code (e.g., #FF5733)',
                  validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                    name: 'hex color',
                    invert: false
                  }).error('Please enter a valid hex color code (e.g., #FF5733)')
                })
              ]
            }
          ]
        })
      ]
    }),

    // Blog Display Settings
    defineField({
      name: 'displaySettings',
      title: 'Blog Display Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'layout',
          title: 'Blog Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Grid', value: 'grid' },
              { title: 'List', value: 'list' },
              { title: 'Masonry', value: 'masonry' }
            ]
          },
          initialValue: 'grid'
        }),
        defineField({
          name: 'postsPerPage',
          title: 'Posts Per Page',
          type: 'number',
          initialValue: 9,
          validation: (Rule) => Rule.min(6).max(24)
        }),
        defineField({
          name: 'showExcerpt',
          title: 'Show Post Excerpt',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'showAuthor',
          title: 'Show Author Information',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'showPublishDate',
          title: 'Show Publish Date',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'showReadTime',
          title: 'Show Estimated Read Time',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'showTags',
          title: 'Show Post Tags',
          type: 'boolean',
          initialValue: true
        })
      ]
    }),

    // Newsletter Signup
    defineField({
      name: 'newsletter',
      title: 'Newsletter Signup',
      type: 'object',
      fields: [
        defineField({
          name: 'showNewsletter',
          title: 'Show Newsletter Signup',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'title',
          title: 'Newsletter Title',
          type: 'string',
          initialValue: 'Stay Updated'
        }),
        defineField({
          name: 'description',
          title: 'Newsletter Description',
          type: 'text',
          rows: 3,
          initialValue: 'Subscribe to our newsletter to get the latest updates and travel tips.'
        }),
        defineField({
          name: 'buttonText',
          title: 'Subscribe Button Text',
          type: 'string',
          initialValue: 'Subscribe'
        }),
        defineField({
          name: 'placeholderText',
          title: 'Email Placeholder Text',
          type: 'string',
          initialValue: 'Enter your email address'
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Newsletter Background Image',
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

    // Content Sections
    defineField({
      name: 'contentSections',
      title: 'Additional Content Sections',
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
              name: 'image',
              title: 'Section Image',
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
        title: title || 'Blog Page Content',
        subtitle: subtitle || 'Blog page configuration'
      }
    }
  }
})

export default blogPageContent