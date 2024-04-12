import { FC, ReactNode } from 'react';

const PortfolioLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return <main>{children}</main>;
};

export default PortfolioLayout;
