import { defineField, defineType } from 'sanity'

export const aboutUs = defineType({
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  fields: [
    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for search engines and browser tab',
      initialValue: 'Tentang Kami - Mahabbatussholihin Tour & Travel',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Description for search engines and social sharing',
      initialValue: 'Mahabbatussholihin Tour & Travel adalah mitra perjalanan terpercaya dengan pengalaman bertahun-tahun. Komitmen kami memberikan pengalaman wisata terbaik dengan pelayanan profesional dan harga kompetitif.',
    }),

    // Header Section
    defineField({
      name: 'mainTitle',
      title: 'Main Title',
      type: 'string',
      description: 'Main heading for the about page',
      initialValue: 'Tentang Kami',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Subtitle text below main title',
      initialValue: 'Mahabbatussholihin Tour & Travel - Mitra Perjalanan Terpercaya Anda',
    }),

    // Content Section
    defineField({
      name: 'contentSection',
      title: 'Content Section',
      type: 'object',
      fields: [
        defineField({
          name: 'ourStory',
          title: 'Our Story',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Cerita Kami',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Rich text content for our story section',
            }),
          ],
        }),
        defineField({
          name: 'ourMission',
          title: 'Our Mission',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Misi Kami',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Rich text content for our mission section',
            }),
          ],
        }),
        defineField({
          name: 'whyChooseUs',
          title: 'Why Choose Us',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Mengapa Memilih Kami',
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Item Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                    }),
                    defineField({
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                      description: 'Icon name or class (e.g., "shield-check", "users", "star")',
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
      ],
    }),

    // Legalitas Section
    defineField({
      name: 'legalitasSection',
      title: 'Legalitas Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Legalitas Perusahaan',
        }),
        defineField({
          name: 'companyName',
          title: 'Company Name',
          type: 'string',
          initialValue: 'PT. Mahabbatussholihin Tour & Travel',
        }),
        defineField({
          name: 'nib',
          title: 'NIB (Nomor Induk Berusaha)',
          type: 'string',
          description: 'Business identification number',
        }),
        defineField({
          name: 'address',
          title: 'Company Address',
          type: 'text',
          description: 'Full company address',
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          description: 'Company phone number',
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
          description: 'Company email address',
        }),
        defineField({
          name: 'website',
          title: 'Website',
          type: 'url',
          description: 'Company website URL',
        }),
      ],
    }),

    // Additional Settings
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Enable/disable this about page content',
      initialValue: true,
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When this content was last updated',
      initialValue: new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'mainTitle',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'About Us',
        subtitle: subtitle || 'About page content',
      }
    },
  },
})

export default aboutUs