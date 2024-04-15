import { portFoliosFetch } from "@/api/portfolios.fetch";
import PortfolioManagement from "@/components/portfolioManagement";

const TemplateManagementPage = async () => {
	const data = await portFoliosFetch();

	return (
		<PortfolioManagement data={data} />
	);
};

export default TemplateManagementPage;
