"use server";

import { revalidatePath } from 'next/cache';
import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

export const portFoliosFetch = async () => {

	const cookiesStore = cookies();
	const token = cookiesStore.get('token');

	try {
		const response = await fetch(`${API_URL}/api/portfolio`, {
			headers: {
				"token": token?.value!,
			},
			next: { tags: [ 'portfolios' ] },
			cache: 'no-cache',
		});

		const data = await response.json();
	
		if (data.user) {
			revalidatePath('/admin/portfolio-management');
		}
	
		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}

};
