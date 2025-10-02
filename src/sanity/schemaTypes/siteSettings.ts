import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    // Business Information
    defineField({
      name: 'businessInfo',
      title: 'Business Information',
      type: 'object',
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
          initialValue: 'Mitra Terpercaya untuk Perjalanan Spiritual Terbaik',
          description: 'Main tagline displayed in footer and emails'
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
            },
            {
              name: 'email',
              title: 'Email Address',
              type: 'string',
            },
            {
              name: 'address',
              title: 'Physical Address',
              type: 'text',
            },
            {
              name: 'whatsapp',
              title: 'WhatsApp Number',
              type: 'string',
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
              initialValue: '09:00 - 18:00'
            },
            {
              name: 'saturday',
              title: 'Saturday',
              type: 'string',
              initialValue: '09:00 - 16:00'
            },
            {
              name: 'sunday',
              title: 'Sunday',
              type: 'string',
              initialValue: 'Tutup'
            },
            {
              name: 'timezone',
              title: 'Timezone',
              type: 'string',
              initialValue: 'WIB (GMT+7)'
            }
          ]
        })
      ]
    }),

    // Theme & Design
    defineField({
      name: 'themeDesign',
      title: 'Theme & Design',
      type: 'object',
      fields: [
        defineField({
          name: 'colors',
          title: 'Color Scheme',
          type: 'object',
          fields: [
            {
              name: 'primary',
              title: 'Primary Color',
              type: 'string',
              initialValue: '#39ace7',
              description: 'Main brand color (hex code)'
            },
            {
              name: 'primaryLight',
              title: 'Primary Light Color',
              type: 'string',
              initialValue: '#9bd4e4',
              description: 'Light variant of primary color'
            },
            {
              name: 'primaryDark',
              title: 'Primary Dark Color',
              type: 'string',
              initialValue: '#0784b5',
              description: 'Dark variant of primary color'
            },
            {
              name: 'secondary',
              title: 'Secondary Color',
              type: 'string',
              initialValue: '#ffffff',
              description: 'Secondary brand color'
            },
            {
              name: 'accent',
              title: 'Accent Color',
              type: 'string',
              initialValue: '#9bd4e4',
              description: 'Accent color for highlights'
            },
            {
              name: 'textPrimary',
              title: 'Primary Text Color',
              type: 'string',
              initialValue: '#1f2937',
              description: 'Main text color'
            },
            {
              name: 'textSecondary',
              title: 'Secondary Text Color',
              type: 'string',
              initialValue: '#6b7280',
              description: 'Secondary text color'
            },
            {
              name: 'background',
              title: 'Background Color',
              type: 'string',
              initialValue: '#ffffff',
              description: 'Main background color'
            },
            {
              name: 'backgroundAlt',
              title: 'Alternative Background Color',
              type: 'string',
              initialValue: '#f9fafb',
              description: 'Alternative background color'
            }
          ]
        }),
        defineField({
          name: 'buttons',
          title: 'Button Styles',
          type: 'object',
          fields: [
            {
              name: 'primaryButton',
              title: 'Primary Button Classes',
              type: 'string',
              initialValue: 'bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300',
              description: 'CSS classes for primary buttons'
            },
            {
              name: 'secondaryButton',
              title: 'Secondary Button Classes',
              type: 'string',
              initialValue: 'bg-white hover:bg-gray-50 text-primary border-2 border-primary font-semibold py-3 px-6 rounded-lg transition-colors duration-300',
              description: 'CSS classes for secondary buttons'
            },
            {
              name: 'outlineButton',
              title: 'Outline Button Classes',
              type: 'string',
              initialValue: 'border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300',
              description: 'CSS classes for outline buttons'
            }
          ]
        }),
        defineField({
          name: 'layout',
          title: 'Layout Styles',
          type: 'object',
          fields: [
            {
              name: 'container',
              title: 'Container Classes',
              type: 'string',
              initialValue: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
              description: 'CSS classes for main container'
            },
            {
              name: 'section',
              title: 'Section Classes',
              type: 'string',
              initialValue: 'py-16 lg:py-24',
              description: 'CSS classes for sections'
            },
            {
              name: 'headerBg',
              title: 'Header Background Classes',
              type: 'string',
              initialValue: 'bg-white shadow-md',
              description: 'CSS classes for header background'
            },
            {
              name: 'footerBg',
              title: 'Footer Background Classes',
              type: 'string',
              initialValue: 'bg-gray-900 text-white',
              description: 'CSS classes for footer background'
            }
          ]
        })
      ]
    }),

    // Social Media
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        },
        {
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
        }
      ]
    }),

    // Content Management
    defineField({
      name: 'contentManagement',
      title: 'Content Management',
      type: 'object',
      fields: [
        defineField({
          name: 'seo',
          title: 'SEO Settings',
          type: 'object',
          fields: [
            {
              name: 'siteTitle',
              title: 'Site Title (SEO)',
              type: 'string',
              description: 'Page title for SEO and browser tab',
              initialValue: 'Mahabbatussholihin Tour & Travel - Gerbang Menuju Petualangan Tak Terlupakan',
            },
            {
              name: 'siteDescription',
              title: 'Site Description (SEO)',
              type: 'text',
              description: 'Meta description for SEO and social sharing',
              initialValue: 'Temukan destinasi menakjubkan bersama Mahabbatussholihin Tour & Travel. Kami menawarkan pengalaman perjalanan yang dipersonalisasi, pemandu ahli, dan petualangan tak terlupakan di seluruh Indonesia dan sekitarnya.',
            },
            {
              name: 'keywords',
              title: 'SEO Keywords',
              type: 'array',
              of: [{ type: 'string' }],
              options: {
                layout: 'tags'
              },
              description: 'Keywords for SEO optimization'
            }
          ]
        }),
        defineField({
          name: 'navigation',
          title: 'Navigation Labels',
          type: 'object',
          fields: [
            {
              name: 'homeText',
              title: 'Home Menu Text',
              type: 'string',
              initialValue: 'Beranda'
            },
            {
              name: 'aboutText',
              title: 'About Menu Text',
              type: 'string',
              initialValue: 'Tentang'
            },
            {
              name: 'servicesText',
              title: 'Services Menu Text',
              type: 'string',
              initialValue: 'Layanan'
            },
            {
              name: 'galleryText',
              title: 'Gallery Menu Text',
              type: 'string',
              initialValue: 'Galeri'
            },
            {
              name: 'blogText',
              title: 'Blog Menu Text',
              type: 'string',
              initialValue: 'Blog'
            },
            {
              name: 'contactText',
              title: 'Contact Menu Text',
              type: 'string',
              initialValue: 'Kontak'
            }
          ]
        }),
        defineField({
          name: 'globalContent',
          title: 'Global Content',
          type: 'object',
          fields: [
            {
              name: 'ctaText',
              title: 'Call to Action Text',
              type: 'string',
              initialValue: 'Bismillah, Siap Memulai Perjalanan Berkah Anda?',
              description: 'Main CTA text on homepage'
            },
            {
              name: 'bookNowText',
              title: 'Book Now Button Text',
              type: 'string',
              initialValue: 'Pesan Sekarang',
              description: 'Text for book now buttons'
            },
            {
              name: 'copyrightText',
              title: 'Copyright Text',
              type: 'string',
              initialValue: '© 2024 Mahabbatussholihin Tour & Travel. Semua hak dilindungi.',
              description: 'Copyright notice in footer'
            },
            {
              name: 'freeConsultationText',
              title: 'Free Consultation Text',
              type: 'string',
              initialValue: 'Konsultasi Gratis'
            }
          ]
        })
      ]
    })
  ],

  preview: {
    select: {
      title: 'businessInfo.siteName',
      media: 'businessInfo.logo',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title || 'Site Settings',
        subtitle: 'Global site configuration'
      }
    }
  }
})

export default siteSettings