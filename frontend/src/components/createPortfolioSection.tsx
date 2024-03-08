"use client"

import { portFoliosFetch } from "@/api/portfolios.fetch";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function CreatePortfolioSection() {
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
	return (
		<>
			<h2 className="mt-24 text-5xl text-slate-700 font-semibold  tracking-tight">
				Manage Your Portfolios
			</h2>
			<div className="bg-gray-200 mt-10 rounded-md p-10 gap-7">
				<div className="mb-10">
					<h3>You have published {allUserPortfolios.length} Portfolios</h3>
				</div>

				<Link href={"/"}>
					<button className="flex w-full justify-center cursor-pointer rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow">
						<span className="cursor-pointer">Create New Portfolio</span>
					</button>
				</Link>
			</div>
		</>
	);
}
