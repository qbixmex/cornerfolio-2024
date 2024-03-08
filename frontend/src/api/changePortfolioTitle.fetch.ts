import { Portfolio } from "@/components/portfolioManagementActions";

export const updatePortfolio = async (id: string, newTitle: string) => {
	try {
		const response = await fetch(`http://localhost:4000/api/portfolio/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({portfolioTitle: newTitle}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to update portfolio");
		}

		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.error("Error updating portfolio:", error);
		throw error;
	}
};
