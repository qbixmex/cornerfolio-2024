"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { UsersList } from "../interfaces/users";

type Options = {
  page?: number;
  limit?: number;
  order?: string;
  orderBy?: string;
};

export const getUsersPages = async (query = ''): Promise<{ total: number }> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');
  const API_URL = process.env.API_URL;

  const URL = `${API_URL}/api/users/count-total/${query}`

  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      'token': token?.value!,
    },
  });

  const data = await response.json();

  return data;
};

export const getUsersList = async (options?: Options): Promise<UsersList> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');
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
      'token': token?.value!,
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
