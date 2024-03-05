import CreatePortfolioSection from "./createPortfolioSection";
import PortfolioManagementActions from "./portfolioManagementActions";

export default function PortfolioManagementBody() {
	return (
		<div>
			<div className="flex justify-between ">
				<div className="w-1/2 flex flex-col justify-center items-center ">
					<CreatePortfolioSection />
				</div>
				<div className="w-1/2 flex flex-col justify-center items-center ">
					<PortfolioManagementActions />
				</div>
			</div>
		</div>
	);
}
