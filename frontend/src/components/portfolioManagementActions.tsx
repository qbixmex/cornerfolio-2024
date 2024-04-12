import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import PortfolioEditTitle from './PortfolioEditTitle';
import DeletePortfolioButton from './deletePortfolioButton';
import DraftButton from './saveAsDraftButton';

type PortfolioHeader = {
	title: string;
	subHeading: string;
};

type PortfolioFooter = {
	links: string[];
	text: string;
};

export type Portfolio = {
	id: string;
	portfolioTitle: string;
	header: PortfolioHeader;
	status: string;
	sections: any[];
	user: any;
	footer: PortfolioFooter;
	template: string;
	tinyUrlId: string;
};

type Props = {
	portfolios: Portfolio[];
};

export default function PortfolioManagementActions({ portfolios }: Props) {

	return (
		<>
			{portfolios.length === 0 ? (
				<div className="max-w-lg mx-auto mt-50vh mt-[10vh]">
					<div className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" role="alert">
						<svg
							className="w-5 h-5 inline mr-3"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"
							></path>
						</svg>
						<div>
							<span className="font-medium">User Info!</span> You do not have any portfolio yet.
						</div>
					</div>
				</div>
			) : (
				<>
					<h2 className="mt-24 text-2xl lg:text-5xl text-slate-700 font-semibold tracking-tight">
						Portfolios
					</h2>

					<div className="block lg:flex gap-6 overflow-x-auto">
						{portfolios.map((portfolio, index) => (
							<div
								key={index}
								className="flex flex-col justify-between bg-gray-200 mt-10 rounded-md p-10 scroll-ml-6 snap-start"
							>
								<div className="relative">
									<Link href={`/admin/portfolios/${portfolio.id}`}>
										<Image
											src="https://images.unsplash.com/photo-1588200908342-23b585c03e26"
											alt="Random Image"
											width={250}
											height={250}
											className="object-contain rounded-lg cursor-pointer hover:scale-105 transition-all duration-1000"
										/>
									</Link>

									<div className="flex justify-between absolute w-full bottom-0 z-10 p-4">
										<DraftButton statusPortfolio={portfolio.status} id={portfolio.id} />
										<DeletePortfolioButton id={portfolio.id} />
									</div>
									<div className="flex w-6 justify-end absolute top-0 z-100 mt-3 text-white">
										{portfolio.status === 'draft' ? (
											<FontAwesomeIcon icon={faEyeSlash} />
										) : (
											<FontAwesomeIcon icon={faEye} />
										)}
									</div>
								</div>
								<div className="mt-6 text-sm">
									<PortfolioEditTitle portfolio={portfolio} />
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
}
