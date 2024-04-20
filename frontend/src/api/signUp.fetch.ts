'use server';

const API_URL = process.env.API_URL ?? "http://localhost:4000";

export type UserSignUp = {
  name: string;
  email: string;
  password: string;
  jobTitle: string;
  course: string;
  schedule: string;
};

export const signUpFetch = async (newUser: UserSignUp) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const data = await response.json();

  //* return the form state to display the error messages to users
  return data;
};
