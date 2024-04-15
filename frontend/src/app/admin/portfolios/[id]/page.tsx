import { getPortfolio } from "@/portfolios/actions/portfolio.action";
import CustomizePortfolio from "@/portfolios/components/customizePortfolio";
import NotFoundPortfolio from "../components/not-found-portfolio";

type Props = {
	params: { id: string };
	searchParams: {};
};

const EditPortfolioPage: React.FC<Props> = async ({ params: { id } }) => {
	const data = await getPortfolio(id);

	if (data.error) {
		return <NotFoundPortfolio message={data.error} />;
	}

	return (
		<CustomizePortfolio portfolio={data} />
	);
};

export default EditPortfolioPage;
