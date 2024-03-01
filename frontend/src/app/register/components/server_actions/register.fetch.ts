"use server";

import { redirect } from "next/navigation";

enum Role {
	Client = "client",
	Student = "student",
	Admin = "admin",
}

export type ErrorState = {
	error?: string;
};


export const getUserData = async (
	prevData: ErrorState,
	formData: FormData,
): Promise<ErrorState> => {
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

	//>> TODO redirect("/profile");
};
