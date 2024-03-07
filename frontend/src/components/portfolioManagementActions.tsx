"use client";
import { portFoliosFetch } from "@/api/portfolios.fetch";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
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

type Portfolio = {
	id: string;
	header: PortfolioHeader;
	status: string;
	sections: any[];
	footer: PortfolioFooter;
	template: string;
};

export default function PortfolioManagementActions() {
	const [allUserPortfolios, setAllUserPortfolios] = useState<Portfolio[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const portfolios: Portfolio[] = await portFoliosFetch();
				setAllUserPortfolios(portfolios);
			} catch (error) {
				console.error("Error fetching portfolios:", error);
			}
		};

		fetchData();
	}, []);
	console.log(allUserPortfolios);

	return (
		<>
			<h2 className="mt-24 text-5xl text-slate-700 font-semibold  tracking-tight ">Portfolios</h2>

			<div className="flex gap-6 overflow-x-auto  ">
				{allUserPortfolios.map((portfolio, index) => (
					<div key={index} className="bg-gray-200 mt-10 rounded-md p-10 scroll-ml-6 snap-start">
						<div className="relative">
							<Image
								src="https://source.unsplash.com/random"
								alt="Random Image"
								width={250}
								height={250}
								className="object-contain rounded-lg cursor-pointer hover:scale-105 transition-all duration-1000"
							/>

							<div className="flex justify-between absolute w-full bottom-0 z-10 p-4">
								<DraftButton status={portfolio.status} />
								<DeletePortfolioButton />
							</div>
							<div className="flex w-6 justify-end absolute top-0 z-100 mt-3 text-white">
								{portfolio.status === "draft" ? (
									<FontAwesomeIcon icon={faEyeSlash} />
								) : (
									<FontAwesomeIcon icon={faEye} />
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
