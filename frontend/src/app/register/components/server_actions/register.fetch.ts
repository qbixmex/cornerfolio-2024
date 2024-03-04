"use server";

import { signUpFetch } from "@/api/signUp.fetch";

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

	return signUpFetch(newUser);
};
