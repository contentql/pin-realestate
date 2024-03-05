import { getMeUser } from '@/utilis/getMeUser';
import DashboardHomeView from '@/views/DashboardHomeView';

const DashboardHome = async () => {
  await getMeUser({ nullUserRedirect: '/login' });
  return <DashboardHomeView />;
};

export default DashboardHome;
