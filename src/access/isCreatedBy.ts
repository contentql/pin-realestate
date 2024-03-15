import { User } from '@/payload-types'
import { Access } from 'payload/config'

const isAdminOrCreatedBy: Access<any, User> = ({ req: { user } }) => {
  if (user && user.roles?.includes('admin')) {
    return true
  }
  if (user) {
    return {
      createdBy: {
        equals: user.id,
      },
    }
  }
  return false
}

export default isAdminOrCreatedBy
