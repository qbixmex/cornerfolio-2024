import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
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
					<div className="flex items-center gap-2 bg-blue-100 rounded-lg p-4 mb-4 text-lg text-blue-700" role="alert">
						<FaInfoCircle />
						<span className="font-semibold">There aren't portfolios created yet !</span>
					</div>
				</div>
			) : (
				<>
					<h2 className="mt-24 text-2xl lg:text-5xl text-slate-700 font-semibold tracking-tight">
						Portfolios
					</h2>

					<div className="block lg:flex lg:flex-wrap lg:justify-center gap-6">
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
									<div className="absolute top-3 right-3 z-100 text-white text-opacity-75">
										{portfolio.status === 'draft' ? (<FaEyeSlash size={26} />) : (<FaEye size={26} />)}
									</div>
								</div>
								<div className="mt-6 text-sm">
									<PortfolioEditTitle portfolio={portfolio} />
								</div>
							</div>
						))}
					</div>
				</>
				)
			}
		</>
	);
}
