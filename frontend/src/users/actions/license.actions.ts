"use server";

import { License, Token } from '@/interfaces';
import jwt from 'jsonwebtoken';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from "next/headers";

export const updateLicense = async (license: License) => {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token');
    const tokenDecoded = jwt.decode(token!.value) as Token | null;

    try {
        const response = await fetch(`http://localhost:4000/api/license/${license.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "token": token?.value!
            },
            body: JSON.stringify({
                type: "premium",
                startDate: new Date(),
                endDate: new Date(new Date().getFullYear() + 1)
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
