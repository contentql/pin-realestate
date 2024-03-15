import { getMeUser } from '@/utilis/getMeUser'
import DashboardMyProfileView from '@/views/DashboardMyProfileView'

const DashboardMyProfile = async () => {
  await getMeUser({ nullUserRedirect: '/login' })
  return <DashboardMyProfileView />
}

export default DashboardMyProfile
