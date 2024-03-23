"use server";

import { signUpFetch, UserSignUp } from "@/api/signUp.fetch";

export type ErrorState = {
	error?: string;
};

export const getUserData = async (
	prevData: ErrorState,
	formData: FormData,
): Promise<ErrorState> => {
	const userName = formData.get("name") as string;
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const className = formData.get("class") as string;
	const jobTitle = formData.get("job") as string;
	const scheduleHour = formData.get("schedule") as string;

	const newUser: UserSignUp = {
		name: userName,
		email: email,
		password: password,
		jobTitle: jobTitle,
		course: className,
		schedule: scheduleHour,
	};

	// console.log(newUser);

	return signUpFetch(newUser);
};
