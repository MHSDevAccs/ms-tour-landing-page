export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(3).max(100)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Gallery Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(300)
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for SEO and accessibility',
        }
      ],
      description: '📸 FEATURED: 1280x720px (16:9 ratio) | Max Size: 20MB | Format: JPEG/PNG/WebP'
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      options: {
        modal: { type: 'dialog', width: 0.8 },
        editModal: 'popover'
      },
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          title: 'Gallery Image',
          options: {
            modal: { type: 'dialog', width: 0.9 }
          },
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              validation: (Rule: any) => Rule.required(),
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                  description: 'Describe the image for accessibility',
                  validation: (Rule: any) => Rule.required().min(3).max(200)
                }
              ]
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption for the image'
            },
            {
              name: 'dateTaken',
              title: 'Date Taken',
              type: 'datetime',
              description: 'When was this photo taken?'
            },
            {
              name: 'photographer',
              title: 'Photographer',
              type: 'string',
              description: 'Photo credit (optional)'
            },
            {
              name: 'tags',
              title: 'Image Tags',
              type: 'array',
              of: [{ type: 'string' }],
              options: {
                layout: 'tags'
              },
              description: 'Keywords for searchability'
            }
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
              subtitle: 'dateTaken'
            },
            prepare(selection: any) {
              const { title, subtitle } = selection
              return {
                title: title || 'Untitled Image',
                subtitle: subtitle ? new Date(subtitle).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'UTC'
                }) : 'No date'
              }
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(1).max(50).error('Gallery must have 1-50 images')
    },
    {
      name: 'tourPackage',
      title: 'Related Tour Package',
      type: 'reference',
      to: [{ type: 'servicePackage' }],
      description: 'Link to related tour service (optional)'
    },
    {
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
      description: 'Only published galleries will appear on the website'
    },
    {
      name: 'isFeatured',
      title: 'Featured Gallery',
      type: 'boolean',
      initialValue: false,
      description: 'Featured galleries appear prominently on homepage'
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'When should this gallery be published?'
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule: any) => Rule.max(60),
      description: 'Title for search engines (max 60 characters)'
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (Rule: any) => Rule.max(160),
      description: 'Description for search engines (max 160 characters)'
    }
  ],
  
  orderings: [
    {
      title: 'Newest First',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }]
    },
    {
      title: 'Oldest First',
      name: 'publishDateAsc',
      by: [{ field: 'publishDate', direction: 'asc' }]
    },
    {
      title: 'Most Viewed',
      name: 'viewCountDesc',
      by: [{ field: 'publishDate', direction: 'desc' }]
    }
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'featuredImage',
      imageCount: 'images.length'
    },
    prepare(selection: any) {
      const { title, subtitle, imageCount } = selection
      return {
        title,
        subtitle: `${subtitle || 'No description'} • ${imageCount || 0} images`
      }
    }
  }
}