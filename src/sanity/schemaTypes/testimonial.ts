import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      description: 'Name of the customer giving the testimonial'
    }),
    defineField({
      name: 'customerTitle',
      title: 'Customer Title/Position',
      type: 'string',
      description: 'Job title or position of the customer (optional)'
    }),
    defineField({
      name: 'customerPhoto',
      title: 'Customer Photo',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/jpeg, image/png, image/webp',
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Customer photo description for accessibility'
        }
      ],
      description: 'CUSTOMER PHOTO: 400x400px (1:1) | Max Size: 5MB | Format: JPG/PNG/WebP'
    }),
    defineField({
      name: 'testimonialText',
      title: 'Testimonial Text',
      type: 'text',
      description: 'The testimonial content'
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5 stars (1-5)'
    }),
    defineField({
      name: 'tourPackage',
      title: 'Tour Package',
      type: 'string',
      description: 'Which tour package this testimonial is about (optional)'
    }),
    defineField({
      name: 'dateOfTour',
      title: 'Date of Tour',
      type: 'date',
      description: 'When the customer took the tour (optional)'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this testimonial'
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as featured testimonial for homepage'
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Indonesian', value: 'id' },
          { title: 'English', value: 'en' }
        ],
        layout: 'radio'
      },
      initialValue: 'id'
    })
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'testimonialText',
      media: 'customerPhoto',
      rating: 'rating',
      language: 'language'
    },
    prepare(selection) {
      const { title, subtitle, rating, language } = selection
      const stars = '★'.repeat(rating || 0) + '☆'.repeat(5 - (rating || 0))
      return {
        title: title,
        subtitle: `${stars} - ${subtitle?.substring(0, 60)}... (${language?.toUpperCase() || 'ID'})`
      }
    }
  }
})