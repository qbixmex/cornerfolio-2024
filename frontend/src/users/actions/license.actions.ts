"use server";

import { License, Token } from '@/interfaces';
import jwt from 'jsonwebtoken';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

export const updateLicense = async (license: License) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');
  const tokenDecoded = jwt.decode(token!.value) as Token | null;

  //* Setting dates for the license
  const currentDateUTC = new Date();
  const startDate = new Date(currentDateUTC.getTime() - currentDateUTC.getTimezoneOffset() * 60000);
  // const endDate = new Date(startDate);
  // endDate.setFullYear(startDate.getFullYear() + 1);

  //* set the endDAte in 10 sec for test
  const endDate = new Date(startDate.getTime() + 10 * 1000);

  try {
    const response = await fetch(`${API_URL}/api/license/${license.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "token": token?.value!
      },
      body: JSON.stringify({
        type: "premium",
        startDate: startDate,
        endDate: endDate,
      }),
    });

    revalidateTag("users-table");
    revalidatePath(`/admin/users/profile/${tokenDecoded?.id}`);

    const data = await response.json();

    //? console.log(data); // Uncomment this for debugging purposes

    return data;
  } catch (error) {
    console.error("There was a problem with your fetch operation: ", error);
    throw error;
  }
};