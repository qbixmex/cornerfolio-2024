"use server";

import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

type UpdateThemeProps = {
	id: string;
	theme: string;
};

const updatePortfolioTheme = async ({ id, theme }: UpdateThemeProps) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get("token");

	try {
		const response = await fetch(`${API_URL}/api/portfolio/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"token": token?.value!,
			},
			body: JSON.stringify({ theme }),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return await response.json();
	} catch (error) {
		console.error(error);
		throw new Error("Unknown error occurred while updating the portfolio theme, check logs !");
	}
};

export default updatePortfolioTheme;
