'use server';

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

  //* return the form state to display the error messages to users
  return data;
};
