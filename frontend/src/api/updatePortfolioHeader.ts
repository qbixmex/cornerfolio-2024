type PortfolioHeader = {
	title: string;
    subHeading: string;
};

export const updatePortfolioHeader = async (portfolioId: string, updateData: PortfolioHeader) => {
	const response = await fetch(`http://localhost:4000/api/portfolio/${portfolioId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({header:updateData})
	});

	return response.json();
};