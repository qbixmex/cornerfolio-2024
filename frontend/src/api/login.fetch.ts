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

		if (!response.ok) {
			console.log("Failed to fetch users");
		}
		const data = await response.json();
		console.log(data);

		return data;
	} catch (error) {
		console.log(error as string);

		//>> TODO give feedback to the user
	}

	//>> TODO redirect("/profile");
};
