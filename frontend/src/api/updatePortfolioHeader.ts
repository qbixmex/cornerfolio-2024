"use server";

import { cookies } from "next/headers";

type PortfolioHeader = {
	title: string;
	subHeading: string;
};

export const updatePortfolioHeader = async (portfolioId: string, updateData: PortfolioHeader) => {

	const cookiesStore = cookies();
	const token = cookiesStore.get("token");

	const response = await fetch(`http://localhost:4000/api/portfolio/${portfolioId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
			'token': token?.value!
		},
		body: JSON.stringify({ header: updateData })
	});

	return response.json();
};