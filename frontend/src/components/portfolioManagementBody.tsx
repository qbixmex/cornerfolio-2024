import { portFoliosFetch } from "@/api/portfolios.fetch";
import CreatePortfolioSection from "./createPortfolioSection";
import PortfolioManagementActions from "./portfolioManagementActions";

export default async function PortfolioManagementBody() {
	const portfolios = await portFoliosFetch();

	return (
		<div>
			<div className="flex flex-col items-center">
				<div className="flex flex-col justify-center items-center">
					<CreatePortfolioSection portfolioCount={portfolios.length} />
				</div>
				<div className="flex flex-col justify-center items-center">
					<PortfolioManagementActions portfolios={portfolios} />
				</div>
			</div>
		</div>
	);
}
