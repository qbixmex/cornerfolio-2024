"use server"
import { fetchLogin } from "@/api/login.fetch";

export const checkLoginInfo = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    
    if (email !== null && password !== null) {
        fetchLogin({email: email as string, password: password as string})

    }

}