import { defineField, defineType } from 'sanity'

export const contentManagement = defineType({
  name: 'contentManagement',
  title: 'Content Management',
  type: 'document',
  icon: () => '📝',
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
          initialValue: 'Mahabbatussholihin Tour & Travel - Your Gateway to Unforgettable Adventures',
          validation: (Rule) => Rule.max(60).warning('Keep title under 60 characters for better SEO')
        },
        {
          name: 'siteDescription',
          title: 'Site Description (SEO)',
          type: 'text',
          description: 'Meta description for SEO and social sharing',
          initialValue: 'Discover amazing destinations with Mahabbatussholihin Tour & Travel. We offer personalized travel experiences, expert guides, and unforgettable adventures across Indonesia and beyond.',
          validation: (Rule) => Rule.max(160).warning('Keep description under 160 characters for better SEO')
        },
        {
          name: 'keywords',
          title: 'SEO Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Keywords for SEO (separate each keyword)',
          options: {
            layout: 'tags'
          }
        },
        {
          name: 'ogImage',
          title: 'Social Media Image (Open Graph)',
          type: 'image',
          description: 'Image shown when sharing on social media (1200x630px recommended)',
          options: {
            hotspot: true,
            accept: 'image/png, image/jpg, image/jpeg, image/webp',
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Image description for accessibility'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Labels',
      type: 'object',
      fields: [
        {
          name: 'home',
          title: 'Home Label',
          type: 'string',
          initialValue: 'Beranda'
        },
        {
          name: 'about',
          title: 'About Label',
          type: 'string',
          initialValue: 'Tentang Kami'
        },
        {
          name: 'services',
          title: 'Services Label',
          type: 'string',
          initialValue: 'Layanan'
        },
        {
          name: 'gallery',
          title: 'Gallery Label',
          type: 'string',
          initialValue: 'Galeri'
        },
        {
          name: 'blog',
          title: 'Blog Label',
          type: 'string',
          initialValue: 'Blog'
        },
        {
          name: 'contact',
          title: 'Contact Label',
          type: 'string',
          initialValue: 'Kontak'
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
    }),
    defineField({
      name: 'globalContent',
      title: 'Global Content',
      type: 'object',
      fields: [
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          initialValue: '© 2024 Mahabbatussholihin Tour & Travel. All rights reserved.',
          description: 'Copyright notice in footer'
        },
        {
          name: 'ctaButtonText',
          title: 'Default CTA Button Text',
          type: 'string',
          initialValue: 'Hubungi Kami',
          description: 'Default text for call-to-action buttons'
        },
        {
          name: 'readMoreText',
          title: 'Read More Text',
          type: 'string',
          initialValue: 'Baca Selengkapnya',
          description: 'Text for "read more" links'
        },
        {
          name: 'loadMoreText',
          title: 'Load More Text',
          type: 'string',
          initialValue: 'Muat Lebih Banyak',
          description: 'Text for "load more" buttons'
        },
        {
          name: 'backToTopText',
          title: 'Back to Top Text',
          type: 'string',
          initialValue: 'Kembali ke Atas',
          description: 'Text for back to top button'
        }
      ]
    }),
    defineField({
      name: 'forms',
      title: 'Form Settings',
      type: 'object',
      fields: [
        {
          name: 'contactFormTitle',
          title: 'Contact Form Title',
          type: 'string',
          initialValue: 'Hubungi Kami',
          description: 'Title displayed above contact forms'
        },
        {
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'Kirim Pesan',
          description: 'Text for form submit buttons'
        },
        {
          name: 'successMessage',
          title: 'Success Message',
          type: 'text',
          initialValue: 'Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.',
          description: 'Message shown after successful form submission'
        },
        {
          name: 'errorMessage',
          title: 'Error Message',
          type: 'text',
          initialValue: 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung.',
          description: 'Message shown when form submission fails'
        }
      ]
    }),
    defineField({
      name: 'maintenance',
      title: 'Maintenance Mode',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Maintenance Mode',
          type: 'boolean',
          initialValue: false,
          description: 'When enabled, shows maintenance page to visitors'
        },
        {
          name: 'message',
          title: 'Maintenance Message',
          type: 'text',
          initialValue: 'Website sedang dalam pemeliharaan. Kami akan segera kembali!',
          description: 'Message shown during maintenance'
        },
        {
          name: 'estimatedTime',
          title: 'Estimated Completion Time',
          type: 'string',
          placeholder: '2 jam',
          description: 'Estimated time until maintenance is complete'
        }
      ]
    })
  ],
  preview: {
    select: {
      siteTitle: 'seo.siteTitle',
      maintenanceEnabled: 'maintenance.enabled',
    },
    prepare(selection) {
      const { siteTitle, maintenanceEnabled } = selection
      return {
        title: 'Content Management',
        subtitle: maintenanceEnabled 
          ? '🚧 Maintenance Mode Active' 
          : siteTitle || 'SEO & Content Settings',
      }
    }
  }
})

export default contentManagement