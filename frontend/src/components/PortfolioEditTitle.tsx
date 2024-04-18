"use client";

import { updatePortfolio } from "@/api/changePortfolioTitle.fetch";
import { useState } from "react";
import { Portfolio } from "./portfolioManagementActions";
import { useAppDispatch } from "@/store";
import { setToast } from "@/store/slices/toast.slice";

type Props = {
	portfolio: Portfolio;
};

export default function PortfolioEditTitle({ portfolio }: Props) {
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState<string>(portfolio.portfolioTitle);

	const editPortFolio = async (id: string, newTitle: string) => {
		const data = await updatePortfolio(id, newTitle);

		if ("error" in data) {
			dispatch(setToast({ message: data.error, type: "error" }));
		}

		if ("message" in data) {
			dispatch(setToast({ message: "Job Title Updated Successfully 👍", type: "success" }));
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
