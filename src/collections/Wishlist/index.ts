import { CollectionConfig } from 'payload/types'
import isAdminOrSelf from '../../access/isAdminOrSelf'
const Wishlist: CollectionConfig = {
  slug: 'wishlist',
  access: {
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  fields: [
    {
      name: 'wishlistProperties',
      label: 'Wishlist Properties',
      type: 'relationship',
      relationTo: ['properties'],
      hasMany: true,
    },
    {
      name: 'user',
      label: 'User',
      type: 'relationship',
      relationTo: ['users'],
      hasMany: false,
    },
  ],
}

export default Wishlist
