"use server";

import { cookies } from "next/headers";

export const getPortfolio = async (id: string) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');

  try {
    const response = await fetch(`http://localhost:4000/api/portfolio/${id}`, {
      headers: {
        "token": token?.value!,
      }
    });
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const moveSectionUpDown = async (portfolioId: string, sectionId: string, action: 'up' | 'down') => {
  const response = await fetch(`http://localhost:4000/api/portfolio/move/${portfolioId}/${sectionId}/?action=${action}`, {
    method: 'PATCH',
    headers: {
      "content-type": "application/json",
    }
  });
  return response.json()
};

export const getPortfolioByTinyUrlId = async (tinyUrlId: string) => {
  const response = await fetch(`http://localhost:4000/api/portfolio/live/${tinyUrlId}`);
  return response.json();
};