'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const getPortfolio = async (id: string) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');
	try {
		const response = await fetch(`http://localhost:4000/api/portfolio/${id}`, {
			headers: {
				token: token?.value!,
			},
			cache: 'no-cache',
		});
		return response.json();
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
};

export const moveSectionUpDown = async (
	portfolioId: string,
	sectionId: string,
	action: 'up' | 'down',
) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');

	const response = await fetch(
		`http://localhost:4000/api/portfolio/move/${portfolioId}/${sectionId}/?action=${action}`,
		{
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				token: token?.value!,
			},
		},
	);
	return response.json();
};

export const getPortfolioByTinyUrlId = async (tinyUrlId: string) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');

	const response = await fetch(`http://localhost:4000/api/portfolio/live/${tinyUrlId}`, {
		headers: {
			token: token?.value!,
		},
		cache: 'no-cache',
	});
	return response.json();
};

export const publishPortfolio = async (portfolioId: string) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');

	const response = await fetch(`http://localhost:4000/api/portfolio/${portfolioId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
			token: token?.value!,
		},
		cache: 'no-cache',
		body: JSON.stringify({ status: 'published' }),
	});
	return response.json();
};

export const UnPublishPortfolio = async (portfolioId: string) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');

	const response = await fetch(`http://localhost:4000/api/portfolio/${portfolioId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
			token: token?.value!,
			cache: 'no-cache',
		},
		body: JSON.stringify({ status: 'draft' }),
	});
	revalidatePath('/admin/portfolio-management');
	return response.json();
};
