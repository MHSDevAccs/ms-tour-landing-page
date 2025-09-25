export default {
  name: 'servicePackage',
  title: 'Service Package',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
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
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().min(50).max(300)
    },
    {
      name: 'icon',
      title: 'Service Icon/Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Alternative text for screen readers. Very important for SEO and accessibility.',
        }
      ]
    },
    {
      name: 'features',
      title: 'Service Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.min(3).max(6)
    },
    {
      name: 'price',
      title: 'Starting Price',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Price Amount',
          type: 'number'
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: [
              { title: 'Indonesian Rupiah (IDR)', value: 'IDR' },
              { title: 'US Dollar (USD)', value: 'USD' },
              { title: 'Euro (EUR)', value: 'EUR' }
            ]
          },
          initialValue: 'IDR'
        },
        {
          name: 'unit',
          title: 'Price Unit',
          type: 'string',
          options: {
            list: [
              { title: 'Per Person', value: 'person' },
              { title: 'Per Group', value: 'group' },
              { title: 'Per Day', value: 'day' },
              { title: 'Per Package', value: 'package' }
            ]
          },
          initialValue: 'person'
        }
      ]
    },
    {
      name: 'category',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tour Packages', value: 'packages' },
          { title: 'Custom Tours', value: 'custom' },
          { title: 'Group Tours', value: 'group' },
          { title: 'Private Tours', value: 'private' },
          { title: 'Adventure Tours', value: 'adventure' },
          { title: 'Cultural Tours', value: 'cultural' }
        ]
      }
    },
    {
      name: 'isPopular',
      title: 'Popular Service',
      type: 'boolean',
      initialValue: false,
      description: 'Mark this service as popular to feature it prominently'
    },
    {
      name: 'link',
      title: 'Service Link',
      type: 'string',
      description: 'URL path for this service (e.g., /services/custom-tours)'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first'
    }
  ],
  
  preview: {
    select: {
      title: 'title',
      media: 'icon',
      subtitle: 'category'
    }
  }
}