import { FC, ReactNode } from 'react';
import { Metadata } from 'next';
import Sidebar from '@/components/sidebar';
import TopNavigation from '@/components/topNavigation';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { AuthenticatedUser, Token } from '@/interfaces';

export const metadata: Metadata = {
  title: "Admin",
  description: "This is the admin for Cornerfolio.",
};

const AdminLayout: FC<{children: ReactNode}> = ({ children }) => {

  //* Get the token from the cookies
  const cookiesStore = cookies();
	const token = cookiesStore.get('token');
  
  //* If there is no token, redirect to the login page
  if (!token) {
    return redirect('/login');
  }

  const tokenDecoded = jwt.decode(token!.value) as Token | null;

  //* Check if the token is expired
  if (tokenDecoded?.exp && (tokenDecoded.exp < Date.now() / 1000)) {
    return redirect('/login');
  }

  const authenticatedUser: AuthenticatedUser = {
    id: tokenDecoded?.id ?? '',
    name: tokenDecoded?.name ?? '',
    email: tokenDecoded?.email ?? '',
    imageUrl: tokenDecoded?.imageUrl ?? '',
  };

  return (
    <div className="mt-10">
      <TopNavigation authenticatedUser={authenticatedUser} />
      <Sidebar authenticatedUser={authenticatedUser} />
      {children}
    </div>
  );
};

export default AdminLayout;
