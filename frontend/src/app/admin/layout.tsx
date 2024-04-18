import { FC, ReactNode } from 'react';
import { Metadata } from 'next';
import Sidebar from '@/components/sidebar';
import TopNavigation from '@/components/topNavigation';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { AuthenticatedUser, Token, User } from '@/interfaces';
import { getUser } from '@/users/actions/user.actions';

export const metadata: Metadata = {
  title: "Admin",
  description: "This is the admin for Cornerfolio.",
};

const AdminLayout: FC<{children: ReactNode}> = async ({ children }) => {

  //* Get the token from the cookies
  const cookiesStore = cookies();
	const token = cookiesStore.get('token');

  const tokenDecoded = jwt.decode(token!.value) as Token | null;

  const authenticatedUser: AuthenticatedUser = {
    id: tokenDecoded?.id ?? '',
    name: tokenDecoded?.name ?? '',
    email: tokenDecoded?.email ?? '',
    imageUrl: tokenDecoded?.imageUrl ?? '',
  };

  const data = await getUser(authenticatedUser.id);

  if ('error' in data) {
    // Handle the error case here. For example,
    // you might want to redirect to an error page.
    return redirect('/error');
  }

  return (
    <div className="mt-10">
      <TopNavigation authenticatedUser={data.user} />
      <Sidebar authenticatedUser={authenticatedUser} />
      {children}
    </div>
  );
};

export default AdminLayout;
