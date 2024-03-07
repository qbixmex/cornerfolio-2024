import { FC, ReactNode } from 'react';
import { Metadata } from 'next';
import Sidebar from '@/components/sidebar';
import TopNavigation from '@/components/topNavigation';

export const metadata: Metadata = {
  title: "Admin",
  description: "This is the admin for Cornerfolio.",
};

const AdminLayout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <>
      <TopNavigation />
      <Sidebar />
      <main className="my-10">
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
