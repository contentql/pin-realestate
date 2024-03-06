import { getMeUser } from '@/utilis/getMeUser';
import DashboardMessageView from '@/views/DashboardMessageView';

const DashboardMessage = async () => {
  await getMeUser({ nullUserRedirect: '/login' });
  return <DashboardMessageView />;
};

export default DashboardMessage;
