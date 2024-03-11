import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import PortfolioEditTitle from "./PortfolioEditTitle";
import DeletePortfolioButton from "./deletePortfolioButton";
import DraftButton from "./saveAsDraftButton";

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
	footer: PortfolioFooter;
	template: string;
};

type Props = {
	portfolios: Portfolio[];
};

export default function PortfolioManagementActions({ portfolios }: Props) {
	return (
		<>
			{portfolios.length === 0 ? (
				<div className="flex justify-center items-center h-full">
					<p className="text-gray-500 text-xl">You do not have any Portfolio yet</p>
				</div>
			) : (
				<>
					<h2 className="mt-24 text-5xl text-slate-700 font-semibold tracking-tight">Portfolios</h2>

					<div className="flex gap-6 overflow-x-auto">
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
										<DraftButton status={portfolio.status} />
										<DeletePortfolioButton id={portfolio.id} />
									</div>
									<div className="flex w-6 justify-end absolute top-0 z-100 mt-3 text-white">
										{portfolio.status === "draft" ? (
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
