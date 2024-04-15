'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const API_URL = process.env.API_URL ?? 'http://localhost:4000';

export const getPortfolio = async (id: string) => {
	const cookiesStore = 	cookies();
	const token = cookiesStore.get('token');
	const response = await fetch(`${API_URL}/api/portfolio/${id}`, {
		headers: {
			token: token?.value!,
		},
	});
	return response.json();
};

export const moveSectionUpDown = async (
	portfolioId: string,
	sectionId: string,
	action: 'up' | 'down',
) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');

	const response = await fetch(
		`${API_URL}/api/portfolio/move/${portfolioId}/${sectionId}/?action=${action}`,
		{
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				token: token?.value!,
			},
		},
	);

	revalidatePath(`/admin/portfolio-management/${portfolioId}`);

	return response.json();
};

export const getPortfolioByTinyUrlId = async (tinyUrlId: string) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');

	const response = await fetch(`${API_URL}/api/portfolio/live/${tinyUrlId}`, {
		headers: {
			token: token?.value!,
		},
	});
	return response.json();
};

export const publishPortfolio = async (portfolioId: string) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');

	const response = await fetch(`${API_URL}/api/portfolio/${portfolioId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
			token: token?.value!,
		},
		cache: 'no-cache',
		body: JSON.stringify({ status: 'published' }),
	});

	revalidatePath("admin/portfolio-management");
	revalidatePath(`admin/portfolios/${portfolioId}`);

	return response.json();
};

export const unPublishPortfolio = async (portfolioId: string) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');

	const response = await fetch(`${API_URL}/api/portfolio/${portfolioId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
			token: token?.value!,
			cache: 'no-cache',
		},
		body: JSON.stringify({ status: 'draft' }),
	});

	revalidatePath("admin/portfolio-management");
	revalidatePath(`admin/portfolios/${portfolioId}`);

	return response.json();
};
