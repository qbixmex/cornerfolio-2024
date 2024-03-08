export const deletePortfolio = async (id: string) => {
	try {
		const response = await fetch(`http://localhost:4000/api/portfolio/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to delete portfolio");
		}

		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.error("Error updating portfolio:", error);
		throw error;
	}
};