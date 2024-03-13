"use server";

import { createPortfolio } from "@/api/createPortfolio.fetch";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createNewPortfolio = async () => {
	await createPortfolio();

	//? Revalidate Tag
	revalidateTag("portfolios");
};

export const createNewPortfolioAndEdit = async () => {
	const newPortfolio = await createPortfolio();

	redirect(`/admin/portfolios/${newPortfolio.portfolio.id}`);
};
