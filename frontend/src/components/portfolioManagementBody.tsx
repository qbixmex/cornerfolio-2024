import CreatePortfolioSection from './createPortfolioSection';
import PortfolioManagementActions from './portfolioManagementActions';

export default function PortfolioManagementBody() {
	return (
		<div>
			<div className="flex flex-col items-center">
				<div className="flex flex-col justify-center items-center">
					<CreatePortfolioSection />
				</div>
				<div className="flex flex-col justify-center items-center">
					<PortfolioManagementActions />
				</div>
			</div>
		</div>
	);
}
