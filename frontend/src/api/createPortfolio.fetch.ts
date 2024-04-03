export const createPortfolio = async (token: string) => {
	try {
		const response = await fetch("http://localhost:4000/api/portfolio", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store",
				"token": token,
			},
		});

		if (!response.ok) {
			throw new Error("Failed to create portfolio");
		}

		return await response.json();
	} catch (error) {
		console.error("Error creating portfolio:", error);
		throw error;
	}
};
