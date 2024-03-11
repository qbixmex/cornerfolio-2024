"use server";
import { revalidatePath, revalidateTag } from "next/cache";

export const deletePortfolio = async (id: string) => {
	{
		const response = await fetch(`http://localhost:4000/api/portfolio/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to delete portfolio");
		}

		const responseData = await response.json();
		revalidateTag("portfolios");
		
		// revalidatePath("/admin/portfolio-management");
		return responseData;
	}
};
