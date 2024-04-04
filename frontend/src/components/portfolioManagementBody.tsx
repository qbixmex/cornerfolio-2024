import { portFoliosFetch } from "@/api/portfolios.fetch";
import CreatePortfolioSection from "./createPortfolioSection";
import PortfolioManagementActions from "./portfolioManagementActions";
import ErrorToast from "./errorToast";

export default async function PortfolioManagementBody() {
	const data = await portFoliosFetch();

	if (data.error) {
		return <ErrorToast message={data.error} />;
	}

	return (
		<div>
			<div className="flex flex-col items-center">
				<div className="flex flex-col justify-center items-center">
					<CreatePortfolioSection portfolioCount={data.length} />
				</div>
				<div className="flex flex-col justify-center items-center">
					<PortfolioManagementActions portfolios={data} />
				</div>
			</div>
		</div>
	);
}
