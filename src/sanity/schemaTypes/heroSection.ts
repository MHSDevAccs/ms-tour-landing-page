import { defineType, defineField } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'The main headline for the hero section'
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Supporting text below the main title'
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
      description: 'Text for the primary call-to-action button'
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'url',
      description: 'URL for the primary call-to-action button'
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
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
          description: 'Important for accessibility and SEO'
        }
      ],
      description: '�️ HERO BANNER: 1920x1080px (16:9) | Max Size: 20MB | Format: JPEG/PNG/WebP'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this hero section'
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
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage',
      language: 'language'
    },
    prepare(selection) {
      const { title, subtitle, language } = selection
      return {
        title: title,
        subtitle: `${subtitle} (${language.toUpperCase()})`
      }
    }
  }
})