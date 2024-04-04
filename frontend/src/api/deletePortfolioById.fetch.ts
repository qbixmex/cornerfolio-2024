"use server";

import { cookies } from "next/headers";

import { revalidateTag } from 'next/cache';

export const deletePortfolio = async (id: string) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get("token");

	{
		const response = await fetch(`http://localhost:4000/api/portfolio/${id}`, {
			headers: {
				"token": token?.value!,
			},
			method: "DELETE",
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to delete portfolio");
		}

		const responseData = await response.json();
		revalidateTag("portfolios");

		//? NOTE: revalidatePath is alternative option to revalidateTag
		//? revalidatePath("/admin/portfolio-management");

		return responseData;
	}
};
