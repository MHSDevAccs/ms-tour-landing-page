export default {
  name: 'contactSubmission',
  title: 'Contact Form Submission',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 5,
      validation: (Rule: any) => Rule.required().min(10).max(1000)
    },
    {
      name: 'tourInterest',
      title: 'Tour Interest',
      type: 'string',
      options: {
        list: [
          { title: 'Tour Packages', value: 'packages' },
          { title: 'Custom Tours', value: 'custom' },
          { title: 'Group Tours', value: 'group' },
          { title: 'Private Tours', value: 'private' },
          { title: 'Adventure Tours', value: 'adventure' },
          { title: 'Cultural Tours', value: 'cultural' },
          { title: 'General Inquiry', value: 'general' }
        ]
      }
    },
    {
      name: 'travelDate',
      title: 'Preferred Travel Date',
      type: 'date'
    },
    {
      name: 'groupSize',
      title: 'Group Size',
      type: 'number'
    },
    {
      name: 'budget',
      title: 'Budget Range (IDR)',
      type: 'string',
      options: {
        list: [
          { title: 'Under 5 Million', value: 'under-5m' },
          { title: '5-10 Million', value: '5-10m' },
          { title: '10-20 Million', value: '10-20m' },
          { title: '20-50 Million', value: '20-50m' },
          { title: 'Over 50 Million', value: 'over-50m' }
        ]
      }
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Responded', value: 'responded' },
          { title: 'Closed', value: 'closed' }
        ]
      },
      initialValue: 'new'
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      readOnly: true
    },
    {
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      readOnly: true
    }
  ],
  
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }]
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'status', direction: 'asc' }]
    }
  ],
  
  preview: {
    select: {
      title: 'name',
      subtitle: 'subject',
      media: 'status'
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title: `${title}`,
        subtitle: `${subtitle}`
      }
    }
  }
}