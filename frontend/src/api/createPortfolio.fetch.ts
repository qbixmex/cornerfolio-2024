
export const createPortfolio = async () => {
	try {
		const response = await fetch("http://localhost:4000/api/portfolio", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to create portfolio");
		}

		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.error("Error creating portfolio:", error);
		throw error;
	}
};
