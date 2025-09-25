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
      name: 'category',
      title: 'Gallery Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tour Destinations', value: 'destinations' },
          { title: 'Cultural Tours', value: 'cultural' },
          { title: 'Adventure Tours', value: 'adventure' },
          { title: 'Religious Tours', value: 'religious' },
          { title: 'Nature & Landscape', value: 'nature' },
          { title: 'Food & Culinary', value: 'culinary' },
          { title: 'Accommodation', value: 'accommodation' },
          { title: 'Transportation', value: 'transportation' },
          { title: 'Activities', value: 'activities' },
          { title: 'Customer Moments', value: 'customers' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'destination',
      title: 'Destination/Location',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Location Name',
          type: 'string',
          placeholder: 'e.g., Yogyakarta, Bandung, Jakarta'
        },
        {
          name: 'province',
          title: 'Province',
          type: 'string',
          placeholder: 'e.g., DI Yogyakarta, Jawa Barat'
        },
        {
          name: 'coordinates',
          title: 'GPS Coordinates',
          type: 'geopoint',
          description: 'Optional: GPS location for mapping'
        }
      ]
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
      description: '📸 FEATURED: 1200x800px (3:2 ratio) | Max Size: 20MB | Format: JPEG/PNG/WebP'
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                  description: 'Describe the image for accessibility'
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
                subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'No date'
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
    },
    {
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      description: 'Number of times this gallery has been viewed'
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
      by: [{ field: 'viewCount', direction: 'desc' }]
    },
    {
      title: 'Category',
      name: 'category',
      by: [{ field: 'category', direction: 'asc' }]
    }
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage',
      imageCount: 'images.length'
    },
    prepare(selection: any) {
      const { title, subtitle, imageCount } = selection
      return {
        title,
        subtitle: `${subtitle} • ${imageCount || 0} images`
      }
    }
  }
}