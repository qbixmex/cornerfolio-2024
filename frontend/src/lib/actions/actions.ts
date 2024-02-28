"use server";

enum Role {
	Client = "client",
	Student = "student",
	Admin = "admin",
}
export const getUserData = async (formData: FormData) => {
	const userName = formData.get("user_name");
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
		scheduleHour: scheduleHour,
	};
	console.log(newUser);

	fetch(`http://localhost:3005`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(newUser),
	}).catch((err) => {
		console.log("error");
	});
	// redirect("/loginPage");
};
