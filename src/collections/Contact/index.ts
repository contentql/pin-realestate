import { CollectionConfig } from 'payload/types'
import { newContactEmail } from './hooks/newContactEmail'

const Contact: CollectionConfig = {
  slug: 'contact',
  hooks: {
    afterChange: [newContactEmail],
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
