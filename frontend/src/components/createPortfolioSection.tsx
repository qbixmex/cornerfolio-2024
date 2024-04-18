"use client"

import { createNewPortfolio } from '@/app/admin/portfolio-management/actions/portfolioActions';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';
import { FormEvent, useEffect } from 'react';

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
	const dispatch = useAppDispatch();

	useEffect(() => {
		// Remove the data-theme attribute
		document.documentElement.removeAttribute('data-theme');
		// Remove the style attribute
		document.documentElement.removeAttribute('style');
	}, []);

	const handleCreatePorfolio = async (event: FormEvent) => {
		event.preventDefault();

		const data = await createNewPortfolio();

		if (data.error) {
			dispatch(setToast({ message: data.error, type: "error" }));
		}

		if (data.message) {
			dispatch(setToast({ message: data.message, type: "success" }));
		}
	};

	return (
		<>
			<h2 className="mt-24 text-2xl lg:text-5xl text-slate-700 font-semibold  tracking-tight">
				Manage your portfolios
			</h2>

			<div className="bg-gray-200 mt-10 rounded-md p-10 gap-7">
				<div className="mb-10">
					<h3>You have {portfolioCount} portfolios</h3>
				</div>

				<form onSubmit={handleCreatePorfolio}>
					<button
						className="flex w-full justify-center cursor-pointer rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow"
						type="submit"
					>
						<span className="cursor-pointer">Create new portfolio</span>
					</button>
				</form>
			</div>
		</>
	);
}
