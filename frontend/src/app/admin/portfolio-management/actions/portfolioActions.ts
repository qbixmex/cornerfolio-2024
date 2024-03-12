'use server';

import { createPortfolio } from '@/api/createPortfolio.fetch';
import { revalidateTag } from 'next/cache';

export const createNewPortfolio = async () => {

	await createPortfolio();

	//? Revalidate Tag
	revalidateTag('portfolios');

};
