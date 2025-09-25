import { defineField, defineType } from 'sanity'

export const themeSettings = defineType({
  name: 'themeSettings',
  title: 'Theme & Design Settings',
  type: 'document',
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
      name: 'cards',
      title: 'Card Styles',
      type: 'object',
      fields: [
        {
          name: 'defaultCard',
          title: 'Default Card Classes',
          type: 'string',
          initialValue: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300',
          description: 'CSS classes for default cards'
        },
        {
          name: 'serviceCard',
          title: 'Service Card Classes',
          type: 'string',
          initialValue: 'bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6',
          description: 'CSS classes for service cards'
        },
        {
          name: 'blogCard',
          title: 'Blog Card Classes',
          type: 'string',
          initialValue: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden',
          description: 'CSS classes for blog cards'
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
    }),
  ],
  preview: {
    select: {
      title: 'colors.primary',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: 'Theme Settings',
        subtitle: title ? `Primary Color: ${title}` : 'Configure theme colors and styles'
      }
    }
  },
})