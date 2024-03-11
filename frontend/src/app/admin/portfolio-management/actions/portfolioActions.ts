"use server";

import { createPortfolio } from "@/api/createPortfolio.fetch";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createNewPortfolio = async () => {
	try {
		await createPortfolio();

		// revalidate
		revalidateTag("portfolios");

		// redirect to the current page
		redirect("/admin/portfolio-management");
	} catch (error) {
		console.log("Error trying create a new portfolio ", error);
	}
};
