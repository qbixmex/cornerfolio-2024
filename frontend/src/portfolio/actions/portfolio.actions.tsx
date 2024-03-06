"use server";

export const getPortfolio = async (id: string) => {
    const response = await fetch(`http://localhost:4000/api/portfolio/${id}`);
    return response.json();
};
