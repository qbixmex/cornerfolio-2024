"use server";

import { redirect } from "next/navigation";

// type UserSignUp = {
// 	name: FormDataEntryValue | null;
// 	email: FormDataEntryValue | null;
// 	password: FormDataEntryValue | null;
// 	jobTitle: FormDataEntryValue | null;
// 	course: FormDataEntryValue | null;
// 	schedule: FormDataEntryValue | null;
// };

type UserSignUp = {
  name: string;
  password: string;
  confirmPassword: string;
  jobTitle: string;
  course: string;
  schedule: string;
};

export const signUpFetch = async (newUser: UserSignUp) => {
  const response = await fetch(`http://localhost:4000/api/auth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const data = await response.json();

  console.log(data);

  if (data.user) {
    redirect("/");
  }
  //* return the formstate to display the error messages to users
  return data;
};
