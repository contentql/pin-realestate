import { User } from '@/payload-types'
import { Access } from 'payload/config'

const isAdminOrSelf: Access<any, User> = ({ req: { user } }) => {
  if (user && user.roles?.includes('admin')) {
    return true
  }
  if (user) {
    return {
      'user.value': {
        equals: user.id,
      },
    }
  }
  return false
}

export default isAdminOrSelf
