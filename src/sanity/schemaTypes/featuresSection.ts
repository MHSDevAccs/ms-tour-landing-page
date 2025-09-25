import { defineType, defineField } from 'sanity'

export const featuresSection = defineType({
  name: 'featuresSection',
  title: 'Features Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Main title for the features section'
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'text',
      description: 'Optional subtitle for the features section'
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string'
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text'
            }),
            defineField({
              name: 'icon',
              title: 'Feature Image',
              type: 'image',
              options: {
                hotspot: true,
                accept: 'image/jpeg, image/png, image/webp, image/svg+xml',
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  description: 'Describe the feature image for accessibility'
                }
              ],
              description: '� PRODUCT DISPLAY: 600x400px (3:2) | Max Size: 20MB | Format: JPEG/PNG/WebP/SVG'
            }),
            defineField({
              name: 'link',
              title: 'Feature Link',
              type: 'url',
              description: 'Optional link for this feature'
            })
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image'
            }
          }
        }
      ],
      description: 'List of features or services to display'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this features section'
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
      title: 'sectionTitle',
      subtitle: 'sectionSubtitle',
      language: 'language',
      featuresCount: 'features.length'
    },
    prepare(selection) {
      const { title, subtitle, language, featuresCount } = selection
      return {
        title: title,
        subtitle: `${featuresCount || 0} features (${language?.toUpperCase() || 'ID'})`
      }
    }
  }
})