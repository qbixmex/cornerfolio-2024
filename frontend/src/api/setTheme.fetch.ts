type UpdateThemeProps = {
	id: string;
	theme: string;
};

const updatePortfolioTheme = async ({ id, theme }: UpdateThemeProps) => {
	try {
		const response = await fetch(`http://localhost:4000/api/portfolio/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ theme }),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return await response.json();
	} catch (error) {
		console.error(error);
		throw new Error("Unknown error occurred while updating the portfolio theme, check logs !");
	}
};

export default updatePortfolioTheme;
