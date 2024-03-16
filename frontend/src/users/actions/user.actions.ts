"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const getUser = async (id: string) => {
  const response = await fetch(`http://localhost:4000/api/users/${id}`);
  return response.json();
};

export const createUser = async (formData: FormData) => {
  const response = await fetch(`http://localhost:4000/api/users`, {
    method: "POST",
    body: formData,
  });

  revalidateTag("users-table");

  return response.json();
};

export const updateUser = async (id: string, formData: FormData) => {
  try {
    const response = await fetch(`http://localhost:4000/api/users/${id}`, {
      method: "PATCH",
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
  const response = await fetch(
    `http://localhost:4000/api/users/${id}/update-password`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    }
  );

  return response.json();
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`http://localhost:4000/api/users/${id}`, {
    method: "DELETE",
  });

  revalidateTag("users-table");
  redirect("/admin/users");

  return response.json();
};
