import { FC, ReactNode } from 'react';

const PortfolioLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return <main className="my-10">{children}</main>;
};

export default PortfolioLayout;
