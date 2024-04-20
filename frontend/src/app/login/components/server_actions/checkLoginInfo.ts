"use server";
import { fetchLogin } from "@/api/login.fetch";

export type ErrorState = {
  error?: string;
};

export const checkLoginInfo = async (
  prevData: ErrorState,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === null && password === null) {
    return {
      error: "You must add a valid email and password",
    };
  }
  return fetchLogin({ email: email as string, password: password as string });
};

// export const checkLoginInfo = async (
// 	prevData: ErrorState,
// 	formData: FormData,
// ) => {
//     const email = formData.get("email");
//     const password = formData.get("password");

//     if (email === null && password === null) {
//         return ({
//             error: "You must add a valid email and password"
//         })
//     }
//     return fetchLogin({email: email as string, password: password as string})
// }
