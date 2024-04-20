"use server"
import { User } from "@/interfaces";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? 'http://localhost:4000';

type ResponseUserUpdate =
| { message: string; user: User }
| { error: string};

export const updatePortfolio = async (id: string, newTitle: string): Promise<ResponseUserUpdate> => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');

	try {
		
		const response = await fetch(`${API_URL}/api/portfolio/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"token": token?.value!,
			},
			body: JSON.stringify({ portfolioTitle: newTitle }),
		});

		return response.json();

	} catch (error) {
		console.error("Error updating portfolio:", error);
		throw error;
	}
};
