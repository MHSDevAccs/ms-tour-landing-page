import { defineField, defineType } from 'sanity'

export const businessInfo = defineType({
  name: 'businessInfo',
  title: 'Business Information',
  type: 'document',
  icon: () => '🏢',
  fields: [
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/png, image/svg+xml, image/webp',
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Logo description for accessibility'
        }
      ],
      description: 'COMPANY LOGO: 400x200px (2:1) | Max Size: 20MB | Format: PNG/SVG/WebP'
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      description: 'Alternative text for the logo (for accessibility)',
      initialValue: 'MS Tour & Travel'
    }),
    defineField({
      name: 'siteName',
      title: 'Company Name',
      type: 'string',
      description: 'Company/Brand name',
      initialValue: 'Mahabbatussholihin Tour & Travel',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'tagline',
      title: 'Company Tagline',
      type: 'string',
      description: 'Short descriptive phrase about your company',
      initialValue: 'Mitra Terpercaya untuk Perjalanan Spiritual Terbaik'
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          placeholder: '+62 811 1000 2477'
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
          placeholder: 'info@mahabbatussholihin.com'
        },
        {
          name: 'address',
          title: 'Physical Address',
          type: 'text',
          placeholder: 'Jl. Example Street No. 123, Lombok, Indonesia'
        },
        {
          name: 'whatsapp',
          title: 'WhatsApp Number',
          type: 'string',
          placeholder: '+62 811 1000 2477',
          initialValue: '+62 811 1000 2477'
        }
      ]
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        {
          name: 'mondayFriday',
          title: 'Monday - Friday',
          type: 'string',
          initialValue: '9:00 AM - 6:00 PM'
        },
        {
          name: 'saturday',
          title: 'Saturday',
          type: 'string',
          initialValue: '9:00 AM - 4:00 PM'
        },
        {
          name: 'sunday',
          title: 'Sunday',
          type: 'string',
          initialValue: 'Closed'
        },
        {
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
          initialValue: 'WIB (GMT+7)'
        }
      ]
    }),
    defineField({
      name: 'siteTitle',
      title: 'Site Title (Legacy)',
      type: 'string',
      description: 'Legacy site title field for backward compatibility',
      initialValue: 'Mahabbatussholihin Tour & Travel - Your Gateway to Unforgettable Adventures'
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description (Legacy)',
      type: 'text',
      description: 'Legacy site description field for backward compatibility',
      initialValue: 'Discover amazing destinations with Mahabbatussholihin Tour & Travel. We offer personalized travel experiences, expert guides, and unforgettable adventures across Indonesia and beyond.'
    }),
    defineField({
      name: 'content',
      title: 'Legacy Content',
      type: 'object',
      description: 'Legacy content fields for backward compatibility',
      fields: [
        {
          name: 'copyrightText',
          title: 'Copyright Text (Legacy)',
          type: 'string',
          initialValue: '© 2024 Mahabbatussholihin Tour & Travel. All rights reserved.',
          description: 'Legacy copyright text field'
        },
        {
          name: 'tagline',
          title: 'Tagline (Legacy)',
          type: 'string',
          initialValue: 'Mitra Terpercaya untuk Perjalanan Spiritual Terbaik',
          description: 'Legacy tagline field'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'logo',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Business Information',
        media,
      }
    }
  }
})