"use client";

import CreatePortfolioSection from "./createPortfolioSection";
import PortfolioManagementActions, { Portfolio } from "./portfolioManagementActions";

type Props = {
	data: Portfolio[];
};

const PortfolioManagement: React.FC<Props> = ({ data }) => {
	return (
		<>
			<div className="flex flex-col items-center mb-10 pl-14">
				<div className="flex flex-col justify-center items-center">
					<CreatePortfolioSection portfolioCount={data.length} />
				</div>
				<div className="flex flex-col justify-center items-center">
					<PortfolioManagementActions portfolios={data} />
				</div>
			</div>
		</>
	);
};

export default PortfolioManagement;
