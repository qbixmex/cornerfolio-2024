'use client';

import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { mainStore } from '@/store';
import { ThemeContextProvider } from '@/context/portfolio-theme-context';

type Props = {
  children: ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  return (
    <Provider store={ mainStore }>
      <ThemeContextProvider>
        {children}
      </ThemeContextProvider>
    </Provider>
  );
};

export default Providers;