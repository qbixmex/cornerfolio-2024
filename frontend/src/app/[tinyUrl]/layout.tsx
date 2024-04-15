import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cornerfolio - Portfolio Preview',
	description: 'This is a preview portfolio page made by CornerFolio.',
	robots: 'index, follow',
};

const PortfolioLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <main className="min-h-screen">{children}</main>;
};

export default PortfolioLayout;
