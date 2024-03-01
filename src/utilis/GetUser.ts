import { NextRequest } from 'next/server';
import { getServerSideUser } from '../lib/payload-utils';

export const useGetUser = async (req: NextRequest) => {
  const { nextUrl, cookies } = req;
  const token = cookies.get('payload-token');
  const { user } = await getServerSideUser(cookies);

  return user;
};
