import { CollectionConfig } from 'payload/types'

const Contact: CollectionConfig = {
  slug: 'contact',
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          req.payload.sendEmail({
            to: doc.email,
            from: 'sender@example.com',
            subject: 'Thanks for signing up!',
          })
        }
      },
    ],
  },
  fields: [
    {
      name: 'first_name',
      type: 'text',
      label: 'first name',
    },
    {
      name: 'last_name',
      type: 'text',
      label: 'last name',
    },
    {
      name: 'email',
      type: 'text',
      label: 'email address',
    },
    {
      name: 'query',
      type: 'text',
      label: 'query',
    },
  ],
}

export default Contact
