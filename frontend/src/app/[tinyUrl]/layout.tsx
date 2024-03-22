import { ThemeProvider } from 'next-themes';

const PortfolioLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<ThemeProvider>
			<main className="my-10">{children}</main>
		</ThemeProvider>
	);
};

export default PortfolioLayout;
