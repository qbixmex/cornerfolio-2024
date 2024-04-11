const API_URL = process.env.API_URL ?? 'http://localhost:4000';

export const createPortfolio = async (token: string) => {
	try {
		const response = await fetch(`${API_URL}/api/portfolio`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store",
				"token": token,
			},
		});

		return response.json();
	} catch (error) {
		console.error("Error creating portfolio:", error);
		throw error;
	}
};
