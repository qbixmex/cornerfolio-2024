"use client";

import { updatePortfolio } from "@/api/changePortfolioTitle.fetch";
import { portFoliosFetch } from "@/api/portfolios.fetch";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeletePortfolioButton from "./deletePortfolioButton";
import DraftButton from "./saveAsDraftButton";
import { deletePortfolio } from "@/api/deletePortfolioById.fetch";

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
			console.log(allUserPortfolios);
		};

		fetchData();
	}, []);

	const editPortFolio = async (id: string, newTitle: string) => {
		try {
			await updatePortfolio(id, newTitle);

			setAllUserPortfolios((prevPortfolios) =>
				prevPortfolios.map((portfolio) => {
					if (portfolio.id === id) {
						return { ...portfolio, portfolioTitle: newTitle };
					} else {
						return portfolio;
					}
				}),
			);
			const inputField = document.getElementById(`portfolioTitleInput_${id}`) as HTMLInputElement;
			if (inputField) {
				inputField.value = "";
			}
		} catch (error) {
			console.error("Error updating portfolio title:", error);
		}
	};

	

	return (
		<>
			<h2 className="mt-24 text-5xl text-slate-700 font-semibold  tracking-tight ">Portfolios</h2>

			<div className="flex gap-6 overflow-x-auto  ">
				{allUserPortfolios.map((portfolio, index) => (
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
							<div className="flex flex-col justify-center">
								<label className="text-xs">Portfolio title:</label>
								<input
									onBlur={(e) => editPortFolio(portfolio.id, e.target.value)}
									className="rounded-lg p-2"
									placeholder={portfolio.portfolioTitle}
									type="text"
									id={`portfolioTitleInput_${portfolio.id}`}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
