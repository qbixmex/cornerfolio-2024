'use server';

import { createPortfolio } from '@/api/createPortfolio.fetch';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


export const createNewPortfolio = async () => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');

	//? Revalidate Tag
	revalidateTag('portfolios');

	return await createPortfolio(token?.value!);
};

export const createNewPortfolioAndEdit = async () => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');
	const newPortfolio = await createPortfolio(token?.value!);

	redirect(`/admin/portfolios/${newPortfolio.portfolio.id}`);
};
