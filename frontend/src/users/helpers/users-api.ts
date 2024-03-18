"use server";

import { revalidateTag } from "next/cache";
import { UsersList } from "../interfaces/users";

type Options = {
  page?: number;
  limit?: number;
  order?: string;
  orderBy?: string;
};

export const getUsersPages = async (query = ''): Promise<{ total: number }> => {
  const API_URL = process.env.API_URL;

  const URL = `${API_URL}/api/users/count-total/${query}`

  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      // 'authorization': `Bearer ${process.env.API_TOKEN}`// TODO: Add API Token
    },
    cache: 'default',
  });

  const data = await response.json();

  return data;
};

export const getUsersList = async (options?: Options): Promise<UsersList> => {
  const API_URL = process.env.API_URL;

  const URL =
    `${API_URL}/api/users` +
    `?page=${options?.page ?? 1}` +
    `&limit=${options?.limit ?? 10}` +
    `&orderBy=${options?.orderBy ?? "name"}` +
    `&order=${options?.order ?? "asc"}`;

  const response = await fetch(URL, {
    method: "GET",
    headers: {
      // 'authorization': `Bearer ${process.env.API_TOKEN}`// TODO: Add API Token
    },
    cache: "force-cache",
    next: { tags: ["users-table"] },
  });

  const data = await response.json();

  if (options?.page !== 1) {
    revalidateTag("users-table");
  }

  return data;
};
