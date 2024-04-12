import { portFoliosFetch } from "@/api/portfolios.fetch";
import PortfolioManagementBody from "@/components/portfolioManagementBody";

const TemplateManagementPage = async () => {
	const data = await portFoliosFetch();

	return (
		<PortfolioManagementBody data={data} />
	);
};

export default TemplateManagementPage;
