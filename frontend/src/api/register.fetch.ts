"use server";

enum Role {
	Client = "client",
	Student = "student",
	Admin = "admin",
}
export const getUserData = async (formData: FormData) => {
	const userName = formData.get("name");
	const email = formData.get("email");
	const password = formData.get("password");
	const className = formData.get("class");
	const jobTitle = formData.get("job");
	const scheduleHour = formData.get("schedule");

	const newUser = {
		name: userName,
		email: email,
		password: password,
		jobTitle: jobTitle,
		course: className,
		schedule: scheduleHour,
	};

	console.log(newUser);

	try {
		const response = await fetch(`http://localhost:4000/api/auth/register`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(newUser),
		});
		const data = await response.json();
		console.log(data);
	} catch (error) {
		throw new Error(error as string);
		//>> TODO give feedback to the user
	}

	//>> TODO redirect("/profile");
};
