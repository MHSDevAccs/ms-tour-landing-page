import { defineField, defineType } from 'sanity'

export const themeDesign = defineType({
  name: 'themeDesign',
  title: 'Theme & Design',
  type: 'document',
  icon: () => '🎨',
  fields: [
    defineField({
      name: 'colors',
      title: 'Theme Colors',
      type: 'object',
      fields: [
        {
          name: 'primary',
          title: 'Primary Color',
          type: 'string',
          initialValue: '#2563eb',
          description: 'Main brand color used for buttons, links, and highlights',
          validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Please enter a valid hex color code')
        },
        {
          name: 'secondary',
          title: 'Secondary Color',
          type: 'string',
          initialValue: '#64748b',
          description: 'Secondary color for accents and supporting elements',
          validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Please enter a valid hex color code')
        },
        {
          name: 'accent',
          title: 'Accent Color',
          type: 'string',
          initialValue: '#f59e0b',
          description: 'Accent color for special highlights and call-to-action elements',
          validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Please enter a valid hex color code')
        },
        {
          name: 'background',
          title: 'Background Color',
          type: 'string',
          initialValue: '#ffffff',
          description: 'Main background color',
          validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Please enter a valid hex color code')
        },
        {
          name: 'text',
          title: 'Text Color',
          type: 'string',
          initialValue: '#1f2937',
          description: 'Primary text color',
          validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Please enter a valid hex color code')
        }
      ]
    }),
    defineField({
      name: 'buttonStyles',
      title: 'Button Styles',
      type: 'object',
      fields: [
        {
          name: 'primaryButton',
          title: 'Primary Button Style',
          type: 'object',
          fields: [
            {
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'string',
              initialValue: '#2563eb',
              validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Please enter a valid hex color code')
            },
            {
              name: 'textColor',
              title: 'Text Color',
              type: 'string',
              initialValue: '#ffffff',
              validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Please enter a valid hex color code')
            },
            {
              name: 'borderRadius',
              title: 'Border Radius',
              type: 'string',
              initialValue: '8px',
              description: 'Button corner roundness (e.g., 4px, 8px, 12px)'
            }
          ]
        },
        {
          name: 'secondaryButton',
          title: 'Secondary Button Style',
          type: 'object',
          fields: [
            {
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'string',
              initialValue: 'transparent',
            },
            {
              name: 'textColor',
              title: 'Text Color',
              type: 'string',
              initialValue: '#2563eb',
              validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Please enter a valid hex color code')
            },
            {
              name: 'borderColor',
              title: 'Border Color',
              type: 'string',
              initialValue: '#2563eb',
              validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Please enter a valid hex color code')
            },
            {
              name: 'borderRadius',
              title: 'Border Radius',
              type: 'string',
              initialValue: '8px',
              description: 'Button corner roundness (e.g., 4px, 8px, 12px)'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'layout',
      title: 'Layout Settings',
      type: 'object',
      fields: [
        {
          name: 'maxWidth',
          title: 'Maximum Content Width',
          type: 'string',
          initialValue: '1200px',
          description: 'Maximum width for main content container'
        },
        {
          name: 'spacing',
          title: 'Section Spacing',
          type: 'string',
          initialValue: '80px',
          description: 'Default spacing between sections'
        },
        {
          name: 'headerHeight',
          title: 'Header Height',
          type: 'string',
          initialValue: '80px',
          description: 'Height of the main navigation header'
        }
      ]
    }),
    defineField({
      name: 'typography',
      title: 'Typography',
      type: 'object',
      fields: [
        {
          name: 'fontFamily',
          title: 'Primary Font Family',
          type: 'string',
          initialValue: 'Inter, sans-serif',
          description: 'Main font family for the website'
        },
        {
          name: 'headingFont',
          title: 'Heading Font Family',
          type: 'string',
          initialValue: 'Inter, sans-serif',
          description: 'Font family for headings'
        }
      ]
    })
  ],
  preview: {
    select: {
      primary: 'colors.primary',
      secondary: 'colors.secondary',
    },
    prepare(selection) {
      const { primary, secondary } = selection
      return {
        title: 'Theme & Design Settings',
        subtitle: `Primary: ${primary || '#2563eb'} | Secondary: ${secondary || '#64748b'}`,
      }
    }
  }
})

export default themeDesign