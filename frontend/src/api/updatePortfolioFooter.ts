type PortfolioFooter = {
	links:string;
    text: string;
};

export const updatePortfolioFooter = async (portfolioId: string, updateData: PortfolioFooter) => {
	const response = await fetch(`http://localhost:4000/api/portfolio/${portfolioId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({footer:updateData})
	});

	return response.json();
};