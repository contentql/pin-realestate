import { getMeUser } from '@/utilis/getMeUser';
import DashboardAddPropertyView from '@/views/DashboardAddPropertyView';

const DashboardAddProperty = async () => {
  await getMeUser({ nullUserRedirect: '/login' });

  return <DashboardAddPropertyView />;
};

export default DashboardAddProperty;
