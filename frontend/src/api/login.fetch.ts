"use server";

import { User } from "@/interfaces";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

type UserCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  message?: string;
  error?: string;
  token: string;
  user: User;
}

export const fetchLogin = async (credentials: UserCredentials): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
};
