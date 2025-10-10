import { defineType, defineField } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Business Name',
      type: 'string',
      description: 'The main business name displayed in large text (e.g., "Buttonscarves Tour & Travel")'
    }),
    defineField({
      name: 'subtitle',
      title: 'Business Motto/Tagline',
      type: 'text',
      description: 'The business motto or tagline displayed below the business name in smaller text'
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
      title: 'Background Image (Legacy)',
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
      description: '🖼️ LEGACY: Single background image (use Slider Images instead for new content)',
       hidden: ({ document }) => !!(document?.sliderImages && Array.isArray(document.sliderImages) && document.sliderImages.length > 0)
    }),
    defineField({
      name: 'sliderImages',
      title: 'Slider Images',
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
                accept: 'image/jpeg, image/png, image/webp',
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Important for accessibility and SEO',
              validation: Rule => Rule.required()
            },
            {
              name: 'title',
              title: 'Slide Title',
              type: 'string',
              description: 'Main title text for this slide (overrides global title when present)'
            },
            {
              name: 'subtitle',
              title: 'Slide Subtitle',
              type: 'text',
              description: 'Subtitle text for this slide (overrides global subtitle when present)'
            },
            {
              name: 'caption',
              title: 'Caption (Optional)',
              type: 'string',
              description: 'Optional caption text overlay on the image'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              alt: 'alt',
              caption: 'caption',
              media: 'image'
            },
            prepare(selection) {
              const { title, subtitle, alt, caption } = selection
              return {
                title: title || alt || 'Untitled Image',
                subtitle: subtitle || caption || 'No subtitle'
              }
            }
          }
        }
      ],
      validation: Rule => Rule.min(1).max(10).error('Please add between 1-10 slider images'),
      description: '🎠 HERO SLIDER: 1920x1080px (16:9) | Max Size: 20MB each | Format: JPEG/PNG/WebP | Minimum 1, Maximum 10 images. Each slide can have its own title and subtitle.'
    }),
    defineField({
      name: 'sliderSettings',
      title: 'Slider Settings',
      type: 'object',
      fields: [
        {
          name: 'autoPlay',
          title: 'Auto Play',
          type: 'boolean',
          initialValue: true,
          description: 'Automatically advance slides'
        },
        {
          name: 'autoPlayInterval',
          title: 'Auto Play Interval (seconds)',
          type: 'number',
          initialValue: 5,
          validation: Rule => Rule.min(2).max(30),
          description: 'Time between slide transitions (2-30 seconds)',
          hidden: ({ parent }) => !parent?.autoPlay
        },
        {
          name: 'showNavigation',
          title: 'Show Navigation Arrows',
          type: 'boolean',
          initialValue: true,
          description: 'Show previous/next arrows'
        },
        {
          name: 'showDots',
          title: 'Show Dot Indicators',
          type: 'boolean',
          initialValue: true,
          description: 'Show dot indicators at bottom'
        },
        {
          name: 'pauseOnHover',
          title: 'Pause on Hover',
          type: 'boolean',
          initialValue: true,
          description: 'Pause auto-play when user hovers over slider',
          hidden: ({ parent }) => !parent?.autoPlay
        }
      ],
      description: 'Configure slider behavior and appearance',
       hidden: ({ document }) => !(document?.sliderImages && Array.isArray(document.sliderImages) && document.sliderImages.length > 1)
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this hero section'
    }),
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