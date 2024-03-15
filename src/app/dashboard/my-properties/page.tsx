import { getMeUser } from '@/utilis/getMeUser'
import DashboardMyPropertiesView from '@/views/DashboardMyPropertiesView'

export const metadata = {
  title: 'Dashboard Properties || Homez - Real Estate NextJS Template',
}

const DashboardMyProperties = async () => {
  await getMeUser({ nullUserRedirect: '/login' })
  return <DashboardMyPropertiesView />
}

export default DashboardMyProperties
