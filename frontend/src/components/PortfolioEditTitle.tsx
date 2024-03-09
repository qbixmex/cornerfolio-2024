"use client";

import { updatePortfolio } from "@/api/changePortfolioTitle.fetch";
import { useState } from "react";
import { Portfolio } from "./portfolioManagementActions";

type Props = {
	portfolio: Portfolio;
};

export default function PortfolioEditTitle({ portfolio }: Props) {
	const [title, setTitle] = useState<string>(portfolio.portfolioTitle);
	const editPortFolio = async (id: string, newTitle: string) => {
		try {
			await updatePortfolio(id, newTitle);
		} catch (error) {
			console.error("Error updating portfolio title:", error);
		}
	};

	return (
		<div className="flex flex-col justify-center">
			<label className="text-xs">Portfolio title:</label>
			<input
				onBlur={(e) => editPortFolio(portfolio.id, e.target.value)}
				className="rounded-lg p-2"
				placeholder="Enter Portfolio title"
				type="text"
				id={`portfolioTitleInput_${portfolio.id}`}
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
		</div>
	);
}
