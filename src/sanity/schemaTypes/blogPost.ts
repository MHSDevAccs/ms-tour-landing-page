import { defineType, defineField } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Blog post title'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'URL slug for the blog post'
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short description for previews and SEO'
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main image for the blog post'
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      description: 'Main content of the blog post'
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Author of the blog post'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When the blog post was published'
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Travel Tips', value: 'travel-tips' },
          { title: 'Destinations', value: 'destinations' },
          { title: 'Islamic Tourism', value: 'islamic-tourism' },
          { title: 'Culture', value: 'culture' },
          { title: 'Food & Cuisine', value: 'food-cuisine' },
          { title: 'Adventure', value: 'adventure' },
          { title: 'Family Travel', value: 'family-travel' },
          { title: 'Budget Travel', value: 'budget-travel' }
        ]
      },
      description: 'Categories for organizing blog posts'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for better searchability'
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for search engines (optional, defaults to title)'
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Description for search engines (optional, defaults to excerpt)'
    }),
    defineField({
      name: 'isPublished',
      title: 'Is Published',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle to publish/unpublish this blog post'
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as featured blog post for homepage'
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
      subtitle: 'excerpt',
      media: 'featuredImage',
      author: 'author',
      language: 'language'
    },
    prepare(selection) {
      const { title, subtitle, author, language } = selection
      return {
        title: title,
        subtitle: `by ${author} (${language?.toUpperCase() || 'ID'})`
      }
    }
  }
})