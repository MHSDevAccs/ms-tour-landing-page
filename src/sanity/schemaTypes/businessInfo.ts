import { defineField, defineType } from 'sanity'

export const businessInfo = defineType({
  name: 'businessInfo',
  title: 'Business Information',
  type: 'document',
  fields: [
    // defineField({
    //   name: 'logo',
    //   title: 'Company Logo',
    //   type: 'image',
    //   options: {
    //     hotspot: true,
    //     accept: 'image/png, image/svg+xml, image/webp',
    //   },
    //   fields: [
    //     {
    //       name: 'alt',
    //       type: 'string',
    //       title: 'Alternative Text',
    //       description: 'Logo description for accessibility'
    //     }
    //   ],
    //   description: 'COMPANY LOGO: 400x200px (2:1) | Max Size: 20MB | Format: PNG/SVG/WebP'
    // }),
    // defineField({
    //   name: 'logoAlt',
    //   title: 'Logo Alt Text',
    //   type: 'string',
    //   description: 'Alternative text for the logo (for accessibility)',
    // }),
    defineField({
      name: 'siteName',
      title: 'Company Name',
      type: 'string',
      description: 'Company/Brand name',
      initialValue: 'Mahabbatussholihin Tour & Travel',
    }),
    defineField({
      name: 'siteTitle',
      title: 'Site Title (SEO)',
      type: 'string',
      description: 'Page title for SEO and browser tab',
      initialValue: 'Mahabbatussholihin Tour & Travel - Your Gateway to Unforgettable Adventures',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description (SEO)',
      type: 'text',
      description: 'Meta description for SEO and social sharing',
      initialValue: 'Discover amazing destinations with Mahabbatussholihin Tour & Travel. We offer personalized travel experiences, expert guides, and unforgettable adventures across Indonesia and beyond.',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Informasi Kontak',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Nomor Telpon',
          type: 'string',
          placeholder: '+6287770005801'
        },
        {
          name: 'email',
          title: 'Alamat Email',
          type: 'string',
          placeholder: 'info@mahabbatussholihin.com'
        },
        {
          name: 'address',
          title: 'Alamat Perusahaan',
          type: 'text',
          placeholder: 'Jl. Example Street No. 123, Lombok, Indonesia'
        }
      ]
    }),
    // defineField({
    //   name: 'businessHours',
    //   title: 'Pengatur Jam',
    //   type: 'object',
      // fields: [
      //   {
      //     name: 'mondayFriday',
      //     title: 'Jam Operasional',
      //     type: 'string',
      //     placeholder: 'Masukkan Jam Operasional'
      //   },
      //   // {
      //   //   name: 'saturday',    
      //   //   title: 'Saturday',
      //   //   type: 'string',
      //   //   initialValue: '9:00 AM - 4:00 PM'
      //   // },
      //   // {
      //   //   name: 'sunday',
      //   //   title: 'Sunday',
      //   //   type: 'string',
      //   //   initialValue: 'Closed'
      //   // },
      //   {
      //     name: 'timezone',
      //     title: 'Timezone',
      //     type: 'string',
      //     initialValue: 'WIB (GMT+7)'
      //   }
      // ]
    // }),
    defineField({
      name: 'content',
      title: 'Company Content',
      type: 'object',
      fields: [
        {
          name: 'tagline',
          title: 'Company Tagline',
          type: 'string',
          initialValue: 'Mitra Terpercaya untuk Perjalanan Spiritual Terbaik',
          description: 'Main tagline displayed in footer and emails'
        },
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          initialValue: '© 2024 Mahabbatussholihin Tour & Travel. All rights reserved.',
          description: 'Copyright notice in footer'
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'logo',
    },
  },
})