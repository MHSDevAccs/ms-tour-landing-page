export default {
  name: 'galleryCategory',
  title: 'Gallery Categories',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(3).max(50)
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
      title: 'Category Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(200)
    },
    {
      name: 'icon',
      title: 'Category Icon',
      type: 'string',
      options: [
          { title: 'Destinations', value: 'destinations' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Adventure', value: 'adventure' },
          { title: 'Religious', value: 'religious' },
          { title: 'Nature', value: 'nature' },
          { title: 'Culinary', value: 'culinary' },
          { title: 'Accommodation', value: 'accommodation' },
          { title: 'Transportation', value: 'transportation' },
          { title: 'Activities', value: 'activities' },
          { title: 'Customers', value: 'customers' }
        ],
        layout: 'dropdown',
        initialValue: 'destinations'
    },
    {
      name: 'coverImage',
      title: 'Category Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text'
        }
      ],
      description: 'COVER: 800x600px (4:3 ratio) | Max Size: 10MB | Format: JPEG/PNG/WebP'
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first'
    },
    {
      name: 'isActive',
      title: 'Active Category',
      type: 'boolean',
      initialValue: true,
      description: 'Only active categories will be shown'
    }
  ],
  
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }]
    },
    {
      title: 'Category Name',
      name: 'title',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'coverImage',
      icon: 'icon'
    },
    prepare(selection: any) {
      const { title, subtitle, icon } = selection
      return {
        title: `${icon} ${title}`,
        subtitle: subtitle || 'No description'
      }
    }
  }
}