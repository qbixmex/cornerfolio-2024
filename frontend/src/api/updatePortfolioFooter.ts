"use server";

import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

type PortfolioFooter = {
	links:string;
	text: string;
};

export const updatePortfolioFooter = async (portfolioId: string, updateData: PortfolioFooter) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get("token");

	const response = await fetch(`${API_URL}/api/portfolio/${portfolioId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
			'token': token?.value!,
		},
		body: JSON.stringify({ footer: updateData })
	});

	return response.json();
};