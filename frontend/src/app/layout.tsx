import { ThemeContextProvider } from '@/context/portfolio-theme-context';
import { Providers } from '@/store';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Cornerfolio',
	description:
		'This is a portfolio app website for Cornerstone International Community College of Canada.',
};

type Props = {
	children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<Providers>
					<ThemeContextProvider>
						<main>{children}</main>
					</ThemeContextProvider>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
