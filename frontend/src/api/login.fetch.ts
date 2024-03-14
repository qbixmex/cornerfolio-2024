"use server";

type UserCredentials = {
  email: string;
  password: string;
};

export const fetchLogin = async (credentials: UserCredentials) => {
  const response = await fetch(`http://localhost:4000/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
};
