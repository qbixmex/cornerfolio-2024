"use server";

type UserCredentials = {
  email: string;
  password: string;
};

export const fetchLogin = async (credentials: UserCredentials) => {
  try {
    const response = await fetch(`http://localhost:4000/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    // if (data.user) {
    //   redirect("/");
    // }

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login user");
  }
};
