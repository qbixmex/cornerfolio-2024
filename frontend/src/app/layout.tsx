import { FC } from 'react';
import { Providers } from '@/store';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/sidebar';
import TopNavigation from '@/components/topNavigation';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cornerfolio',
  description: 'This is a portfolio app website for Cornerstone International Community College of Canada.',
};

type Props = {
  children: React.ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <TopNavigation />
          <Sidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
