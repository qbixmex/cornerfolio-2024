import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
	enum Role {
		Client = "client",
		Student = "student",
		Admin = "admin",
	}

	const getUserData = async (formData: FormData) => {
		"use server";
		const userName = formData.get("user_name");
		const email = formData.get("email");
		const password = formData.get("password");
		const confirmPassword = formData.get("confirm_password");
		const className = formData.get("class");
		const jobTitle = formData.get("job");
		const scheduleHour = formData.get("schedule");

		if (password !== confirmPassword) {
			throw new Error("Your password is not matching, please try again");
		}

		const newUser = {
			name: userName,
			email: email,
			password: password,
			type: Role.Student,
			jobTitle: jobTitle,
			startDate: new Date(),
			active: true,
			class: className,
			scheduleHour: scheduleHour,
		};

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

	return (
		<div>
			<div>
				<form action={getUserData}>
					<div>
						<label>Name User:</label>
						<input type="text" name="user_name" />
					</div>

					<div>
						<label>Email:</label>
						<input type="text" name="email" />
					</div>

					<div>
						<label>Password:</label>
						<input type="password" name="password" />
					</div>

					<div>
						<label>Confirm Password:</label>
						<input type="password" name="confirm_password" />
					</div>

					<div>
						<label>What is your Job Title?</label>
						<input type="text" name="job" />
					</div>

					<div>
						<label>In which Class are you enrolled?</label>
						<input type="text" name="class" />
					</div>

					<div>
						<label>Select one of these schedule hour:</label>
						<select name="schedule" id="">
							<option value="">Select an hour</option>
							<option value="morning">Morning</option>
							<option value="evening">Afternoon</option>
							<option value="night">Evening</option>
						</select>
					</div>

					<button type="submit">Create Profile</button>
				</form>
			</div>
		</div>
	);
}
