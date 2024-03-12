import { revalidatePath } from 'next/cache';

export const portFoliosFetch = async () => {
	const response = await fetch(`http://localhost:4000/api/portfolio`, {
		next: { tags: [ 'portfolios' ] },
		cache: 'no-cache',
	});

	if (!response.ok) {
		console.error("Failed to fetch portfolios");
		return { error: "Failed to fetch portfolios, check logs !" };
	}

	const data = await response.json();

	if (data.user) {
		revalidatePath('/admin/portfolio-management');
	}

	return data;
};
