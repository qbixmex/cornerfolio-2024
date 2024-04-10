"use client"

import { createNewPortfolio } from '@/app/admin/portfolio-management/actions/portfolioActions';
import { FormEvent, useEffect, useState } from 'react';
import ErrorToast from './errorToast';

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
	tinyUrlId: string;
};

type Props = {
	portfolios?: Portfolio[];
	portfolioCount: number;
};

export default function CreatePortfolioSection({ portfolioCount }: Props) {
	const [ toast, setToast ] = useState({
	 	message: "",
		type: ""
	});

	useEffect(() => {
		// Remove the data-theme attribute
		document.documentElement.removeAttribute('data-theme');
		// Remove the style attribute
		document.documentElement.removeAttribute('style');
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setToast({ message: "", type: "" });
		}, 3000);

		return () => clearTimeout(timer);
	}, [toast]);

	const handleCreatePorfolio = async (event: FormEvent) => {
		event.preventDefault();

		const data = await createNewPortfolio();

		if (data.error) {
			setToast({ message: data.error, type: "error" });
		}
	};

	return (
		<>
			{(toast.type === "error" && toast.message) && (
				<ErrorToast message={toast.message} />
			)}

			<h2 className="mt-24 text-2xl lg:text-5xl text-slate-700 font-semibold  tracking-tight">
				Manage Your Portfolios
			</h2>

			<div className="bg-gray-200 mt-10 rounded-md p-10 gap-7">
				<div className="mb-10">
					<h3>You have {portfolioCount} Portfolios</h3>
				</div>

				<form onSubmit={handleCreatePorfolio}>
					<button
						className="flex w-full justify-center cursor-pointer rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow"
						type="submit"
					>
						<span className="cursor-pointer">Create New Portfolio</span>
					</button>
				</form>
			</div>
		</>
	);
}
