import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
	title: "Cornerfolio - Portfolio Preview",
	description: "This is a preview portfolio page made by CornerFolio.",
	robots: "index, follow",
};

const PortfolioLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<ThemeProvider>
			<main className="min-h-screen" >{children}</main>
		</ThemeProvider>
	);
};

export default PortfolioLayout;
