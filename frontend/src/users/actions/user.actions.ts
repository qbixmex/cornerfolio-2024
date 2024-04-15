"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UsersSearch } from "../interfaces/users";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

export const getUser = async (id: string) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');

  const response = await fetch(`${API_URL}/api/users/${id}`, {
    headers: {
      "token": token?.value!,
    }
  });
  return response.json();
};

export const fetchUsersByQuery = async (term: string, currentPage: number): Promise<UsersSearch> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');
  let URL = `${API_URL}/api/users`;

  if (term) {
    URL += `/search/${term}`;
  }

  if (currentPage > 1)  {
    URL += `?page=${currentPage}`;
  }
  
  const response = await fetch(URL, { headers: { "token": token?.value! } });
  return response.json();
};

export const createUser = async (formData: FormData) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');
  const response = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    body: formData,
    headers: {
      "token": token?.value!
    }
  });

  revalidateTag("users-table");

  return response.json();
};

export const updateUser = async (id: string, formData: FormData) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');

  try {
    const response = await fetch(`${API_URL}/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "token": token?.value!
      },
      body: formData,
    });

    revalidateTag("users-table");
    revalidatePath(`/admin/users/profile/${id}`);

    return response.json();
  } catch (error) {
    console.error(
      "There has been a problem with your fetch operation: ",
      error
    );
    throw error;
  }
};

export const updatePassword = async (id: string, password: string) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');

  const response = await fetch(
    `${API_URL}/api/users/${id}/update-password`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "token": token?.value!,
      },
      body: JSON.stringify({ password }),
    }
  );

  return response.json();
};

export const deleteUser = async (id: string) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');

  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "token": token?.value!,
    }
  });

  revalidateTag("users-table");

  redirect("/admin/users");
  
};
