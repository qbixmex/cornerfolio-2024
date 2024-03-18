"use server";

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
  email: string;
  password: string;
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

  //* return the formstate to display the error messages to users
  return data;
};
