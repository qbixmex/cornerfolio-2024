import { FC, ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

const PortfolioLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<ThemeProvider>
				<main className="my-10">{children}</main>
			</ThemeProvider>
		</>
	);
};

export default PortfolioLayout;
