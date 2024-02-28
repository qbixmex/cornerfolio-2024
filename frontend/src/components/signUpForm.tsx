"use client";

import { getUserData } from "@/lib/actions/actions";
import { ChangeEvent, useState } from "react";

export function SignUpForm() {
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const validateConfirmPassword = () => {
		if (password !== confirmPassword) {
			setError("Your passwords are not matching, please check again");
		} else {
			setError(null);
		}
	};

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 h-screen">
			<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				SignUp Page
			</h2>
			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" action={getUserData}>
					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">Name User:</label>
						<input
							type="text"
							name="user_name"
							value={name}
							onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							autoComplete="off"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
						<input
							type="text"
							name="email"
							autoComplete="off"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
						<input
							type="password"
							name="password"
							value={password}
							onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							autoComplete="off"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">
							Confirm Password:
						</label>
						<input
							type="password"
							name="confirm_password"
							value={confirmPassword}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setConfirmPassword(event.target.value)
							}
							onBlur={validateConfirmPassword}
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							autoComplete="off"
						/>
						{error && (
							<div
								className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
								role="alert"
							>
								<p className="font-bold">Error:</p>
								<p className="text-sm">{error}</p>
							</div>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">
							What is your Job Title?
						</label>
						<input
							type="text"
							name="job"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							autoComplete="off"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">
							In which Class are you enrolled?
						</label>
						<input
							type="text"
							name="class"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							autoComplete="off"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">
							Select one of these schedule hour:
						</label>
						<select
							name="schedule"
							id=""
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
						>
							<option value="">Select an hour</option>
							<option value="morning">Morning</option>
							<option value="evening">Afternoon</option>
							<option value="night">Evening</option>
						</select>
					</div>

					<button
						type="submit"
						disabled={!!error}
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Create Profile
					</button>
				</form>
			</div>
		</div>
	);
}
